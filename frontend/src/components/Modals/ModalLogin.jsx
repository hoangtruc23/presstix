import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { postLoginWithEmailPass } from '../../services/apiService'
import { loginSuccess } from '../../redux/authReducer';

function ModalLogin(props) {
    const { show, handleClose, handleShow } = props;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const dispatch = useDispatch();

    const handleBtnLogin = () => {
        if (isEmpty(email) || isEmpty(password) == null) {
            toast.warning('Vui lòng nhập thông tin đăng nhập');
        } else {
            LoginWithUserPass();
        }
    }

    const LoginWithUserPass = async () => {
        event.preventDefault();
        try {
            const res = await postLoginWithEmailPass(email, password);
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(loginSuccess(res.data))
                handleClose();
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Đăng nhập thất bại');
            console.error(error);
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
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control name='email' onChange={(e) => setEmail(() => e.target.value)} type="email" placeholder="name@gmail.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control name='password' onChange={(e) => setPassword(() => e.target.value)} type="password" placeholder="********" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleBtnLogin}>Login</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

ModalLogin.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleShow: PropTypes.func.isRequired,
};

export default ModalLogin