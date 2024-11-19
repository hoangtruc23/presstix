import { Link } from "react-router-dom"
import BtnNavBar from "../Button/Organizer/BtnNavBar"


function NavbarAdmin() {
    const nav_menu = [
        { path: 'manager-user', name: 'Quản lý khách hàng', icon: 'fa-solid fa-plus' },
        { path: 'manager-event', name: 'Quản lý sự kiện', icon: 'fa-solid fa-plus' },
        { path: '/', name: 'Trang chủ', icon: 'fa-solid fa-arrow-left-long' },

    ]
    return (
        <nav className="bg-[#77a9ff] w-[280px] fixed top-0 left-0 h-screen px-6 py-8 text-white shadow-lg z-50 transition-all ease-in-out duration-300">
            <div className="flex flex-col space-y-8">
        
                <Link to='/admin' className=" text-2xl font-semibold tracking-wide text-white hover:text-gray-200 transition duration-300">
                    <h3 className='m-0'>ADMIN DASHBOARD</h3>
                </Link>

                <ul className="space-y-6">
                    {nav_menu.map((nav, index) => (
                        <li key={index} className="relative group">
                           
                            <BtnNavBar nav={nav} className="flex items-center text-lg font-medium text-white hover:text-gray-200 transition duration-300">
                                <span>{nav.name}</span>
                            </BtnNavBar>


                            <div className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transform origin-left transition-all duration-300"></div>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default NavbarAdmin