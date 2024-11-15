import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import ModalBooking from '../../components/Modals/ModalBooking';
import './table.scss'
import PropTypes from 'prop-types';
function TicketTable(props) {
    const { ticketType } = props;
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(false);
    const [isPolling, setIsPolling] = useState(false);

    const handleClose = () => {
        setShow(false);
        setIsPolling(false);
    }

    const handleShow = () => setShow(true);

    const handleChooseTicket = (ticket, quantity) => {
        const qty = parseInt(quantity) || 0;
        const price = ticket.price * qty;

        setCart((prev) => {
            const exitsTicket = prev.find(item => item.name === ticket.name);
            if (exitsTicket) {
                return prev.map((item) =>
                    item.name === ticket.name
                        ? { ...item, quantity: qty, price: price }
                        : item
                )
            } else {
                return [...prev, { ...ticket, quantity: qty, price: price }];
            }
        });
    };

    console.log({cart});

    const calculatorPrice = () => {
        const total = cart.reduce((acc, current) => acc + (current.price), 0);
        setTotalPrice(total);
    }

    useEffect(() => {
        calculatorPrice();
    }, [cart]);

    return (
        <table className="table-booking-ticket table table-striped  bg-[#f0f0f0] my-3">
            <thead>
                <tr>
                    <th colSpan='4' className='text-xl'>Các loại vé</th>
                </tr>
            </thead>
            <tbody>
                {ticketType.map((ticket, index) => (
                    <tr key={index}>
                        <td className="align-middle">{ticket.name}</td>
                        <td className="align-middle w-[200px]">{ticket.price}</td>
                        <td className='w-[70px]'>
                            <input type='number' className='w-[100px] p-[10px]' onChange={(e) => handleChooseTicket(ticket, e.target.value)} />
                        </td>
                    </tr>
                ))}
                <tr>
                    <th className="align-middle" colSpan='1'>Tổng tiền</th>
                    <th className="align-middle" colSpan='1'>{totalPrice}</th>
                    <th className="align-middle" colSpan='1'>
                        <Button className="float-right bg-danger border-0 w-full" onClick={handleShow}>
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


export default TicketTable