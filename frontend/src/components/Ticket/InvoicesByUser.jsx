import { useEffect, useState } from "react";
import { getInvoicesByUser } from "../../services/paymentService";

function InvoicesByUser() {
    const [invoiceList, setInvoiceList] = useState([]);

    useEffect(() => {
        fetchDataInvoices();
    }, []);

    const fetchDataInvoices = async () => {
        const res = await getInvoicesByUser();
        setInvoiceList(res.data.invoices);
    };

    return (
        <div className="overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto p-3 border border-gray-300 rounded-lg">
                {invoiceList && invoiceList.lenghth > 0 ? invoiceList.map((invoice, index) => (
                    <button
                        type="button"
                        className='d-flex items-center gap-5 border border-1 w-full p-3 my-3 rounded-xl hover:bg-gray-100 transition-all'
                        key={index}
                        data-toggle="modal"
                        data-target="#modalInvoiceDetail"
                    >
                        <h3 className="text-lg font-semibold">{invoice.status}</h3>
                        <p className="text-sm text-gray-500">{invoice.invoice_date}</p>
                    </button>
                ))

                    : (
                        <div className="text-center text-gray-500 ">Chưa có giao dịch nào</div>
                    )}
            </div>

            <div className="modal fade" id="modalInvoiceDetail" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Thông tin chi tiết</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body max-h-[60vh] overflow-y-auto">
                            <p>Invoice details will appear here...</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvoicesByUser;