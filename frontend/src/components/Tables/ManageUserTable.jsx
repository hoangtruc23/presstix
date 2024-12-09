import PropTypes from 'prop-types'
import { Table, Button } from 'react-bootstrap';

function ManageUserTable(props) {
    const { userList } = props;
    
    const handleChangeStatus = () => {
    
    }

    const handleModalRemove = () => {

    }

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Trạng thái</th>
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
                        <td>
                            <select className="form-select p-2 rounded-2xl bg-primary text-white" onChange={(e) => handleChangeStatus(e, user)}>
                                <option value="active" selected={user.status === "active"}>Active</option>
                                <option value="expired" selected={user.status === "inactive"}>InActive</option>
                            </select>
                        </td>
                        <td className='d-flex gap-2'>
                            <Button variant="danger" onClick={handleModalRemove}>Xoá</Button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </Table>
    )
}

ManageUserTable.propTypes = {
    userList: PropTypes.array.isRequired,
}

export default ManageUserTable