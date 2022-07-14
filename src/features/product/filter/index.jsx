import { Category } from './category'
import { Price } from './price'
import styled from 'styled-components'

export const ProductFilter = ({ setFilter }) => {
    return (
        <Styled className="productfilter">
            <Category setFilter={setFilter}></Category>
            <Price setFilter={setFilter}></Price>
        </Styled>
    );
};

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #c8eaff;
`