import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Input } from "antd"
import { useState } from "react";
import { useLogin } from "./hooks";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {
        handleSubmit
    } = useLogin(email, password);

    return (
        <div>
            <Input.Group size="large">
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                    prefix={<MailOutlined />}
                ></Input>
                <Input.Password
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                    prefix={<LockOutlined />}
                ></Input.Password>
            </Input.Group>
            <div className="buttons">
                <Button onClick={handleSubmit}>Log in</Button>
            </div>
        </div>
    )
}