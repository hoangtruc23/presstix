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

export { getUserList,getEventList,deleteEvent }