import { useSort } from "./hooks"
import { Button } from "antd";
import {
    SortAscendingOutlined,
    SortDescendingOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const Styled = styled.div`
    display: flex;
    background: #c8eaff;
    flex-direction: column;

    Button {
        border: 0;
    }
`;

export const ProductSort = ({ setSort }) => {
    const { value, setValue, sortBy } = useSort(setSort);

    return (
        <Styled className="product-sort">
            <div>SORT</div>
            <div>
                <Button
                    ghost
                    icon={<SortAscendingOutlined />}
                    disabled={value === sortBy.PRICE_ASC}
                    onClick={() => setValue(sortBy.PRICE_ASC)}
                >
                    Price ascending
                </Button>
                <Button
                    ghost
                    icon={<SortDescendingOutlined />}
                    disabled={value === sortBy.PRICE_DESC}
                    onClick={() => setValue(sortBy.PRICE_DESC)}
                >
                    Price descending
                </Button>
                <Button
                    ghost
                    icon={<SortAscendingOutlined />}
                    disabled={value === sortBy.CREATED_AT_ASC}
                    onClick={() => setValue(sortBy.CREATED_AT_ASC)}
                >
                    Created date ascending
                </Button>
                <Button
                    ghost
                    icon={<SortAscendingOutlined />}
                    disabled={value === sortBy.CREATED_AT_DESC}
                    onClick={() => setValue(sortBy.CREATED_AT_DESC)}
                >
                    Created date descending
                </Button>
                <Button
                    ghost
                    icon={<SortAscendingOutlined />}
                    disabled={value === sortBy.UPDATED_AT_ASC}
                    onClick={() => setValue(sortBy.UPDATED_AT_ASC)}
                >
                    Updated date ascending
                </Button>
                <Button
                    ghost
                    icon={<SortAscendingOutlined />}
                    disabled={value === sortBy.UPDATED_AT_DESC}
                    onClick={() => setValue(sortBy.UPDATED_AT_DESC)}
                >
                    Updated date descending
                </Button>
            </div>
        </Styled>
    );
};
