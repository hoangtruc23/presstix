import baseAPI from '../utils/axiosInstance'



const postSignUpWithEmailPass = (name, email, password, phone) => {
    return baseAPI.post('auth/signup', {
        name,
        email,
        password,
        phone
    });
}

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

const searchEvents = (search = '', event_cate = '') => {
    return baseAPI.get(`events?search=${search}`, {
        params: {
            search,
            event_cate,
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
    return baseAPI.put(`event-update/${event_id}`, formDataToSubmit);
}

// ORGANIER 
const postInfoOrganizer = () => {
    return baseAPI.post('organizer');
}

const getEventByUser = (user_id) => {
    return baseAPI.get(`event-list/${user_id}`);
}

const postInfoOrganizerUpdate = (formDataToSend) => {
    return baseAPI.post('organizer-update', formDataToSend, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const postInfoBankingOrganizer = (bank, accountNumber, accountName) => {
    return baseAPI.post('organizer-update-banking', {
        bank,
        account_name: accountName,
        account_number: accountNumber
    });
};

const getUploadWallet = () => {
    return baseAPI.get('organizers/update-wallet');
}

const getWithdrawal = () => {
    return baseAPI.get('withdrawal-request');
};



const createNewEvent = (payload) => {

    // payload.forEach((item) => {
    //     console.log({ item })
    // });

    return baseAPI.post('create-event', payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};


const postTicketSuccess = () => {
    return baseAPI.post('ticket-success-user');
};

const getTicketCancelled = () => {
    return baseAPI.post('ticket-cancelled-user');
};

const postTicketCancelled = (ticket_id) => {
    return baseAPI.post('ticket-cancelled', { ticket_id });
};




export {
    postSignUpWithEmailPass, postLoginWithEmailPass, getMyProfile, putUpdateProfile, getEventCate, searchEvents, getEventDetail,
    getEventByUser, createNewEvent, putUpdateEventStatus, putUpdateEvent, postInfoOrganizerUpdate, postInfoBankingOrganizer,
    postTicketSuccess, getTicketCancelled, postTicketCancelled, postInfoOrganizer, getWithdrawal, getUploadWallet
}