import { Button } from "antd";
import { useEffect, useState } from "react";
import { InputForm } from "shared/ui/filter/category/InputForm";
import { useRenameRemoveCategory } from "./hooks";

export const RenameRemoveSelected = ({ category }) => {
    const [renameToggle, setRenameToggle] = useState(false);
    const [input, setInput] = useState("");

    const { renameCategoryMutation, removeCategoryMutation } =
        useRenameRemoveCategory();

    useEffect(() => {
        setInput(category.title)
        setRenameToggle(false)
    }, [category])

    const handleRemoveCategory = () => {
        removeCategoryMutation.mutateAsync(category.id);
    };

    const handleRenameCategory = () => {
        renameCategoryMutation.mutateAsync({
            id: category.id,
            updates: {
                title: input,
            },
        });
    };

    return (
        <div className="rename-remove-selected">
            {renameToggle ? (
                <InputForm
                    input={{ get: input, set: setInput }}
                    func={handleRenameCategory}
                    onCancel={() => {
                        setRenameToggle(false);
                    }}
                ></InputForm>
            ) : (
                <div className="actions">
                    <Button
                        onClick={() => {
                            setRenameToggle(true);
                        }}
                    >
                        Rename
                    </Button>
                    <Button onClick={handleRemoveCategory}>Remove</Button>
                </div>
            )}
        </div>
    );
};
