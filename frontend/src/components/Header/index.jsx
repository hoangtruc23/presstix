import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import ticket from '../../assets/img/ticket.png'
import ModalLogin from '../Modals/ModalLogin';
import {logoutSuccess} from '../../redux/authReducer'
import { toast } from 'react-toastify';
function Header() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const account = useSelector(state => state.auth.account);
    const dispatch = useDispatch();
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
    const [offset, setOffset] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBtnLogout = () => {
        if(dispatch(logoutSuccess())){
            toast.success('Đăng xuất thành công');
        };
        
    }

    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY);
       
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`header ${offset >= 250 ? 'active-header animate__animated animate__fadeInDown' : ''}`}>
            <div className="container mx-auto d-flex justify-between items-center">
                <a className="navbar-brand" href="#">
                    <img src={ticket} alt="Logo" style={{ width: '100px' }} />
                </a>
                <ul className="d-flex gap-3 text-center">
                    {item_nav.map((item, index) => (
                        <Link to={item.path} key={index} className="w-[100px] tracking-wide uppercase py-[20px] border-b-2 border-transparent hover:border-white duration-500 transition-all">{item.title}</Link>
                    ))}
                </ul>
                {isAuthenticated ? (
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <span>{account.name}</span>
                            <i className="text-[20px] fa-solid fa-user ms-2"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleBtnLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <div className="d-flex gap-3">
                        <ModalLogin show={show} handleShow={handleShow} handleClose={handleClose} />
                        <button className="px-3 py-2 bg-yellow-400 rounded-full text-black ">Sign Up</button>
                    </div>
                )}
            </div>
        </nav >
    );
}

export default Header;