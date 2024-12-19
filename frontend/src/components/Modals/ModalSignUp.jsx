import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { postSignUpWithEmailPass } from '../../services/apiService'
function ModalSignUp(props) {
    const { show, handleClose } = props;
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();


    const handleBtnSignUp = () => {
        if (isEmpty(email) || isEmpty(password) || isEmpty(name) == null) {
            toast.warning('Vui lòng nhập thông tin đăng nhập');
        } else {
            SignUpWithUserPass();
        }
    }

    const SignUpWithUserPass = async () => {
        event.preventDefault();
        try {
            const res = await postSignUpWithEmailPass(name, email, password, phone);

            if (res.data.success) {
                toast.success(res.data.message);
                handleClose();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Đăng nhập thất bại' + error.message);

        }
    }

    return (
        <div>

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đăng ký</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control name='name' onChange={(e) => setName(() => e.target.value)} type="text" placeholder="Họ tên" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name='email' onChange={(e) => setEmail(() => e.target.value)} type="email" placeholder="email@gmail.com" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control name='phone' onChange={(e) => setPhone(() => e.target.value)} type="number" placeholder="0987654321" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control name='password' onChange={(e) => setPassword(() => e.target.value)} type="password" placeholder="********" />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" >
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control name='passwordTwo' onChange={(e) => setPassword(() => e.target.value)} type="password" placeholder="********" />
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Thoát
                    </Button>
                    <Button onClick={handleBtnSignUp}>Đăng ký</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

ModalSignUp.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default ModalSignUp