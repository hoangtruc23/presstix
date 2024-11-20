
import { createBrowserRouter, Outlet } from "react-router-dom";
import App from '../App.jsx'
import About from "../pages/About/index.jsx";
import Event from "../pages/Event/index.jsx";
import Contact from "../pages/Contact/index.jsx";
import HomePage from "../pages/Home/index.jsx";
import EventDetail from "../pages/Detail/EventDetail.jsx";
import PermissionRoute from "./PermissionRoute.jsx";
import AdminPages from "../pages/Admin/index.jsx";
import ManageUser from "../pages/Admin/ManageUser/ManageUser.jsx";
import ManageEvent from "../pages/Admin/ManageEvent/ManageEvent.jsx";
import Header from "../components/Header/index.jsx";
import Organizer from "../pages/Organizer/index.jsx";
import Footer from "../components/Footer/index.jsx";
import Profile from "../pages/Profile/index.jsx";
import CreateEvent from "../pages/Organizer/CreateEvent.jsx";
import EventListByUser from "../pages/Organizer/EventListByUser.jsx";


const CustomerLayout = () => (
    <>
        <Header />
        <Outlet />
        <Footer />
        
    </>
)

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                element: <CustomerLayout />,
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
                    {
                        path: "profile",
                        element: <Profile />
                    },
                ],
            },
            {
                element: <Organizer />,
                children: [
                    {
                        path: 'event-list',
                        element: <EventListByUser />
                    },
                    {
                        path: 'create-event',
                        element: <CreateEvent />
                    },
                  
                ],
            },
            {
                path: "admin",
                element:
                    <PermissionRoute allowedRoles={[0]}>
                        <AdminPages />
                    </PermissionRoute>,
                children: [
                    {
                        path: "manager-user",
                        element: <ManageUser />
                    },
                    {
                        path: "manager-event",
                        element: <ManageEvent />
                    },

                ],
            },
            

        ],
    }

]);

export default router