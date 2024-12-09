import { Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { formatPrice } from '../../assets/js/main.js';
import { postInfoBankingOrganizer, getWithdrawal } from '../../services/apiService.jsx';

function ModalWithDraw(props) {
    const { totalWallet, show, handleClose, bank, account_name, account_number } = props;


    const handleSubmitWithdraw = async () => {
        await postInfoBankingOrganizer(bank, account_number, account_name);
        const res = await getWithdrawal();

        toast.success(res.data.message);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận yêu cầu thanh toán</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3 className='text-danger text-center'>
                    Hãy kiểm tra thật kỹ thông tin! <br></br> Mọi sai sót PressTix sẽ không chịu trách nhiệm
                </h3>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Chọn ngân hàng</Form.Label>
                        <Form.Control type="text" value={bank} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tên tài khoản</Form.Label>
                        <Form.Control type="text" value={account_name} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Số tài khoản</Form.Label>
                        <Form.Control type="text" value={account_number} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Xác nhận đã nhập đúng thông tin" />
                    </Form.Group>

                    <p>Số tiền thanh toán: <strong className='text-xl text-blue-500'>{formatPrice(totalWallet)}</strong> </p>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Thoát
                </Button>
                <Button variant="primary" onClick={handleSubmitWithdraw}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    )
}



ModalWithDraw.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    event: PropTypes.object,
    totalWallet: PropTypes.number,
    bank: PropTypes.string,
    account_name: PropTypes.string,
    account_number: PropTypes.string
};


export default ModalWithDraw
