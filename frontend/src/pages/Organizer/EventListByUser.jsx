import { useState, useEffect } from "react";
import { getEventByUser } from "../../services/apiService"
import { useSelector } from "react-redux";
import ManageEventByOriganizer from "../../components/Tables/ManageEventByOriganer";


function EventListByUser() {
    const account = useSelector(state => state.auth);
    const [eventList, setEventList] = useState([]);

    const fetchEventByUser = async () => {
        const res = await getEventByUser(account.account.id);
        setEventList(res.data);
    }

    useEffect(() => {
        fetchEventByUser();
    }, []);

    const handleFetchEvent = async () => {
        await fetchEventByUser();
    };


    return (
        <div>
            <h2>Danh sách sự kiện của tôi</h2>
            <ManageEventByOriganizer eventList={eventList} handleFetchEvent={handleFetchEvent} />
        </div>
    )
}

export default EventListByUser