import { useEffect, useState } from 'react'
import { Modal } from '../../../shared/ui/modal/index.jsx'
import { CloseWarn } from '../../../shared/ui/modal/CloseWarn.jsx'
import styled from 'styled-components'
import { ProductEditForm } from './'

export const ModalEditForm = ({ product, visible, onClose}) => {

    const [warnVisible, setWarnVisible] = useState(false)

    function onCancel() {
        setWarnVisible(true)
    }

    function closeModal(isSomeChanged = false) {
        onClose(isSomeChanged)
        visible.set(false)
    }

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
        >
            <CloseWarn
                visible={{get: warnVisible, set: setWarnVisible}}
                onClose={closeModal}
            ></CloseWarn>
            <ProductEditForm
                product={product}
            />
        </Modal>
    )
}