
import { useEffect, useState } from 'react';
import dayjs from "dayjs";
import { getTicketCancelled } from "../../services/apiService"

function TicketCancelled() {
    const [ticketList, setTicketList] = useState();
    const fetchDataTicketCancelled = async () => {
        const res = await getTicketCancelled();
        setTicketList(res.data.tickets)
    }
    useEffect(() => {
        fetchDataTicketCancelled();
    }, [])
    return (
        <>
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
                                        <p className="text-md text-blue-500 font-semibold">Hạng vé: {ticket.name}</p>
                                    </div>
                                    <span
                                        className={`inline-block px-3 py-1 text-md font-medium rounded-full bg-danger text-white`}
                                    >
                                        Đã huỷ
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className='d-flex gap-2 items-center'>
                                        <p className="text-sm text-gray-500">Ngày mua:</p>
                                        <p className="text-md font-medium text-gray-700">{dayjs(ticket.created_at).format("DD/MM/YYYY")}</p>
                                    </div>
                                    <div className='d-flex gap-2 items-center'>
                                        <p className="text-sm text-gray-500">Giá vé:</p>
                                        <p className="text-md font-bold">{ticket.price} VND</p>
                                    </div>

                                    <div className='d-flex gap-2 items-center'>
                                        <p className="text-sm text-gray-500">Số lượng:</p>
                                        <p className="text-md font-bold">{ticket.price}</p>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Bạn chưa huỷ vé nào</p>
                )}
            </div>
        </>
    )
}

export default TicketCancelled
