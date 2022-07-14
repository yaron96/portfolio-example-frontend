import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useLogout } from "./hooks";
import { Button } from "antd";

export const Logout = () => {

    const { handleSubmit } = useLogout();

    return (
        <div>
            
            <div className="buttons">
                <Button onClick={handleSubmit}>Logout</Button>
            </div>
        </div>
    );
};
