// src/utils/api.js
import axios from 'axios';
import { store } from '../redux/store.js';

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
    const token = state.auth.account?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

baseAPI.interceptors.request.use(addAuthorizationHeader, (error) => Promise.reject(error));
baseAPIAdmin.interceptors.request.use(addAuthorizationHeader, (error) => Promise.reject(error));

// API key cho Casso API
const api_key = 'AK_CS.fa2b0d609a6311ef95d2df3b370b378f.fhrE5CYrxuhhOQTXXecUC9kkfHYnSXHgs0brzTIXSzRt463VQ6clTxzHoPfs7zkF0AnlcDn9';

// Khởi tạo axiosCassoClient cho Casso API
const axiosCassoClient = axios.create({
    baseURL: 'https://oauth.casso.vn/v2',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Apikey ${api_key}`,
    },
    // paramsSerializer: (params) => queryString.stringify(params),
});

// Thêm interceptor cho axiosCassoClient nếu cần xử lý trước khi gửi yêu cầu
axiosCassoClient.interceptors.request.use((config) => config, (error) => Promise.reject(error));

// Xuất các instances để dùng trong ứng dụng
export { baseAPI, axiosCassoClient };
export default baseAPI;