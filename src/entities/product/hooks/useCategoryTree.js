import { useQuery } from "react-query";
import { categoryApi } from "../../../shared/api/product/category";
import { useState } from "react";
import { categoryKeys } from "../../category/query-keys";
import { useEffect } from "react";

export const useCategoryTree = (params) => {
    const [treeData, setTreeData] = useState({});

    const { data, isLoading } = useQuery(
        categoryKeys.all,
        () => categoryApi.getAll(params),
        
    );

    useEffect(() => {
        if(data) {
            const copy = data.map((item) => {
                return Object.assign({}, item)
            })
            setTreeData(arrToTree(copy));
        }
    }, [data])

    return {
        treeData,
        isLoading,
    };
};

function arrToTree(arr) {
    const rootNode = arr.find((item) => item.title === "root");
    return initNode(rootNode);

    function initNode(node) {
        node.children = node.children.map((id) => {
            const child = arr.find((item) => item.id === id);
            return initNode(child);
        });
        return node;
    }
}