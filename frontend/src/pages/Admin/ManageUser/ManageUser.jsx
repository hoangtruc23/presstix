import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { getUserList } from '../../../services/Admin/apiServiceAdmin';
import { Button } from 'react-bootstrap';


function ManageUser() {
    const [userList, setUserList] = useState();

    const handleUserList = async () => {
        const res = await getUserList();
        setUserList(res.data.data);
    }

    useEffect(() => {
        handleUserList();
    }, [])

    console.log({ userList })

    return (
        <>
            <h3>Manager User</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userList && userList.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                            <td className='d-flex gap-2'>
                                <Button variant="warning">Update</Button>
                                <Button variant="danger">Remove</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default ManageUser