import { useState, useEffect } from 'react'
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import ModalBooking from '../../components/Modals/ModalBooking';
import './table.scss'
import { formatPrice } from '../../assets/js/main.js';


const validationSchema = Yup.array().of(
    Yup.object().shape({
        quantity: Yup.number()
            .min(1, 'Số lượng phải lớn hơn 0')
            .required('Hãy nhập số lượng vé')
    })
);

function TicketTable(props) {
    const { ticketType } = props;
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(false);
    const [isPolling, setIsPolling] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const handleClose = () => {
        setShow(false);
        setIsPolling(false);
    }

    const handleShow = async () => {
        try {
            await validationSchema.validate(cart, { abortEarly: false });
            setShow(true);
        } catch (error) {
            toast.error("error" + error);
        }
    };

    const handleChooseTicket = (ticket, quantity) => {
        const qty_total = ticket.quantity;
        const qty_sold = ticket.quantity_sold;
        const remainingTickets = qty_total - qty_sold;

        if (quantity == '') {
            quantity = 0;
            return;
        }
        if (quantity > remainingTickets) {
            toast.error(`Số lượng vé chỉ còn ${remainingTickets} vé`);
            setDisabled(true);
            return;
        }

        setDisabled(false);

        setCart((prev) => {
            const existingTicket = prev.find((item) => item.name === ticket.name);
            if (existingTicket) {
                return prev.map((item) =>
                    item.name === ticket.name
                        ? { ...item, quantity: quantity }
                        : item
                );
            } else {
                return [...prev, { ...ticket, quantity: quantity }];
            }
        });
    };

    const calculatorPrice = () => {
        let total = 0;
        for (const item of cart) {
            total += item.price * item.quantity;
        }
        setTotalPrice(total);

    }

    useEffect(() => {
        calculatorPrice();
    }, [cart]);

    return (
        <table className="table-booking-ticket table table-striped bg-[#f0f0f0] my-3">
            <thead>
                <tr>
                    <th colSpan='4' className='text-xl'>Các loại vé</th>
                </tr>
            </thead>
            <tbody>
                {ticketType.map((ticket, index) => (
                    <tr key={index}>
                        <td className="align-middle w-[40%] text-xl">{ticket.name}</td>
                        <td className="align-middle w-[40%] text-xl">{formatPrice(ticket.price)}</td>
                        <td className='w-[30%] text-center'>
                            {ticket.quantity === ticket.quantity_sold ?
                                <h3>Sold out</h3>
                                : <input
                                    type='number'
                                    name='quantity'
                                    defaultValue={0}
                                    className='w-[100px] p-[10px]'
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                    }}
                                    onChange={(e) => handleChooseTicket(ticket, e.target.value)} />
                            }

                        </td>
                    </tr>
                ))}
                <tr>
                    <th className="align-middle" colSpan='1'>Tổng tiền</th>
                    <th className="align-middle text-xl text-blue-500" colSpan='1'>{totalPrice}</th>
                    <th className="align-middle" colSpan='1'>
                        <Button className="float-right bg-danger border-0 w-full" disabled={disabled} onClick={handleShow}>
                            Đặt vé
                        </Button>
                        <ModalBooking
                            show={show}
                            handleClose={handleClose}
                            totalPrice={totalPrice}
                            isPolling={isPolling}
                            setIsPolling={setIsPolling}
                            cart={cart}
                        />
                    </th>
                </tr>
            </tbody>
        </table>
    )
}

TicketTable.propTypes = {
    ticketType: PropTypes.array.isRequired,
};

export default TicketTable;