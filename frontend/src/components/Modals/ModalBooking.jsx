import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { formatPrice } from '../../assets/js/main.js'
import ModalQRCode from './ModalQRCode.jsx';
import baseQRBanking from '../../services/qrBanking.jsx'
import { postHandlerBankTransfer, postPaymentBooking, postTicket } from '../../services/paymentService.jsx';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Phone must contain only numbers')
        .required('Phone is required'),
    agreePolicy: Yup.bool().oneOf([true], 'You must agree to the policy').required('Check'),
});


function ModalBooking(props) {
    const account = useSelector(state => state.auth);
    const { show, handleClose, totalPrice, cart, isPolling, setIsPolling } = props;
    const randomNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const [showModalQR, setShowModalQR] = useState(false);
    const [content] = useState(`InvoicesTicket${randomNum}`);
    const [fileQR, setFileQR] = useState(null);
    const [formValues, setFormValues] = useState({
        email: account.account.email || '',
        fullName: account.account.name || '',
        phone: account.account.phone || '',
        discountCode: '',
        agreePolicy: false,
    });
    const [errors, setErrors] = useState({});
    const navigation = useNavigate();
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleBtnBanking = async () => {
        try {
            await validationSchema.validate(formValues, { abortEarly: false });
            setShowModalQR(true);
            getQRBanking();
            setIsPolling(true);
            await postPaymentBooking(totalPrice, content, formValues.email, formValues.phone);
        } catch (err) {
            const validationErrors = err.inner.reduce((acc, error) => {
                acc[error.path] = error.message;
                return acc;
            }, {});
            setErrors(validationErrors);
        }
    };

    const insertTicket = async (invoiceID) => {
        if (invoiceID) {
            try {
                for (const item of cart) {
                    await postTicket({
                        name: item.name,
                        price: item.price,
                        event_id: item.event_id,
                        invoice_id: invoiceID,
                        quantity: item.quantity,
                    });
                }
            } catch (error) {
                console.error("Lỗi khi thêm ticket:" + error);
            }
        } else {
            console.error("Không insert được ticket");
        }
    }

    useEffect(() => {
        if (!isPolling) return;

        const maxTime = 300000;
        const intervalTime = 5000;

        const timeout = setTimeout(() => {
            setIsPolling(false);
        }, maxTime);

        const interval = setInterval(async () => {
            try {
                const res = await postHandlerBankTransfer();
                if (res?.data?.data?.amount === totalPrice && res?.data?.data?.desc.includes(content)) {
                    insertTicket(res.data.data.invoice_id);
                    clearInterval(interval);
                    clearTimeout(timeout);
                    setIsPolling(false);
                    toast.success(res.data.message);
                    handleClose();
                    navigation('/profile');
                    setTimeout(() => {
                        window.location.reload();
                    }, 0);

                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }, intervalTime);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [isPolling]);


    const getQRBanking = () => {
        const res = baseQRBanking(totalPrice, content);
        setFileQR(res);
    }


    return (
        <Modal show={show} backdrop="static" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chọn Vé</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formValues.phone}
                            onChange={handleChange}
                            isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phone}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Mã giảm giá: </Form.Label>
                        <Form.Control type="type" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Tổng tiền: <span className='text-red-500'>{formatPrice(totalPrice)}</span></Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Check type="checkbox" onChange={handleChange} isInvalid={!!errors.agreePolicy} name="agreePolicy" label="Tôi đồng ý chính sách của Presstix" />
                        <Form.Control.Feedback type="invalid">{errors.agreePolicy}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Thanh Toán</Form.Label>
                        <Form.Check defaultChecked type="radio" label="Chuyển khoản" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" data-bs-target="#exampleModalToggle2" onClick={handleBtnBanking}>
                    Tiếp theo
                </Button>
                <ModalQRCode show={showModalQR} setShow={setShowModalQR} fileQR={fileQR} totalPrice={totalPrice} />
            </Modal.Footer>
        </Modal>

    )
}

ModalBooking.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    totalPrice: PropTypes.number.isRequired,
    isPolling: PropTypes.bool,
    setIsPolling: PropTypes.func,
    cart: PropTypes.array,
};


export default ModalBooking