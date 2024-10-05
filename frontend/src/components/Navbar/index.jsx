import { Link } from "react-router-dom"


function Navbar() {
    return (
        <nav id="sidebar" className="bg-slate-800 h-[100vh] min-w-fit px-5 text-white">
            <div className="">
                <Link to='/admin'>
                    <h3>Admin Dashboard</h3>
                </Link>

                <ul className="">
                    <Link to='manager-user'>
                        <li className='hover:opacity-5 p-1'>
                            <i className="align-middle" data-feather="user"></i> <span className="align-middle"> User</span>
                        </li>
                    </Link>
                </ul>


            </div>
        </nav>
    )
}

export default Navbar