import { useRegistration } from "./hooks";
import { Button, Input } from "antd";
import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

export const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { handleSubmit } = useRegistration(email, password);

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
                <Input.Password
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder="Confirm password"
                    prefix={<LockOutlined />}
                ></Input.Password>
            </Input.Group>
            <div className="buttons">
                <Button onClick={handleSubmit}>Registration</Button>
            </div>
        </div>
    );
};
