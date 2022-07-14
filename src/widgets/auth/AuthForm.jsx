import { LoginForm } from "features/auth/login/ui"
import { RegistrationForm } from "features/auth/registration"
import { Tabs } from 'antd'
import styled from 'styled-components'

const { TabPane } = Tabs;

export const AuthForm = () => {

    return (
        <Styled className="login-form">
            <Tabs className="tabs" centered>
                <TabPane tab="Login" key="2">
                    <LoginForm />
                </TabPane>
                <TabPane tab="Registration" key="1">
                    <RegistrationForm />
                </TabPane>
            </Tabs>
        </Styled>
    );
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


    }

    .tabs {
        width: 500px;
    }
    
`
