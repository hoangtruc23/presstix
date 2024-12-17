import { Link } from "react-router-dom"
import BtnNavBar from "../Button/Organizer/BtnNavBar"


function NavbarAdmin() {
    const nav_menu = [
        { path: 'manage-user', name: 'Quản lý khách hàng', icon: 'fa-solid fa-plus' },
        { path: 'manage-event', name: 'Quản lý sự kiện', icon: 'fa-solid fa-plus' },
        { path: 'manage-withdraw', name: 'Quản lý thanh toán', icon: 'fa-solid fa-plus' },
        { path: 'manage-statistics', name: 'Quản lý thống kê', icon: 'fa-solid fa-plus' },
        { path: '/', name: 'Trang chủ', icon: 'fa-solid fa-arrow-left-long' },

    ]
    return (
        <nav className="bg-[#77a9ff] w-[270px] fixed top-0 left-0 h-screen px-6 py-8 text-white shadow-lg z-50 transition-all ease-in-out duration-300">
            <div className="flex flex-col space-y-8">
                <Link to='/admin' className=" text-2xl font-semibold tracking-wide text-white hover:text-gray-200 transition duration-300">
                    <h3 className='m-0'>Quản trị viên</h3>
                </Link>

                <ul className="space-y-6">
                    {nav_menu.map((nav, index) => (
                        <BtnNavBar key={index} nav={nav} className="flex items-center text-lg font-medium text-white hover:text-gray-200 transition duration-300">
                            <span>{nav.name}</span>
                        </BtnNavBar>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default NavbarAdmin