import { useState,useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types'

function ModalQRCode(props) {
    const { show, setShow, fileQR } = props;
    const [time, setTime] = useState(300);

    const handleClose = () => {
        setShow(!show);
        setTime(300);
    }

    useEffect(() => {
        if (!show) return; // Không đếm ngược nếu modal không hiển thị

        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    alert("Countdown finished!");
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval); // Xóa interval khi component bị unmount
    }, [show]);

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <img src={fileQR} />
                <div className="mt-3 text-center">
                    Thời gian còn lại: {formatTime()}
                </div>
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
    fileQR: PropTypes.string,
}

export default ModalQRCode