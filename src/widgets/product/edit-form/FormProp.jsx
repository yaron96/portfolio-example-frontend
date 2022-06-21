import styled from 'styled-components'

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 5px 0px;
    border: 2px solid lightblue;
    padding: 5px;
    align-items: center;
    width: 100%;
`

export const FormProp = ({children}) => {
    return (
        <Styled className='product-form'>
            {children}
        </Styled>
    )
}
