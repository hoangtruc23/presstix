import baseAPI from '../utils/axiosInstance'

const postLoginWithEmailPass = (email, password) => {
    return baseAPI.post('api/auth/login', {
        email,
        password,
    });
}

const getEventCate = () => {
    return baseAPI.get(`api/event-cate`);
}

const getAllEvent = () => {
    return baseAPI.get(`api/events`);
}

export { postLoginWithEmailPass,getEventCate,getAllEvent }