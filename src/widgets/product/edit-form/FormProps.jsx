import { DraftFormGallery } from '../../../shared/ui/image-gallery'
import { ProductFormCategory } from './ProductFormCategory.jsx'
import { FormProp } from './FormProp.jsx'
import { Input, InputNumber } from 'antd'
import styled from 'styled-components'

const { TextArea } = Input

export const FormProps = ({
    product
}) => {
    return (
        <Styled className='product-form'>
            <FormProp>
                <div className='product-form-title'>
                    <h4>Title</h4>
                    <Input
                        value={product.get.title}
                        onChange={(e) =>
                            product.set({
                                ...product.get,
                                title: e.target.value
                            })}
                    ></Input>
                </div>
            </FormProp>
            <FormProp>
                <h4>Category</h4>
                <ProductFormCategory
                    categoryId={product.get.category}
                    onChange={(value) => product.set({...product.get, category: value})}
                ></ProductFormCategory>
            </FormProp>
            <FormProp>
                <h4>Price</h4>
                <InputNumber
                    value={product.price}
                    onChange={(value) => product.set({...product.get, price: value})}
                    min={1}
                ></InputNumber>
            </FormProp>
            <FormProp className='product-form-description'>
                <h4>Description</h4>
                <TextArea
                    value={product.description}
                    onChange={(e) => product.set({...product.get, description: e.target.value})}
                    rows={6}
                ></TextArea>
            </FormProp>
            <FormProp>
                <DraftFormGallery
                    id={product.get._id}
                    images={product.get.images}
                    onChange={(value => product.set({...product.get, images: value}))}
                ></DraftFormGallery>
            </FormProp>
        </Styled>
    )
}

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;

    width: 100%;
    max-height: 95vh;
    background-color: whitesmoke;

    .product-form-title {
        display: flex;
        flex-direction: column;
        align-items: center;

        width:100%;
        margin: 1px 0px;

        h4 {
            height: 100%;
            margin: 0px 5px  0px 0px;
        }

        input {
            text-align: center;
            max-width: 90%;
        }
    }

    .product-form-description {
        display: flex;
        flex-direction: column;
    }
`