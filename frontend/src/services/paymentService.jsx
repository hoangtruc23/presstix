import baseAPI from '../utils/axiosInstance'


// const postPayment = (accountNumber, totalPrice) => {
//     return baseAPI.post('payment', {
//         accountNumber,
//         amount: totalPrice,
//     });
// }

const postHandlerBankTransfer = () => {
    return baseAPI.post('webhook-event-handler');
}

const postPaymentBooking = (totalPrice, content) => {
    return baseAPI.post('payment', {
        amount: totalPrice,
        content,
    });
}


export { postHandlerBankTransfer, postPaymentBooking }