import styled from "styled-components";
import { Button } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { RenameRemoveSelected } from "../../../../../features/rename-remove-category";
import { AddCategory } from "../../../../../features/add-category";

export const Edit = ({ isEditing, selected }) => {

    function editToggle() {
        isEditing.set(!isEditing.get);
    }

    return (
        <Styled className="category-edit-form">
            {selected ? (
                <RenameRemoveSelected category={selected} />
            ) : (
                <AddCategory isEditing={isEditing.get} />
            )}
            <Button className="lock-toggle" onClick={editToggle}>
                {isEditing.get ? <LockOutlined /> : <UnlockOutlined />}
            </Button>
        </Styled>
    );
};

const Styled = styled.div`
    display: flex;
    flex-direction: column;

    .lock-toggle {
        width: inherit;
    }

    .add-button {
        width: 100%;
    }
`;
