import { Outlet } from "react-router-dom"
import NavbarOriganizer from "../../components/Navbar/NavbarOrganizer"


function Organizer() {
    return (
        <div className="d-flex">
            <div className="w-[300px]">
                <NavbarOriganizer />
            </div>
            <div className="container w-30%">
                <Outlet />
            </div>
        </div>
    )
}

export default Organizer