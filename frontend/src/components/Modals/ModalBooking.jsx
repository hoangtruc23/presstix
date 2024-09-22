import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';


function ModalBooking(props) {
    const { show, handleClose } = props;
    return (
        <Modal show={show} backdrop="static" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chọn Vé</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Mã giảm giá: </Form.Label>
                        <Form.Control type="type" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Tổng tiền: </Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Check type="checkbox" id="agreeCheckboxPolicy" label="Tôi đồng ý chính sách của Presstix" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Thanh Toán</Form.Label>
                        <Form.Check type="radio" label="Chuyển khoản" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" >
                    Tiếp theo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


ModalBooking.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};


export default ModalBooking