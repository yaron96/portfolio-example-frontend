import { useEffect, useState } from "react"
import styled from 'styled-components'
import { Tree } from 'antd'

const Styled = styled(Tree)`
    background: none;

   .ant-tree-node-content-wrapper.ant-tree-node-selected {
        background-color: #a8bbff;
    }
`

export const CategoriesTree = ({
    data,
    setSelected,
    setCategory,
    isEditing }) => {

    const [expandedKeyArr, setExpandedKeyArr] = useState([])
    const [selectedKeyArr, setSelectedKeyArr] = useState([])
    const [isDraggable, setIsDraggable] = useState(false)
    const [isSelectable, setIsSelectable] = useState(false)

    useEffect(async () => {
        if (data.children) {
            setExpandedKeyArr(getAllKeys(data.children))
        }
    }, [data])

    useEffect(async () => {
        if (isEditing) {
            setIsDraggable(true)
            setIsSelectable(true)
        } else {
            setSelectedKeyArr([])
            setIsDraggable(false)
        }
    }, [isEditing])

    useEffect(() => {
        setSelected(selectedKeyArr)
        if (!isEditing) setIsSelectable(false)
    }, [selectedKeyArr])

    const getAllKeys = nodesArr => {
        const result = []
        nodesArr.map(node => {
            let childKeys = []
            result.push(node.id)
            if (node.children) {
                childKeys = getAllKeys(node.children)
            }
            result.push(...childKeys)
        })
        return result
    }

    function onDrop1(e) {

    }

    function onCheck(e) {
        setCategory(e)
    }

    function onDrop(info) {
        console.log('')
        console.log(info)
        const dropKey = info.node.key
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition =
            info.dropPosition - Number(dropPos[dropPos.length - 1]);
        const tempData = [data]

        const loop = (data, key, callback) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children, key, callback);
                }
            }
        }

        let dragObj;
        loop(tempData, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item
        });

        if (!info.dropToGap) {
            loop(tempData, dropKey, item => {
                item.children = item.children || []
                item.children.unshift(dragObj)
            });
        } else if (
            (info.node.children || []).length > 0 &&
            info.node.expanded &&
            dropPosition === 1
        ) {
            loop(tempData, dropKey, item => {
                item.children = item.children || []
                item.children.unshift(dragObj)
            })
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

    function onSelect(e) {
        setSelectedKeyArr(e)
    }

    return (
        <Styled className='category-tree'
            checkable
            draggable={isDraggable}
            selectable={isSelectable}
            onCheck={onCheck}
            onDrop={onDrop1}
            onSelect={onSelect}
            expandedKeys={expandedKeyArr}
            selectedKeys={selectedKeyArr}
            treeData={data.children}
            fieldNames={{ key: 'id' }}
        />
    )
}
