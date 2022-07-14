import { ProductsPage } from "pages/products";
import { Tabs } from "antd";
import styled from "styled-components";



export const AdminPage = () => {
    return (
        <Styled className="adminpage">
            <Tabs
                centered
            >
                <Tabs.TabPane
                    key='1'
                    tab="Products"
                >
                    <ProductsPage />
                </Tabs.TabPane>
                <Tabs.TabPane
                    key='2'
                    
                >

                </Tabs.TabPane>
            </Tabs>
        </Styled>
    );
};

const Styled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1 1 auto;
    width: 100%;

    .ant-tabs {
        width: 100%;
    }

    .ant-tabs-content-holder {
        width: 100%;
    }

    .ant-tabs-tabpane {
        display: flex;
        align-items: center;
    }
`;