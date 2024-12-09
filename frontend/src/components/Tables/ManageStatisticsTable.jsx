import { Table } from 'react-bootstrap';

function ManageStatisticsTable(props) {
    const { listEvent } = props;

    return (
        <>
            <Table striped bordered hover size="sm mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ảnh</th>
                        <th>Tên</th>
                        <th>Số lượng đã bán</th>
                        <th>Doanh thu</th>
                    </tr>
                </thead>
                <tbody>
                    {listEvent.map((event, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <img
                                    className="w-[200px] h-[100px] object-contain"
                                    src={event?.images[0]?.image_url}
                                    alt={event?.name || 'Event image'}
                                />
                            </td>
                            <td>{event.name}</td>
                            <td>{event.tickets_sold || 0}</td>
                            <td>{event.total_revenue || 0}</td>
                        </tr>
                    ))

                    }
                </tbody>
            </Table >

        </>
    )
}

export default ManageStatisticsTable
