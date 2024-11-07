import { useState, useEffect } from "react"
import ManageEventTable from "../../../components/Tables/ManageEventTable"
import { getEventList } from "../../../services/Admin/apiServiceAdmin";

function ManageEvent() {
    const [eventList, setEventList] = useState();

    const handleEventList = async () => {
        const res = await getEventList();
        setEventList(res.data.event);
    }

    const handleDeleteEvent = async () => {
        await handleEventList(); // Cập nhật lại danh sách sau khi xóa
    };

    useEffect(() => {
        handleEventList();
    }, [])

    return (
        <>
            <h2>Quản lý sự kiện</h2>
            <ManageEventTable eventList={eventList} handleDeleteEvent={handleDeleteEvent} />
        </>
    )
}

export default ManageEvent