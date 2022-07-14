import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AddCategory } from "features/category/add-category";
import { RenameRemoveSelected } from "features/category/rename-remove-category";
import styled from "styled-components";


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
