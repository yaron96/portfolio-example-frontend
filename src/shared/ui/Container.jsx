import styled from 'styled-components'

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1440px;
    width: 100%;
    flex: 1 1 auto;

    background-color: #ccf2ff;

    border-color: lightskyblue;
    border-style: solid;
    border-width: 0px 10px;
`

export const Container = ({children}) => {
    return (
        <Styled className='Container'>
            {children}
        </Styled>
    )
}
