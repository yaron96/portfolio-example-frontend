import { useCategoryTree } from 'entities/category/hooks/useCategoryTree';
import { Tree } from 'antd'
import styled from 'styled-components'

export const CategoriesTree = ({
    setSelected,
    setCategory,
    isEditing,
}) => {
    const {
        data,
        isLoading,
        isError,
        expandedKeys,
        selectedKeys,
        isDraggable,
        isSelectable,
        onSelect,
        onDrop,
        onExpand,
    } = useCategoryTree(isEditing, setSelected);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    return (
        <Styled
            className="category-tree"
            checkable
            draggable={isDraggable}
            selectable={isSelectable}
            onCheck={setCategory}
            onDrop={onDrop}
            onSelect={onSelect}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            treeData={data}
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