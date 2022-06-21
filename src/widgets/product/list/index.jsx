import { useEffect, useMemo, useState } from 'react'
import { ModalEditForm } from '../edit-form/ModalEditForm'
import { ListItem } from './ListItem.jsx'
import { List, Button } from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'
import styled from 'styled-components'

export const ProductList = ({
    products,
    isLoading,
    filter,
    sort 
}) => {
    
    const [isModal, setModal] = useState(false)
    const [selectedId, setSelected] = useState(false)

    //hook reselect
    const filtredProducts = useMemo(() => {
        if (products && products.length) {
            if (filter.category && filter.category.length) {
                return [...products].filter(prod => filter.category.includes(prod.category))
            }
        }
        return products || []
    }, [products, filter])

    function createProductFunc() {
        setSelected(Date.now())
        setModal(true)
    }

    function editProductFunc(product) {
        setSelected(product)
        setModal(true)
    }

    function onModalClose(isSomeChanged) {
        if (isSomeChanged) {
            //fetchProducts()
        }
    }

    if (isLoading) {
        return <div>loading...</div>
    }

    return (
        <Styled className='productlist'>
            <ModalEditForm
                visible={{get: isModal, set: setModal}}
                onClose={onModalClose}
                product={selectedId}
            />
            <div className='addbutton'>
                <Button
                    onClick={createProductFunc}>
                    <PlusCircleOutlined/> Create product
                </Button>
            </div>
            {filtredProducts.length
                ?
                <List
                    itemLayout='vertical'
                    size='large'
                    dataSource={filtredProducts}
                    renderItem={prod => (
                            <ListItem
                                product={prod}
                                onClick={() => editProductFunc(prod)}
                            />
                    )}
                />
                :
                <h1>no products</h1>
            }
        </Styled>
    )
}

const Styled = styled.div`

    display: flex;
    flex-direction: column;
    background: #c8eaff;

    .addbutton {
        display: flex;
        justify-content: center;
        padding: 5px 0px;
    }

    .ant-list {
        width: 100%;
    }

    .productlist-item {
        border-bottom: 5px solid #CCF2FF;

        .item-image {
            width: 250px;

            img {
                width: 100%;
            }
        }
    }
`
