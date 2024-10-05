import { baseAPIAdmin } from '../../utils/axiosInstance';

const getUserList = () => {
    return baseAPIAdmin.get('/user');
}
export { getUserList }