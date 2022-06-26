import { useState } from "react";
import { CategoriesTree } from "./tree";
import { Edit } from "./edit";
import styled from "styled-components";

export const Category = ({ setCategory }) => {
    const [selected, setSelected] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Styled className="category">
            <CategoriesTree
                setCategory={setCategory}
                setSelected={setSelected}
                isEditing={isEditing}
            ></CategoriesTree>
            <Edit
                isEditing={{ get: isEditing, set: setIsEditing }}
                selected={selected}
            ></Edit>
        </Styled>
    );
};

const Styled = styled.div`
    display: flex;
    flex-direction: column;

    .edit_form {
        display: flex;
        flex-direction: row;
    }

    .edit_form_button {
        box-sizing: border-box;
        width: 100%;
    }

    .edit_form_nameform {
        display: flex;
        flex-direction: row;
    }
`;
