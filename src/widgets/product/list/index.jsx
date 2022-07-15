import { useState } from "react";
import { AddEditDeleteProdModal } from "features/product/create-update-delete-product/ui";
import { ListItem } from "./ListItem.jsx";
import { List, Pagination, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const ProductList = ({ products, pagination, isLoading }) => {
    const [isModal, setModal] = useState(false);
    const [selectedId, setSelected] = useState(false);

    function createProductFunc() {
        setSelected(Date.now());
        setModal(true);
    }

    function editProductFunc(product) {
        setSelected(product);
        setModal(true);
    }

    if (isLoading) {
        return <div>loading...</div>;
    }

    return (
        <Styled className="productlist">
            <AddEditDeleteProdModal
                visible={{ get: isModal, set: setModal }}
                product={selectedId}
            />
            <div className="addbutton">
                <Button onClick={createProductFunc}>
                    <PlusCircleOutlined /> Create product
                </Button>
            </div>
            {products.length ? (
                <div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={products}
                        renderItem={(prod) => (
                            <ListItem
                                product={prod}
                                onClick={() => editProductFunc(prod)}
                            />
                        )}
                    />
                    <Pagination
                        current={pagination.page}
                        pageSize={pagination.take}
                        total={pagination.total}
                        onChange={(page, take) => {
                            pagination.setPage(page);
                            pagination.setTake(take);
                        }}
                        showSizeChanger
                        pageSizeOptions={[10, 20]}
                        hideOnSinglePage={true}
                    />
                </div>
            ) : (
                <h1>No products to show</h1>
            )}
        </Styled>
    );
};

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
        border-bottom: 5px solid #ccf2ff;

        .item-image {
            width: 250px;

            img {
                width: 100%;
            }
        }
    }
`;
