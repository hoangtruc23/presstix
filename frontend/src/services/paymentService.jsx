import baseAPI from '../utils/axiosInstance'

const postHandlerBankTransfer = () => {
    return baseAPI.post('webhook-event-handler');
}

const postPaymentBooking = (totalPrice, description,email,phone) => {

    console.log("Sending data:", { totalPrice, description,email,phone });

    return baseAPI.post('payment', {
        amount: totalPrice,
        description,
        email,
        phone,
    });
}

const getInvoicesByUser = () => {
    return baseAPI.get('invoices');
}

const postTicket = ({name, price, event_id, invoice_id,quantity}) => {
    console.log("Sending data:", { name, price, event_id, invoice_id,quantity });

    return baseAPI.post('create-ticket', {
        name,
        price,
        event_id,
        invoice_id,
        quantity
    });
}

export { postHandlerBankTransfer, postPaymentBooking, getInvoicesByUser, postTicket }