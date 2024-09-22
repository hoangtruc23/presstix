
import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx'
import About from "../pages/About/index.jsx";
import Event from "../pages/Event/index.jsx";
import Contact from "../pages/Contact/index.jsx";
import HomePage from "../pages/Home/index.jsx";
import EventDetail from "../pages/Detail/EventDetail.jsx";



const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/events",
                element: <Event />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: `/event-detail/:id`,
                element: <EventDetail />
            },
        ],
    },
]);

export default router