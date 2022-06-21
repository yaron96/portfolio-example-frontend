import { useState } from "react";
import { CategoryTreeService } from "../../../../shared/api/product/category";
import { CategoriesTree } from "./tree";
import { Edit } from "./edit";
import styled from "styled-components";
import { useCategoryTree } from "../../../../entities/product/hooks/useCategoryTree";

export const Category = ({ setCategory }) => {
    const { treeData } = useCategoryTree();
    const [selected, setSelected] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    //const [input, setInput] = useState("");

    async function setSelectedFunc(selectedKeys) {
        if (selectedKeys.length) {
            setSelected(findById(selectedKeys.pop()));
        } else {
            setSelected({});
        }
    }

    const findById = (id) => {
        return find(id, treeData);

        function find(id, node) {
            if (node.id == id) return node;
            else {
                const children = node.children.map((child) => {
                    return find(id, child);
                });
                for (const item of children) {
                    if (item) return item;
                }
            }
        }
    };

    return (
        <Styled className="category">
            {treeData ? (
                <CategoriesTree
                    data={treeData}
                    setCategory={setCategory}
                    setSelected={setSelectedFunc}
                    isEditing={isEditing}
                ></CategoriesTree>
            ) : (
                <h1>loading...</h1>
            )}
            <Edit
                isEditing={{ get: isEditing, set: setIsEditing }}
                selected={{ get: selected, set: setSelected }}
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
