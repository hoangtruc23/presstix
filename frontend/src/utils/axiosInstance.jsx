import axios from 'axios'
import { store } from '../redux/store.js'

const baseAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const baseAPIAdmin = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/admin',
    headers: {
        'Content-Type': 'application/json',
    },
});

const addAuthorizationHeader = (config) => {
    const state = store.getState();
    const token = state.auth.account.token;
    console.log({token})
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}

baseAPI.interceptors.request.use(addAuthorizationHeader);
baseAPIAdmin.interceptors.request.use(addAuthorizationHeader);

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     const { token } = useSelector(state => state.auth);
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

export default baseAPI;

