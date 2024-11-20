import { useEffect, useState } from "react"
import dayjs from "dayjs";
import { postTicketSuccess } from "../../services/apiService"


function TicketSuccess() {
    const [ticketList, setTicketList] = useState();
    const [eventList, setEventList] = useState();
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
                <div className="space-y-4">
                    {ticketList.map((ticket, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg m-0 font-semibold text-gray-800">{ticket.event.name}</h3>
                                    <p className="text-sm text-gray-500">Hạng vé: {ticket.name}</p>
                                </div>
                                <span
                                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${ticket.status === "Đã sử dụng"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {ticket.status}
                                </span>
                            </div>

                            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className='d-flex gap-2 items-center'>
                                    <p className="text-sm text-gray-500">Ngày mua:</p>
                                    <p className="text-md font-medium text-gray-700">{dayjs(ticket.created_at).format("DD/MM/YYYY")}</p>
                                </div>
                                <div className='d-flex gap-2 items-center'>
                                    <p className="text-sm text-gray-500">Giá vé:</p>
                                    <p className="text-md font-bold text-indigo-600">{ticket.price} VND</p>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Bạn chưa mua vé nào</p>
            )}
        </div>
    )
}

export default TicketSuccess