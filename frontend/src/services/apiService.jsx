import baseAPI from '../utils/axiosInstance'

const postLoginWithEmailPass = (email, password) => {
    return baseAPI.post('auth/login', {
        email,
        password,
    });
}

const getEventCate = () => {
    return baseAPI.get(`event-cate`);
}

const searchEvents = (search ='') => {
    return baseAPI.get(`events?search=${search}`,{
        params: {
            search,
            page: 1,
        },
    });
}

const getEventDetail = (slug) => {
    return baseAPI.get(`event/${slug}`);
}

export { postLoginWithEmailPass,getEventCate,searchEvents,getEventDetail }