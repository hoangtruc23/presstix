
import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx'
import About from "../pages/About/index.jsx";
import Event from "../pages/Event/index.jsx";
import Contact from "../pages/Contact/index.jsx";
import HomePage from "../pages/Home/index.jsx";
import EventDetail from "../pages/Detail/EventDetail.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminPages from "../pages/Admin/index.jsx";
import ManageUser from "../pages/Admin/ManageUser/ManageUser.jsx";



const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "events",
                element: <Event />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: `event-detail/:id`,
                element: <EventDetail />
            },
        ],
    },
    {
        path: "admin",
        element:
            <ProtectedRoute allowedRoles={[0]}>
                <AdminPages />
            </ProtectedRoute>,
        children: [
            {
                path: "manager-user",
                element: <ManageUser />
            },

        ],
    }


]);

export default router