import { useState } from 'react'
import { Modal } from 'shared/ui/modal'
import { CloseWarn } from 'shared/ui/modal/CloseWarn.jsx'
import { ProdEditForm } from './edit-form'

export const AddEditDeleteProdModal = ({ product, visible}) => {
    const [warnVisible, setWarnVisible] = useState(false)

    function onCancel() {
        setWarnVisible(true)
    }

    function closeModal() {
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
            <ProdEditForm
                product={product}
                onCancel={onCancel}
                closeModal={closeModal}
            />
        </Modal>
    )
}