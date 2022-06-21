import { Modal as modal } from 'antd'
import styled from 'styled-components'

const Styled = styled(modal)`

    width: 800px;

    .ant-modal-content {
        width: 800px;
    }

    .ant-modal-body {
        padding: 0px;
    }
`

export const Modal = ({children, visible, onCancel}) => {

    return (
        <Styled className='modal'
            onCancel={onCancel}
            footer={false}
            visible={visible.get}
            closable={false}
            width={false}
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '100vh',
                top: 'auto',
                paddingBottom: 0,
            }}
        >
            <div className='asd'>
                {children}
            </div>
        </Styled>
    )
}
