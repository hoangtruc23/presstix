import { baseAPI } from '../utils/axiosInstance'

const postLoginWithEmailPass = (email, pass) => {
    return baseAPI.post('api/auth/login',[
        email,
        pass,
    ]);
}

export { postLoginWithEmailPass };