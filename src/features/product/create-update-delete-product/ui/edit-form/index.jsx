import { useCreateUpdateDeleteProd } from 'features/product/create-update-delete-product/hooks'
import { FormProps } from './form-props'
import { Loading } from 'shared/ui/Loading'
import { Button } from 'antd'
import styled from 'styled-components'

export const ProdEditForm = ({ product, onCancel, closeModal }) => {
    const {
        draft,
        isLoading,
        addProductMutation,
        updateProductMutation,
        updateDraftMutation,
    } = useCreateUpdateDeleteProd(product.id)

    function onDelete() {

    }

    async function onSave() {
        if (product.id) {
            await updateProductMutation.mutateAsync(draft.id)
        } else {
            await addProductMutation.mutateAsync(draft.id)
        }
        closeModal()
    }

    async function onUpdate(updates) {
        console.log('updates')
        console.log(updates)
        await updateDraftMutation.mutateAsync(updates)
    }

    return (
        <Styled className="product-edit-form">
            {(isLoading) &&
                <Loading/>
            }
            <FormProps
                    draft={draft}
                    updateFunc={onUpdate}
            ></FormProps>
            <div className='bottom-buttons'>
                    <Button
                        onClick={onDelete}
                    >delete</Button>
                    <Button
                        onClick={onCancel}
                    >cancel</Button>
                    <Button
                        onClick={onSave}
                    >save</Button>
                </div>
        </Styled>
    )
}

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
`