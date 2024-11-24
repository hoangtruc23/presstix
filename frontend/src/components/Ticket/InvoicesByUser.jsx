import { useEffect, useState } from "react";
import { getInvoicesByUser } from "../../services/paymentService";

function InvoicesByUser() {
    const [invoiceList, setInvoiceList] = useState([]);

    useEffect(() => {
        fetchDataInvoices();
    }, []);

    const fetchDataInvoices = async () => {
        try {
            const res = await getInvoicesByUser();
            console.log({ res });
            setInvoiceList(res.data.invoices);
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    };

  

    return (
        <div className="overflow-hidden">
            {/* Invoice list */}
            <div className="max-h-[600px] overflow-y-auto p-5">
                {invoiceList && invoiceList.map((invoice, index) => (   
                    <div key={index} className="mb-4">
                        <button
                            type="button"
            
                            className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 uppercase mt-0 ">{invoice.status}</h3>
                                <p className="text-sm text-gray-500">{invoice.invoice_date}</p>
                            </div>
                            <span className="text-primary font-semibold">Hoá đơn: {invoice.amount} VND</span>
                        </button>
                    </div>
                ))}
            </div>

           
        </div>
    );
}

export default InvoicesByUser;