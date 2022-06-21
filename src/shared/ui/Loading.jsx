import styled from 'styled-components'
import { Spin } from 'antd'

export const Loading = () => {
    return (
        <Styled>
            <Spin
                size='large'
                tip='Loading...'
            />
        </Styled>
    )
}

const Styled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 888;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(200 234 255 / 90%);
`