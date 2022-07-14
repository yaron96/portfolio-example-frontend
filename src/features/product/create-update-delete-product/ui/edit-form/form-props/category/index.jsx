import { useChooseCategory } from 'entities/category/hooks/useChoseCategory'
import { TreeSelect } from 'antd'
import styled from 'styled-components'

export const EditProdCategory = ({ id, updateFunc }) => {
    const {
        data,
        value,
        onSelect,
    } = useChooseCategory({ id, updateFunc })

    return (
        <Styled className='product-form-category'>
            <TreeSelect
                treeData={data.children}
                fieldNames={{
                    value: 'id'
                }}
                value={value}
                onSelect={onSelect}
                treeDefaultExpandAll
            ></TreeSelect>
        </Styled>
    )
}

const Styled = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;

    .ant-select {
        width: 50%;
    }
`