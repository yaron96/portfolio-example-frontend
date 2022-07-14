import { AuthForm } from "widgets/auth/AuthForm"
import styled from 'styled-components'

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`

export const AuthPage = () => {
    return (
        <Styled className='login-page'>
            <h1>To use admin panel, pls authorize!</h1>
        </Styled>
    )
}
