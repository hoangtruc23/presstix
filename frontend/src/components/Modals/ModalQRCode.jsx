import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types'

function ModalQRCode(props) {
    const {show,setShow,fileQR} = props;

    const handleClose = () => {
        setShow(!show);
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <img src={fileQR} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Huỷ
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

ModalQRCode.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    fileQR: PropTypes.string.isRequired,
}

export default ModalQRCode