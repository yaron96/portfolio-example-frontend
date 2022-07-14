import { Button } from "antd";
import { useState } from "react";
import { InputForm } from "shared/ui/filter/category/InputForm";
import { useAddCategory } from "./hooks";

export const AddCategory = ({isEditing}) => {
    const [addToggle, setAddToggle] = useState(false)
    const [input, setInput] = useState("")

    const addCategoryMutation = useAddCategory()

    const handleAddCategory = () => {
        addCategoryMutation.mutateAsync({ title: input });
        setInput("")
    };

    if (addCategoryMutation.isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className="add-new-category">
            {addToggle ? (
                <InputForm
                    input={{ get: input, set: setInput }}
                    func={handleAddCategory}
                    onCancel={() => {
                        setAddToggle(false);
                    }}
                ></InputForm>
            ) : (
                <Button
                    className="add-button"
                    disabled={!isEditing}
                    onClick={() => setAddToggle(true)}
                >
                    ADD NEW
                </Button>
            )}
        </div>
    );
};
