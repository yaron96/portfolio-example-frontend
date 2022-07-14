import { useUpdateDelay } from "features/product/create-update-delete-product/hooks/useUpdateDelay";
import { EditProdCategory } from "./category";
import { DraftFormGallery } from "features/product/create-update-delete-product/ui/edit-form/image-gallery";
import { Input, InputNumber } from "antd";
import styled from "styled-components";

const { TextArea } = Input;

export const FormProps = ({ draft, updateFunc }) => {

    const updateDelay = 2000;

    const {
        value: titleValue,
        onChange: titleOnChange,
        onMouseLeave: titleOnMouseLeave
    } = useUpdateDelay({
        initialValue: draft.title,
        updateFunc,
        propertyName: "title",
        delayMs: updateDelay,
    });

    const {
        value: descriptionValue,
        onChange: descriptionOnChange,
        onMouseLeave: descriptionOnMouseLeave
    } = useUpdateDelay({
        initialValue: draft.description,
        updateFunc,
        propertyName: "description",
        delayMs: updateDelay,
    });

    const {
        value: priceValue,
        onChange: priceOnChange,
        onMouseLeave: priceOnMouseLeave
    } = useUpdateDelay({
        initialValue: draft.price,
        updateFunc,
        propertyName: "price",
        delayMs: updateDelay,
    });

    return (
        <Styled className="product-form">
            <FormProp title="Title">
                <Input
                    value={titleValue}
                    onChange={(e) => titleOnChange(e.target.value)}
                    onMouseLeave={titleOnMouseLeave}
                ></Input>
            </FormProp>
            <FormProp title="Category">
                <EditProdCategory
                    id={draft.category}
                    updateFunc={updateFunc}
                ></EditProdCategory>
            </FormProp>
            <FormProp title="Price">
                <InputNumber
                    value={priceValue}
                    onChange={priceOnChange}
                    onMouseLeave={priceOnMouseLeave}
                    min={1}
                ></InputNumber>
            </FormProp>
            <FormProp title="Description">
                <TextArea
                    value={descriptionValue}
                    onChange={(e) => descriptionOnChange(e.target.value)}
                    onMouseLeave={descriptionOnMouseLeave}
                    rows={6}
                ></TextArea>
            </FormProp>
            <FormProp>
                <DraftFormGallery
                    id={draft.id}
                    images={draft.images}
                ></DraftFormGallery>
            </FormProp>
        </Styled>
    );
};

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

        width: 100%;
        margin: 1px 0px;

        h4 {
            height: 100%;
            margin: 0px 5px 0px 0px;
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
`;

const FormProp = ({ children, title }) => {
    return (
        <StyledFormProp className="product-form">
            {title && <h4>{title}</h4>}
            {children}
        </StyledFormProp>
    );
};

const StyledFormProp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 5px 0px;
    border: 2px solid lightblue;
    padding: 5px;
    align-items: center;
    width: 100%;
`;
