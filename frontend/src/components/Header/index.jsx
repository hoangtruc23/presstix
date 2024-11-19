import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModalLogin from "../Modals/ModalLogin";
import { logoutSuccess } from "../../redux/authReducer";
import { toast } from "react-toastify";

function Header() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const account = useSelector((state) => state.auth.account);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navItems = [
        { path: "/", title: "Home" },
        { path: "/events", title: "Events" },
        { path: "/about", title: "About" },
        { path: "/contact", title: "Contact" },
    ];

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        if (dispatch(logoutSuccess())) {
            toast.success("Logged out successfully");
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
               
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        P
                    </div>
                    <h1 className="text-2xl font-semibold text-blue-600">PressTix</h1>
                </Link>

                <nav className="hidden md:flex gap-8">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="text-gray-700 hover:text-blue-500 transition font-medium"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-6 relative">
                    {isAuthenticated ? (
                        <div>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 text-gray-700 hover:text-blue-500 font-medium"
                            >
                                <i className="fa-solid fa-user-circle text-2xl"></i>
                                <span>{account.name}</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-48 text-sm">
                                    <ul>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/organizer"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                            >
                                                My Organizer
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleShow}
                                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
                            >
                                Login
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>

            <ModalLogin show={show} handleShow={handleShow} handleClose={handleClose} />
        </header>
    );
}

export default Header;