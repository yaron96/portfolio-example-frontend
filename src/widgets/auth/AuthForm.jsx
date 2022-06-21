import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthService } from '../../shared/api/auth'
import { Button, Input, Typography } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Text } = Typography

export const AuthForm = () => {
    const { isAuthorized, user } = useSelector(state => state.session)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login () {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch({type: 'SET_USER', payload: response.data.user})
            dispatch({type: 'SET_IS_AUTHORIZED', payload: true})
        } catch(e) {
            console.log(e)
        }
    }

    async function registration() {
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch({type: 'SET_USER', payload: response.data.user})
            dispatch({type: 'SET_IS_AUTHORIZED', payload: true})
        } catch(e) {
            console.log(e)
        }
    }

    async function logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            dispatch({type: 'SET_USER', payload: null})
            dispatch({type: 'SET_IS_AUTHORIZED', payload: false})
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <Styled className='login-form'>
            {isAuthorized
                ?
                <div className='form'>
                    <Text>{user.email}</Text>
                    <Button
                        onClick={logout}
                    >logout</Button>
                </div>
                :
                <div className='form'>
                    <Input.Group size='large'>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder='Email'
                            prefix={<MailOutlined/>}
                        >
                        </Input>
                        <Input.Password
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder='Password'
                            prefix={<LockOutlined/>}
                        >
                        </Input.Password>
                    </Input.Group>
                    <div className='buttons'>
                        <Button
                            onClick={login}
                        >Login</Button>
                        <Button
                            onClick={registration}
                        >Registration</Button>
                    </div>
                </div>
        }
        </Styled>
    )
}

const Styled = styled.div`
    margin: 10px;
    padding: 10px;
    background-color: white;

    .form {
        display: flex;
        flex-direction: column;

        .inputs {
            display: flex;
            flex-direction: column;
        }

        .buttons {
            display: flex;
            justify-content: center;
        }
    }
`
