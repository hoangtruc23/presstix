import { Link } from "react-router-dom";

function NavbarOriganizer() {
    const nav_menu = [
        { path: '/organizer', name: 'Thông tin', icon: 'fa-solid fa-info' },
        { path: '/event-list', name: 'Sự kiện của tôi', icon: 'fa-solid fa-calendar' },
        { path: '/create-event', name: 'Tạo sự kiện', icon: 'fa-solid fa-plus' },
        { path: '/', name: 'Trang chủ', icon: 'fa-solid fa-house' },
    ];

    return (
        <nav id="sidebar" className="fixed w-[300px] bg-[#77a9ff] text-white h-full p-4 transition-all duration-300 ease-in-out shadow-lg z-50">
            <div className="flex flex-col space-y-8">
                <Link to="/event-list" className="text-2xl font-semibold text-white hover:text-gray-200 transition duration-300">
                    <h3 className="m-0">Ban tổ chức</h3>
                </Link>

                <ul className="space-y-6 mt-4">
                    {nav_menu.map((nav, index) => (
                        <li key={index} className="relative group">
                            <Link to={nav.path} className="flex items-center text-lg font-medium text-white hover:text-gray-200 transition duration-300">
                                <i className={`${nav.icon} mr-3 text-xl`}></i>
                                <span>{nav.name}</span>
                            </Link>
                            <div className="absolute left-0 bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transform origin-left transition-all duration-300"></div>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default NavbarOriganizer;
