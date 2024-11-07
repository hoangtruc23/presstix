import { Link } from "react-router-dom"
import BtnNavBar from "../Button/Organizer/BtnNavBar"


function NavbarOriganizer() {
    const nav_menu = [
        { path: '/organizer/create-event', name: 'Tạo sự kiện' , icon : 'fa-solid fa-plus'},
        { path: '/organizer/event-list', name: 'Sự kiện của tôi' , icon : 'fa-solid fa-plus'},
        { path: '/', name: 'Trang chủ' , icon:'fa-solid fa-arrow-left-long'},
       
    ]
    return (
        <nav id="sidebar" className="fixed bg-gradient-to-r from-[#ab1c1c] to-[#dc3545]  text-white h-[100vh] min-w-fit px-4 ">
            <div className="">
                <Link to='/organizer'>
                    <h3 className='font-semibold'>Origanizer Dashboard</h3>
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

export default NavbarOriganizer