import { Link } from "react-router-dom"
import BtnNavBar from "../Button/Organizer/BtnNavBar"


function NavbarAdmin() {
    const nav_menu = [
        { path: 'manager-user', name: 'Quản lý khách hàng', icon: 'fa-solid fa-plus' },
        { path: 'manager-event', name: 'Quản lý sự kiện', icon: 'fa-solid fa-plus' },
        { path: '/', name: 'Trang chủ', icon: 'fa-solid fa-arrow-left-long' },

    ]
    return (
        <nav className="bg-gradient-to-r from-[#ab1c1c] to-[#dc3545] fixed text-white h-[100vh] min-w-fit px-5">
            <div className="">
                <Link to='/admin'>
                    <h3>ADMIN DASHBOARD</h3>
                </Link>

                <ul className="">
                    {nav_menu.map((nav, index) => (
                        <BtnNavBar nav={nav} key={index} />
                    ))}
                </ul>


            </div>
            
        </nav>
    )
}

export default NavbarAdmin