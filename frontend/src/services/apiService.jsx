import baseAPI from '../utils/axiosInstance'

const postLoginWithEmailPass = (email, password) => {
    return baseAPI.post('api/auth/login', {
        email,
        password,
    });
}

const getEventCate = () => {
    return baseAPI.get(`event-cate`);
}

const getAllEvent = () => {
    return baseAPI.get(`events`);
}

const getEventDetail = (slug) => {
    return baseAPI.get(`event/${slug}`);
}

export { postLoginWithEmailPass,getEventCate,getAllEvent,getEventDetail }