import { useState, useEffect } from "react"
import { useFetching } from "../../../hooks/useFetching.js"
import { TreeSelect } from 'antd'
import styled from 'styled-components'

const Styled = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;

    .ant-select {
        width: 50%;
    }
`
export const ProductFormCategory = ({ categoryId, onChange }) => {

    const [treeData, setTreeData] = useState(false)
    const [value, setValue] = useState(false)

    const {
        fetch,
        data
    } = useFetching(() => {
        //CategoryTreeService.get()
    })


    useEffect(async () => {
        fetch()
    }, [])

    useEffect(() => {
        if (data) {
            setTreeData()
                //CategoryTreeService.treeSelectTransfer(data.children))
            setValue(categoryId)
        }
    }, [data])

    return (
        <Styled className='product-form-category'>
            <TreeSelect
                treeData={treeData}
                value={value}
                onChange={onChange}
                treeDefaultExpandAll
            ></TreeSelect>
        </Styled>
    )
}
