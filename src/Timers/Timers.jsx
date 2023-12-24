import useLongPress from '../utils/useLongPress';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function Timers (props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const backspaceLongPress = useLongPress(handleShow, 500);

    return (
        <>
            <Button {...backspaceLongPress}>
                Click me
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        
        </>

    );
};

export default Timers;
