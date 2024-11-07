import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/NavbarAdmin'

function AdminPages() {
  return (
    <>
      <div className="d-flex">
        <div className="w-[22%]">
          <Navbar />
        </div>
        <div className="container ">
          <Outlet />
        </div>
      </div>
    </ >
  )
}

export default AdminPages