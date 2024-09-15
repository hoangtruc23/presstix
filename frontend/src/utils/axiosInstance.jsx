import axios from 'axios'
import { useSelector } from 'react-redux'

const baseAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
});


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { token } = useSelector(state => state.auth);
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default baseAPI;
