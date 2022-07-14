import { useUser } from "entities/session";
import { Logout } from "features/auth/logout/ui.jsx";
import { AuthForm } from "widgets/auth/AuthForm.jsx";
import { Button, Dropdown } from "antd";
import { LockOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const Navbar = () => {

    return (
        <Styled className="navbar">
            <div>
                <Button>MAIN</Button>
                <Button>HELP</Button>
            </div>
            <div>
                <AuthNavbar />
            </div>
        </Styled>
    );
};

const Styled = styled.div`
    height: 50px;
    width: 100vw;
    display: flex;
    align-items: center;
    padding: 0 15px;
    background: lightsteelblue;
    justify-content: space-between;

    .authorized {
        display: flex;
        flex-direction: row;
    }
`;
const AuthNavbar = () => {
    const user = useUser();

    return (
        <div>
            {user ? (
                <div className="authorized">
                    {user.email}
                    <Logout />
                </div>
            ) : (
                <div>
                    <Dropdown overlay={<AuthForm />}>
                        <Button>
                            <LockOutlined /> Authorize
                        </Button>
                    </Dropdown>
                </div>
            )}
        </div>
    );
};
