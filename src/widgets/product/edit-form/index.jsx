import { FormProps } from './FormProps.jsx'
import { Button } from 'antd'
import styled from 'styled-components'
import { productApi } from '../../../shared/api/product'
import { useCreateProdDraft } from '../../../entities/product/hooks/useCreateDraft.js'
import { Loading } from '../../../shared/ui/Loading.jsx'

export const ProductEditForm = ({ product }) => {

    const {
        draft,
        setDraft,
        isLoading,
        isRefetching 
    } = useCreateProdDraft(product.id)

    function onDelete() {

    }

    function onSave() {
        console.log(draft)
        productApi.updateProduct(draft)
    }

    function onCancel() {

    }

    return (
        <Styled>
            {(isLoading || isRefetching) &&
                <Loading/>
            }
            <FormProps
                    product={{get: draft, set: setDraft}}
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