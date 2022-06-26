import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { categoryApi } from "../../../shared/api/category";
import { categoryKeys } from "../query-keys";
import { useMoveCategory } from "./useMoveCategory";

export const useCategoryTree = (isEditing, setSelected) => {
    const [treeData, setTreeData] = useState({});
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [isDraggable, setIsDraggable] = useState(false);
    const [isSelectable, setIsSelectable] = useState(false);

    const { data, isLoading } = useQuery(
        categoryKeys.all,
        () => categoryApi.getAll(),
        { initialData: [] }
    );

    const moveCategoryMutation = useMoveCategory()

    //useMemo(())

    useEffect(() => {
        if (data.length) {
            const copy = data.map((item) => {
                return Object.assign({}, item);
            });
            setTreeData(arrToTree(copy));
        }
    }, [data]);

    useEffect(() => {
        if (treeData.children) {
            const allKeys = getAllKeys(treeData.children);
            setExpandedKeys(allKeys);
        }
    }, [treeData]);

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
            setSelected(findById(selectedKeys.pop(), treeData));
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

        moveCategoryMutation.mutateAsync({
            drag_id,
            drop_id,
            drop_pos,
        })
    }

    return {
        treeData,
        isLoading,
        expandedKeys,
        selectedKeys,
        isDraggable,
        isSelectable,
        onSelect,
        onDrop,
    };
};

function arrToTree(arr) {
    const rootNode = arr.find((item) => item.title === "root");
    return initNode(rootNode);

    function initNode(node) {
        console.log(123)
        node.children = node.children.map((id) => {
            const child = arr.find((item) => item.id === id);
            return initNode(child);
        });
        return node;
    }
}

const getAllKeys = (nodesArr) => {
    const result = [];
    nodesArr.map((node) => {
        let childKeys = [];
        result.push(node.id);
        if (node.children) {
            childKeys = getAllKeys(node.children);
        }
        result.push(...childKeys);
    });
    return result;
};

const findById = (id, treeData) => {
    return find(id, treeData);

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