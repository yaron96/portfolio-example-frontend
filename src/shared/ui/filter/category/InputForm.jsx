import styled from "styled-components";
import { Button, Input } from "antd";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const Styled = styled.div`
    display: flex;
    flex-direction: row;

    .buttons {
        display: flex;
        flex-direction: row;
    }
`;

export const InputForm = ({ input, func, onCancel }) => {
    const iconStyle = { fontSize: "25px" };
    const buttonStyle = { padding: "1px 7px" };

    return (
        <Styled>
            <Input
                value={input.get}
                onChange={(e) => input.set(e.target.value)}
            ></Input>
            <div className="buttons">
                <Button
                    onClick={func}
                    disabled={!input.get.length}
                    style={Object.assign({}, buttonStyle, { color: "#08c" })}
                >
                    <PlusCircleOutlined style={iconStyle} />
                </Button>
                <Button
                    onClick={onCancel}
                    style={Object.assign({}, buttonStyle, { color: "#ff0000" })}
                >
                    <CloseCircleOutlined style={iconStyle} />
                </Button>
            </div>
        </Styled>
    );
};
