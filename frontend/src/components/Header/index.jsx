import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalLogin from "../Modals/ModalLogin";
import { logoutSuccess } from "../../redux/authReducer";
import ModalSignUp from "../Modals/ModalSignUp";
import Logo from '../../assets/img/logo.png'
function Header() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const account = useSelector((state) => state.auth.account);
    const dispatch = useDispatch();

    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navItems = [
        { path: "/", title: "Trang chủ" },
        { path: "/events", title: "Sự kiện" },
        { path: "/about", title: "Giới thiệu" },
        { path: "/contact", title: "Liên hệ" },
    ];

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    
    const handleShowSigUp = () => setShowSignUp(true);
    const handleCloseSignUp = () => setShowSignUp(false);

    const handleLogout = () => {
        if (dispatch(logoutSuccess())) {
            toast.success("Logged out successfully");
        }
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <Link to="/" className="flex items-center gap-3">
                    {/* <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        P
                    </div>
                    <h1 className="text-2xl font-semibold text-blue-600">PressTix</h1> */}
                    <img className='w-[200px]' src={Logo} alt="" />
                </Link>

                <nav className="hidden md:flex gap-8">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="text-gray-700 hover:text-blue-500 uppercase text-lg transition font-medium"
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
                                <>
                                    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-48 text-sm">
                                        <ul>
                                            {account.role === 0 && (
                                                <Link
                                                    to="/admin"
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Quản trị viên
                                                </Link>
                                            )}
                                            <li>
                                                <Link
                                                    to="/profile"
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Thông tin cá nhân
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/organizer"
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Thông tin ban tổ chức
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                                                >
                                                    Đăng xuất
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleShowLogin}
                                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
                            >
                                Đăng nhập
                            </button>

                            <button onClick={handleShowSigUp}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Đăng ký
                            </button>

                        </>
                    )}
                </div>
            </div>

            <ModalSignUp show={showSignUp} handleShow={handleShowSigUp} handleClose={handleCloseSignUp}/>
            <ModalLogin show={showLogin} handleShow={handleShowLogin} handleClose={handleCloseLogin} />
        </header >
    );
}

export default Header;