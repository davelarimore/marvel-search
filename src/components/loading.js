import React from 'react';
import { Modal, ModalBody } from 'reactstrap';


export const Loading = (props) => {
    return (
        <Modal isOpen={true} centered={true}>
            <ModalBody>Getting results...</ModalBody>
        </Modal>
    )
}

export default Loading;