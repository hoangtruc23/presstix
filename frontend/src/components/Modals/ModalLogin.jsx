import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { postLoginWithEmailPass } from '../../services/apiService'
// import { useDispatch } from 'react-redux';
// import { doLogin } from '../../services/apiService'

function ModalLogin(props) {
    const { show, handleClose, handleShow } = props;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [status, setStatus] = useState();

   

    const handleBtnLogin = () => {
        LoginWithUserPass();
    }

    const LoginWithUserPass = async () => {
        try {
            const res = await postLoginWithEmailPass(email, password);
            if (res.data.success) {
                setStatus(res.data.success);
                // dispatch(doLogin(res.data))

            }
        } catch (error) {
            console.error(error);
        }
    }

    if (status) {
        handleClose();
        return;
    }

    return (
        <div>
            <Button className="bg-transparent border-0" onClick={handleShow}>
                Login
            </Button>

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

export default ModalLogin