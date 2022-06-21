import { Button } from 'antd'
import styled from 'styled-components'

export const CloseWarn = ({visible, onClose}) => {

    function closeShowWarn() {
        visible.set(false)
    }

    return (
        <Styled
            className='close-warning'
            style={visible.get ? {} : {display: 'none'}}
            onClick={closeShowWarn}
        >
            <div className='content'>
                <h1>Are you sure want to quit?</h1>
                <div className='buttons'>
                    <Button
                        onClick={closeShowWarn}
                    >No</Button>
                    <Button
                        onClick={() => onClose()}
                    >Yes</Button>
                </div>
            </div>
        </Styled>
    )
}

const Styled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 999;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(200 234 255 / 80%);

    .content {
        padding: 15px;
        border: 5px solid white;
        background: rgb(200 234 255);

        .buttons {
            display: flex;
            justify-content: space-around;
        }
    }
`