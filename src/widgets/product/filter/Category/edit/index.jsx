import styled from "styled-components";
import { Button } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { NameForm } from './NameForm'
import { useAddRenameCategory } from "../../../../../features/add-rename-category/hooks";

export const Edit = ({ isEditing, selected }) => {
    const [input, setInput] = useState("");
    const [addToggle, setAddToggle] = useState(false);
    const [renameToggle, setRenameToggle] = useState(false);

    const {
        addCategoryMutation,
        removeCategoryMutation,
        updateCategoryMutation,
    } = useAddRenameCategory();

    const handleAddCategory = () => {
        addCategoryMutation.mutateAsync({ title: input });
    };

    const handleRemoveCategory = () => {
        removeCategoryMutation.mutateAsync(selected.get.id)
    };

    const handleRenameCategory = () => {
        updateCategoryMutation.mutateAsync(selected.get.id, {
            'title': input
        })
    };

    useEffect(() => {
        if (selected && selected.title) {
            setInput(selected.title);
        } else {
            if (addToggle) setAddToggle(false);
            if (renameToggle) setRenameToggle(false);
            setInput("");
        }
    }, [selected]);

    useEffect(() => {
        setAddToggle(false);
        setRenameToggle(false);
    }, [isEditing.get]);

    function editToggle() {
        isEditing.set(!isEditing.get);
        selected.set(false);
    }

    return (
        <Styled className="category-edit-form">
            {selected.get && selected.get.id ? (
                <div className="selected">
                    {renameToggle ? (
                        <NameForm
                            input={{ get: input, set: setInput }}
                            func={handleRenameCategory}
                            onCancel={() => {
                                setRenameToggle(false);
                            }}
                        ></NameForm>
                    ) : (
                        <div className="actions-with-item">
                            <Button
                                onClick={() => {
                                    setRenameToggle(true);
                                }}
                            >
                                Rename
                            </Button>
                            <Button onClick={handleRemoveCategory}>
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="add-new-category">
                    {addToggle ? (
                        <NameForm
                            input={{ get: input, set: setInput }}
                            func={handleAddCategory}
                            onCancel={() => {
                                setAddToggle(false);
                            }}
                        ></NameForm>
                    ) : (
                        <Button
                            className="add-button"
                            disabled={!isEditing.get}
                            onClick={() => setAddToggle(true)}
                        >
                            ADD NEW
                        </Button>
                    )}
                </div>
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