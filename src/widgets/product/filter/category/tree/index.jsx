import styled from 'styled-components'
import { Tree } from 'antd'
import { useCategoryTree } from "../../../../../entities/category/hooks/useCategoryTree";

export const CategoriesTree = ({
    setSelected,
    setCategory,
    isEditing,
}) => {
    const {
        treeData,
        isLoading,
        expandedKeys,
        selectedKeys,
        isDraggable,
        isSelectable,
        onSelect,
        onDrop,
    } = useCategoryTree(isEditing, setSelected);

    function onCheck(e) {
        setCategory(e);
    }

    function onDrop1(info) {
        console.log("");
        console.log(info);
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split("-");
        const dropPosition =
            info.dropPosition - Number(dropPos[dropPos.length - 1]);
        const tempData = [treeData];

        const loop = (data, key, callback) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children, key, callback);
                }
            }
        };

        let dragObj;
        loop(tempData, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            loop(tempData, dropKey, (item) => {
                item.children = item.children || [];
                item.children.unshift(dragObj);
            });
        } else if (
            (info.node.children || []).length > 0 &&
            info.node.expanded &&
            dropPosition === 1
        ) {
            loop(tempData, dropKey, (item) => {
                item.children = item.children || [];
                item.children.unshift(dragObj);
            });
        } else {
            let ar;
            let i;
            loop(tempData, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }
        //data.set(tempData[0])
    }

    return (
        <Styled
            className="category-tree"
            checkable
            draggable={isDraggable}
            selectable={isSelectable}
            onCheck={onCheck}
            onDrop={onDrop}
            onSelect={onSelect}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            treeData={treeData.children}
            fieldNames={{ key: "id" }}
        />
    );
};

const Styled = styled(Tree)`
    background: none;

   .ant-tree-node-content-wrapper.ant-tree-node-selected {
        background-color: #7787c2;
    }
`