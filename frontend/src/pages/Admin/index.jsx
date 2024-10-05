import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'

function AdminPages() {
  return (
    <div>
      <div className="d-flex">
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div >
  )
}

export default AdminPages