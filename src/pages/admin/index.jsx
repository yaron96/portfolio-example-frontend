import styled from 'styled-components'

import { ProductsPage } from '../products/index.jsx'

const Styled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1 1 auto;
    width: 100%;
` 

export const AdminPage = () => {
    return (
        <Styled className='adminpage'>
           <ProductsPage/>
        </Styled>
    )
}
