import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { LockOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { AuthForm } from '../../widgets/auth/AuthForm.jsx'
import { Dropdown } from 'antd'

const Styled = styled.div`
    height: 50px;
    width: 100vw;
    display: flex;
    align-items: center;
    padding: 0 15px;
    background: lightsteelblue;
    justify-content: space-between;
`

export const Navbar = () => {
    return (
        <Styled className='navbar'>
            <div>
                <Button>MAIN</Button>
                <Button>HELP</Button>
            </div>
            <div>
                <Dropdown
                    overlay={<AuthForm></AuthForm>}
                >
                    <Button>
                        <LockOutlined>logout</LockOutlined>
                    </Button>
                </Dropdown>
            </div>
        </Styled>
    )
}
