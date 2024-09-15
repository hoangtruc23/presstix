import baseAPI from '../utils/axiosInstance'

const postLoginWithEmailPass = (email, password) => {
    return baseAPI.post('api/auth/login', {
        email,
        password,
    });
}

export { postLoginWithEmailPass }