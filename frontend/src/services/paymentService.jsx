import baseAPI from '../utils/axiosInstance'

const postHandlerBankTransfer = () => {
    return baseAPI.post('webhook-event-handler');
}

const postPaymentBooking = (totalPrice, description) => {
    return baseAPI.post('payment', {
        amount: totalPrice,
        description,
    });
}

const getInvoicesByUser = () => {
    return baseAPI.get('invoices');
}

const postTicket = (name, price, event_id, invoice_id) => {
    return baseAPI.post('create-ticket', {
        name,
        price,
        event_id,
        invoice_id,
    });
}

export { postHandlerBankTransfer, postPaymentBooking, getInvoicesByUser, postTicket }