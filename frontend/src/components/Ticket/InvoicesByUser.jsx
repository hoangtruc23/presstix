import { useEffect, useState } from "react"
import { getInvoicesByUser } from "../../services/paymentService";


function InvoicesByUser() {
    const [invoiceList, setInvoiceList] = useState();

    useEffect(() => {
        fetchDataInvoices();
    }, [])

    const fetchDataInvoices = async () => {
        const res = await getInvoicesByUser();
        setInvoiceList(res.data.invoices)
    }

    return (
        <div>
            {invoiceList && invoiceList.map((invoice, index) => (
                <button type="button" className='d-flex items-center gap-5 border border-1 w-full p-3 my-3 rounded-xl' key={index} data-toggle="modal" data-target="#modalInvoiceDetail">
                    <h3>{invoice.status}</h3>
                    <p>{invoice.invoice_date}</p>
                </button>
            ))}
           
            <div className="modal fade" id="modalInvoiceDetail" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Thông tin chi tiết</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default InvoicesByUser