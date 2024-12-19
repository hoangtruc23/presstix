import { useEffect, useState } from "react"
import dayjs from "dayjs";
import { postTicketCancelled, postTicketSuccess } from "../../services/apiService"


function TicketSuccess() {
    const [ticketList, setTicketList] = useState();
    const [ticketSelected, setTicketSelected] = useState();

    const fetchTicketBuySucces = async () => {
        const res = await postTicketSuccess();
        setTicketList(res.data.tickets)
    }
    useEffect(() => {
        fetchTicketBuySucces();
    }, [])

    const handleClickCancelTicket = (ticket) => {
        setTicketSelected(ticket);
    }

    const handleBtnSubmitCancelTicket = async () => {
        await postTicketCancelled(ticketSelected.id);
        fetchTicketBuySucces();
        window.location.reload();
    }

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
                                        className={`inline-block px-3 py-1 text-md font-medium rounded-full ${ticket.status === "expired"
                                            ? "bg-red-100 text-red-700"
                                            : ticket.status === "cancelled"
                                                ? "bg-gray-100 text-gray-700"
                                                : ticket.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {ticket.status === "expired" ? 'Hết Hạn' : 'Chưa sử dụng'}
                                    </span>
                                </div>

                                <div className="d-flex justify-between">
                                    <div className="d-flex gap-5">
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
                                            <p className="text-md font-bold">{ticket.quantity}</p>
                                        </div>
                                    </div>

                                    {ticket?.status != 'expired' &&
                                        <button type="button" className='btn bg-danger text-white' data-toggle="modal" data-target="#modalCancelTicket" onClick={() => handleClickCancelTicket(ticket)}>
                                            Huỷ vé
                                        </button>
                                    }


                                </div>
                            </div>

                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Bạn chưa mua vé nào</p>
                )}
            </div >

            <div className="modal fade" id="modalCancelTicket" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-lg m-0" >Xác nhận huỷ vé</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h4 className='m-0'>Tên sự kiện: {ticketSelected?.event.name}   </h4>
                            <h4>Hạng vé: {ticketSelected?.name}  </h4>
                            <h4>Ngày : {dayjs(ticketSelected?.created_at).format("DD/MM/YYYY")} </h4>
                            <h4>Giá vé: {ticketSelected?.price} </h4>
                            <h4>Số lượng:  </h4>
                            <div className="">
                                <input name='aggreCancelTicket' id='aggreCancelTicket' type='checkbox' />
                                <label htmlFor='aggreCancelTicket' className='mx-2'>Tôi đồng ý điều kiện huỷ vé của PressTix</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleBtnSubmitCancelTicket}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TicketSuccess