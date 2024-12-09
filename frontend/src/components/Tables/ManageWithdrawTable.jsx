import { Table, Button } from 'react-bootstrap';

function ManageWithdrawTable(props) {
    const { withdrawList } = props;
    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Khách hàng</th>
                        <th>Số tiền</th>
                        <th>Ngày yêu cầu</th>
                        <th>Ngày thanh toán</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {withdrawList && withdrawList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.user.name}</td>
                            <td>{item.amount}</td>
                            <td>{item.date_payment}</td>
                            <td>{item.email}</td>
                            {/* <td>
                                <select
                                    className={`form-select p-2 rounded-2xl  ${item.status === "pending" ? 'bg-warning text-black' : 'bg-primary text-white'}`}
                                >
                                    <option value="pending" selected={item.status === "pending"}>Chưa thanh toán</option>
                                    <option value="paid" selected={item.status === "paid"}>Đã thanh toán</option>
                                </select>
                            </td> */}
                            <td  className={`${item.status === "pending" ? ' text-danger' : 'text-primary'}`} >
                                {item.status === "pending" ? 'Chưa thanh toán' : 'Đã thanh toán'}
                            </td>
                            {item.status === "pending" &&
                                <td className='d-flex gap-2'>
                                    <Button variant="primary">Thanh toán</Button>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default ManageWithdrawTable
