import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header"
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer
        position="top-right"
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
