import { useCreateUpdateDeleteProd } from "features/product/create-update-delete-product/hooks";
import { FormProps } from "./form-props";
import { Loading } from "shared/ui/Loading";
import { Button } from "antd";
import styled from "styled-components";

export const ProdEditForm = ({ product, onCancel, closeModal }) => {
    const {
        draft,
        isLoading,
        addProductMutation,
        updateProductMutation,
        updateDraftMutation,
        deleteProductMutation,
    } = useCreateUpdateDeleteProd(product.id);

    async function handleDelete() {
        await deleteProductMutation.mutateAsync();
        closeModal();
    }

    async function handleSave() {
        if (product.id) {
            await updateProductMutation.mutateAsync(draft.id);
        } else {
            await addProductMutation.mutateAsync(draft.id);
        }
        closeModal();
    }

    async function handleUpdate(updates) {
        await updateDraftMutation.mutateAsync(updates);
    }

    return (
        <Styled className="product-edit-form">
            {isLoading && <Loading />}
            <FormProps draft={draft} updateFunc={handleUpdate}></FormProps>
            <div className="bottom-buttons">
                <Button onClick={handleDelete}>delete</Button>
                <Button onClick={onCancel}>cancel</Button>
                <Button onClick={handleSave}>save</Button>
            </div>
        </Styled>
    );
};

const Styled = styled.div`
    margin: 2px;

    .bottom-buttons {
        display: flex;
        align-items: center;
        justify-content: center;

        Button {
            margin: 2px;
        }
    }
`;
