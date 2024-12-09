import { useEffect, useState } from 'react'
import ManageStatisticsTable from '../../../components/Tables/ManageStatisticsTable'
import { getTicketStatistics } from '../../../services/Admin/apiServiceAdmin'

function ManageStatistics() {
    const [listEvent, setListEvent] = useState([]);
    const [orderBy, setOrderBy] = useState('ticket');

    const fetchDataTicketStatistics = async () => {
        const res = await getTicketStatistics(orderBy);
        setListEvent(res.data.ticket_statistics);
    }

    const handleSelectChange = (e) => {
        setOrderBy(e.target.value);
    }

    useEffect(() => {
        fetchDataTicketStatistics();
    }, [orderBy])

    return (
        <>
            <h2>Thống kê</h2>
            <select className="form-select p-2 rounded-2xl bg-primary text-white" onChange={handleSelectChange}>
                <option value="ticket">   Theo số lượng vé đã bán</option>
                <option value="revenue" >Theo doanh thu</option>
            </select>
            <ManageStatisticsTable listEvent={listEvent} />
        </>
    )
}

export default ManageStatistics
