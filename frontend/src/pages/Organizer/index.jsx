import { Outlet } from "react-router-dom"
import NavbarOriganizer from "../../components/Navbar/NavbarOrganizer"


function Organizer() {
    return (
        <div className="d-flex ">
            <div className="w-[320px]">
                <NavbarOriganizer />
            </div>
            <div className="w-[75%]">
                <Outlet />
            </div>
        </div>
    )
}

export default Organizer