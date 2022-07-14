import { Button } from "antd";

export const Button = ({icon}) => {
    return (
        <Button
            icon={icon}
        >
            {children}
        </Button>
    )
}