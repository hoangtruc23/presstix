import { useState } from 'react';
import { Link } from 'react-router-dom';
import ticket from '../../assets/img/ticket.png'
import ModalLogin from '../Modals/ModalLogin';

function Header() {
    const item_nav = [
        {
            path: '/',
            title: 'Home',
        },
        {
            path: '/events',
            title: 'Events',
        },
        {
            path: '/about',
            title: 'About',
        },
        {
            path: '/contact',
            title: 'Contact',
        },
    ]

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <nav className="header">
            <div className="container mx-auto d-flex justify-between items-center">
                <a className="navbar-brand" href="#">
                    <img src={ticket} alt="Logo" style={{ width: '100px' }} />
                </a>
                <ul className="d-flex gap-3 text-center">
                    {item_nav.map((item, index) => (
                        <Link to={item.path} key={index} className="w-[100px] tracking-wide uppercase py-[20px] border-b-2 border-transparent hover:border-white duration-500 transition-all">{item.title}</Link>
                    ))}
                </ul>
                <div className="d-flex gap-3">
                    <ModalLogin show={show} handleShow={handleShow} handleClose={handleClose} />
                    <button className="px-3 py-2 bg-yellow-400 rounded-full text-black ">Sign Up</button>
                </div>

            </div>
        </nav>
    );
}

export default Header;