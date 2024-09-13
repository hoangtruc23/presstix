import { useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { baseAPI } from '../../api/axiosInstance'


function ModalLogin(props) {
    const { show, handleClose, handleShow } = props;

    const handleBtnLogin = () => {
        console.log('Login');
    }

    const authorizationAuth = async () => {
        const res = await baseAPI.get('api/auth/login');
        console.log({res});
        
    }

    useEffect(()=>{
        authorizationAuth()
    },[])


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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" placeholder="name@gmail.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control type="email" placeholder="********" />
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