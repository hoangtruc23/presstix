import { useState, useEffect } from 'react';
import { getUserList } from '../../../services/Admin/apiServiceAdmin';
import ManageUserTable from '../../../components/Tables/ManageUserTable';


function ManageUser() {
    const [userList, setUserList] = useState([]);

    const handleUserList = async () => {
        const res = await getUserList();
        setUserList(res.data.data);
    }

    useEffect(() => {
        handleUserList();
    }, [])

    return (
        <>
            <h2>Quản lý khách hàng</h2>
            <ManageUserTable userList={userList} />
        </>
    )
}

export default ManageUser