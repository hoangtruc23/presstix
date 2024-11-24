import baseAPI from '../utils/axiosInstance'

const postLoginWithEmailPass = (email, password) => {
    return baseAPI.post('auth/login', {
        email,
        password,
    });
}

// PROFILE 
const getMyProfile = () => {
    return baseAPI.get('auth/profile');
}

const putUpdateProfile = (email, name, phone) => {
    return baseAPI.put('auth/profile', {
        email,
        name,
        phone,
    });
}

// END PROFILE 

// EVENT 
const getEventCate = () => {
    return baseAPI.get(`event-cate`);
}

const searchEvents = (search = '') => {
    return baseAPI.get(`events?search=${search}`, {
        params: {
            search,
            page: 1,
        },
    });
}

const getEventDetail = (slug) => {
    return baseAPI.get(`event/${slug}`);
}


const putUpdateEventStatus = (event_id, status) => {
    return baseAPI.put(`event-update-status/${event_id}`, {
        status,
    });
}

const putUpdateEvent = (event_id, formDataToSubmit) => {
    formDataToSubmit.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}`);
    });
    
    return baseAPI.put(`event-update/${event_id}`,formDataToSubmit);
}




// ORGANIER 
const getEventByUser = (user_id) => {
    return baseAPI.get(`event-list/${user_id}`);
}


const createNewEvent = (payload) => {
    console.log({ payload });
    return baseAPI.post('create-event', payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};


const postTicketSuccess = () => {
    return baseAPI.post('ticket-success-user');
};



export {
    postLoginWithEmailPass, getMyProfile, putUpdateProfile, getEventCate, searchEvents, getEventDetail,
    getEventByUser, createNewEvent, putUpdateEventStatus, putUpdateEvent,
    postTicketSuccess
}