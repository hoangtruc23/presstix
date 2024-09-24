import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import ModalBooking from '../../components/Modals/ModalBooking';
function TicketTable() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const type_ticket = [
        {
            name: 'Zone1',
            price: 100000,
            quantity: 10,
        },
        {
            name: 'Zone2',
            price: 200000,
            quantity: 10,
        },
        {
            name: 'Zone3',
            price: 300000,
            quantity: 10,
        }
    ]

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

    const calculatorPrice = () => {
        const total = cart.reduce((acc, current) => acc + (current.price), 0);
        setTotalPrice(total);
    }

    useEffect(() => {
        calculatorPrice();
    }, [cart]);

    return (
        <table className="table table-striped  bg-[#f0f0f0]">
            <thead>
                <tr>
                    <th colSpan='4'>Các loại vé</th>
                </tr>
            </thead>
            <tbody>
                {type_ticket.map((ticket, index) => (
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
                        <Button className="float-right" onClick={handleShow}>
                            Đặt vé
                        </Button>
                        <ModalBooking
                            show={show}
                            handleClose={handleClose}
                            totalPrice={totalPrice}
                        />
                    </th>
                </tr>

            </tbody>

        </table>
    )
}

export default TicketTable