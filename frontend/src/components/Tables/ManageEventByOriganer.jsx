import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'
import ModalRemoveEvent from '../Modals/ModalRemoveEvent';
import ModalUpdateEvent from '../Modals/ModalUpdateEvent';
import { toast } from 'react-toastify';
import { putUpdateEvent } from '../../services/apiService';


function ManageEventTable(props) {
    const { eventList, handleFetchEvent } = props;

    const [eventSelected, setEventSelected] = useState([]);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showRemove, setShowRemove] = useState(false);

    const handleModalUpdate = (event) => {
        setEventSelected(event);
        setShowUpdate(true);
    }

    const handleModalRemove = (event) => {
        setEventSelected(event);
        setShowRemove(true);
    }

    const handleChangeStatus = async (e, event) => {
        try {
            const selectedStatus = e.target.value;

            const res = await putUpdateEvent(event.id, selectedStatus);
            if (res.data.message) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error('Chưa thể cập nhật! Kiểm tra lại' + error);
        }


    }


    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Chỗ</th>
                    <th>Loại vé</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {eventList && eventList.map((event, index) => (
                    <tr key={index}>
                        <td>{event.id}</td>
                        <td></td>
                        <td>{event.name}</td>
                        <td>{event.time_start}</td>
                        <td>{event.time_end}</td>
                        <td>{event.slot}</td>
                        <td>{event.event_cate_id}</td>
                        <td>
                            <select className="form-select p-2 rounded-2xl bg-primary text-white" onChange={(e) => handleChangeStatus(e, event)}>
                                <option value="active" selected={event.status === "active"}>Active</option>
                                <option value="expired" selected={event.status === "expired"}>Expired</option>
                            </select>
                        </td>
                        <td className='d-flex gap-2'>
                            <Button variant="warning" onClick={() => handleModalUpdate(event)}>Cập nhật</Button>
                            <Button variant="danger" onClick={() => handleModalRemove(event)}>Remove</Button>
                        </td>
                    </tr>
                ))}
            </tbody>

            <ModalUpdateEvent show={showUpdate} setShow={setShowUpdate} event={eventSelected} handleFetchEvent={handleFetchEvent} />
            <ModalRemoveEvent show={showRemove} setShow={setShowRemove} event={eventSelected} handleFetchEvent={handleFetchEvent} />
        </Table >
    )
}

ManageEventTable.propTypes = {
    eventList: PropTypes.array,
    handleFetchEvent: PropTypes.func,
}

export default ManageEventTable