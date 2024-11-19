import { useEffect, useState } from "react"
import { postTicketSuccess } from "../../services/apiService"


function TicketSuccess() {
    const [ticketList, setTicketList] = useState();
    const fetchTicketBuySucces = async () => {
        const res = await postTicketSuccess();
        setTicketList(res.data.tickets)
        console.log({ res });
    }
    useEffect(() => {
        fetchTicketBuySucces();
    }, [])
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            {ticketList && ticketList.length > 0 ? (
                <ul className="space-y-3">
                    {ticketList.map((ticket, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <span className="text-lg font-medium text-gray-700">{ticket.name}</span>
                            <span className="text-sm text-gray-500">#{index + 1}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Không có vé nào được tìm thấy.</p>
            )}
        </div>
    )
}

export default TicketSuccess