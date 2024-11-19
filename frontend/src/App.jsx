import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition:Bounce,
      />
      <ToastContainer />
    </>

  )
}

export default App
