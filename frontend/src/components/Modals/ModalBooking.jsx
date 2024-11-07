import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { formatPrice } from '../../assets/js/main.js'
import ModalQRCode from './ModalQRCode.jsx';
import baseQRBanking from '../../services/qrBanking.jsx'
import { postHandlerBankTransfer, postPaymentBooking } from '../../services/paymentService.jsx';
import { toast } from 'react-toastify'
function ModalBooking(props) {
    const { show, handleClose, totalPrice, isPolling, setIsPolling } = props;

    const randomNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const [showModalQR, setShowModalQR] = useState(false);
    // const [content, setContent] = useState(`InvoicesTicket${randomNum}`);
    const content = `InvoicesTicket${randomNum}`;
    const [fileQR, setFileQR] = useState(null);
    const [formValues, setFormValues] = useState({
        email: '',
        fullName: '',
        phone: '',
        discountCode: '',
        agreePolicy: false,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // const checkValidate = () => {
    //     const newErrors = {};

    //     // Validate email
    //     if (!formValues.email) {
    //         newErrors.email = 'Vui lòng nhập email';
    //     } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
    //         newErrors.email = 'Email không hợp lệ';
    //     }

    //     // Validate full name
    //     if (!formValues.fullName) {
    //         newErrors.fullName = 'Vui lòng nhập họ tên';
    //     }

    //     // Validate phone number
    //     if (!formValues.phone) {
    //         newErrors.phone = 'Vui lòng nhập số điện thoại';
    //     } else if (!/^\d{10,11}$/.test(formValues.phone)) {
    //         newErrors.phone = 'Số điện thoại phải từ 10 đến 11 chữ số';
    //     }

    //     // Validate agreement to policy
    //     if (!formValues.agreePolicy) {
    //         newErrors.agreePolicy = 'Bạn cần đồng ý với chính sách của Presstix';
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };


    const handleBtnBanking = async () => {
        // if (!checkValidate()) {
        //     toast.error('Vui lòng điền đầy đủ thông tin hợp lệ');
        //     return;
        // }

        setShowModalQR(true);
        getQRBanking();
        setIsPolling(true);
        await postPaymentBooking(totalPrice, content);
    }

    useEffect(() => {
        if (!isPolling) return;

        const maxTime = 300000;
        const intervalTime = 5000;

        const timeout = setTimeout(() => {
            setIsPolling(false); // Dừng polling sau 5 phút
            console.log('Dừng gọi API sau 5 phút');
        }, maxTime);

        const interval = setInterval(async () => {
            try {
                const res = await postHandlerBankTransfer();
                if (res?.data?.data?.amount === totalPrice && res?.data?.data?.desc.includes(content)) {
                    clearInterval(interval);
                    clearTimeout(timeout);
                    setIsPolling(false);
                    toast.success(res.data.message);
                    handleClose();
                } else {
                    console.log('Điều kiện không thoả mãn:', {
                        amount: res?.data?.data?.amount,
                        totalPrice,
                        desc: res?.data?.data?.desc,
                        content,
                    });
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
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={formValues.fullName}
                            onChange={handleChange}
                            isInvalid={!!errors.fullName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.fullName}
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
                        <Form.Check type="checkbox" onChange={handleChange} isInvalid={!!errors.agreePolicy} id="agreeCheckboxPolicy" label="Tôi đồng ý chính sách của Presstix" />
                        <Form.Control.Feedback type="invalid">{errors.agreePolicy}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Thanh Toán</Form.Label>
                        <Form.Check checked type="radio" label="Chuyển khoản" />
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
    isPolling: PropTypes.integer,
    setIsPolling: PropTypes.integer,
};


export default ModalBooking