import styled from 'styled-components'

const Styled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

export const AuthPage = () => {
    return (
        <Styled className='login-page'>
            <h1>pls authorize</h1>
        </Styled>
    )
}
