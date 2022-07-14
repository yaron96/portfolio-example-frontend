import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { categoryApi } from "shared/api/category";
import { categoryKeys } from "entities/category/query-keys";
import { useMoveCategory } from "./useMoveCategory";

export const useCategoryTree = (isEditing, setSelected) => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [isDraggable, setIsDraggable] = useState(false);
    const [isSelectable, setIsSelectable] = useState(false);

    const initialData = {}
    const { data, isLoading, isError } = useQuery(
        categoryKeys.tree,
        () => categoryApi.getTree(),
        {
            initialData: initialData,
            onSuccess: initExpandedKeys,
        }
    );

    const moveCategoryMutation = useMoveCategory()

    useEffect(() => {
        if (isEditing) {
            setIsDraggable(true);
            setIsSelectable(true);
        } else {
            setSelectedKeys([]);
            setIsDraggable(false);
        }
    }, [isEditing]);

    useEffect(() => {
        if (selectedKeys.length) {
            setSelected(findById(selectedKeys.pop(), data));
        } else if (!isEditing) {
            setIsSelectable(false);
            setSelected(false);
        } else {
            setSelected(false);
        }
    }, [selectedKeys]);

    function onSelect(e) {
        setSelectedKeys(e)
    }

    function onDrop(info) {
        const drag_id = info.dragNode.id;
        const drop_id = info.node.id;
        const dropPos = info.node.pos.split("-");
        const drop_pos =
            info.dropPosition - Number(dropPos[dropPos.length - 1]);
        
        return moveCategoryMutation.mutateAsync({
            drag_id,
            drop_id,
            drop_pos,
        })
    }

    function onExpand(_, item) {
        if(item.nativeEvent.type !== "dragenter") {
            if (item.node.expanded) {
                setExpandedKeys((arr) => arr.filter((e) => e !== item.node.key));
            } else {
                setExpandedKeys((arr) => [...arr, item.node.key]);
            }
        }
    }

    function initExpandedKeys(data) {
        const allKeys = getAllKeys(data);
        setExpandedKeys((arr) => {
            if (arr.length) return arr;
            else return allKeys;
        });
    }

    return {
        data: data ? data.children : initialData,
        isError,
        isLoading,
        expandedKeys,
        selectedKeys,
        isDraggable,
        isSelectable,
        onSelect,
        onDrop,
        onExpand,
    };
};

const getAllKeys = (node) => {
    const result = [];
    result.push(node.id);

    if (node.children.length) {
        const childKeys = node.children.map((child) => getAllKeys(child));
        childKeys.map((el) => {
            result.push(...el);
        });
    }

    return result;
};

const findById = (id, node) => {
    return find(id, node);

    function find(id, node) {
        if (node.id == id) return node;
        else {
            const children = node.children.map((child) => {
                return find(id, child);
            });
            for (const item of children) {
                if (item) return item;
            }
        }
    }
};