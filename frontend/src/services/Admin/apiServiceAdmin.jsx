import { baseAPIAdmin } from '../../utils/axiosInstance';

const getUserList = () => {
    return baseAPIAdmin.get('/user');
}

const getEventList = () => {
    return baseAPIAdmin.get('/events');
}

const deleteEvent = (id) => {
    return baseAPIAdmin.delete(`/events/${id}`);
}

const getWithdrawal = () => {
    return baseAPIAdmin.post('/withdrawal');
}

const getTicketStatistics = (orderBy) => {
    return baseAPIAdmin.post('/ticket-statistics', { orderBy });
}




export { getUserList, getEventList, deleteEvent, getWithdrawal, getTicketStatistics }