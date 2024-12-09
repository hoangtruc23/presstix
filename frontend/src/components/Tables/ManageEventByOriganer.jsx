import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'
import ModalRemoveEvent from '../Modals/ModalRemoveEvent';
import ModalUpdateEvent from '../Modals/ModalUpdateEvent';
import { toast } from 'react-toastify';
import { putUpdateEventStatus } from '../../services/apiService';


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

    console.log({eventList})

    const handleChangeStatus = async (e, event) => {
        try {
            const selectedStatus = e.target.value;

            const res = await putUpdateEventStatus(event.id, selectedStatus);
            if (res.data.message) {
                toast.success(res.data.message);
                const updatedEventList = eventList.map((item) =>
                    item.id === event.id ? { ...item, status: selectedStatus } : item
                );
                handleFetchEvent(updatedEventList); 
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
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {eventList && eventList.map((event, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <img className='w-[400px] h-[200px] object-contain' src={event?.images[0]?.image_url} alt="" />
                        </td>
                        <td>{event.name}</td>
                        <td>{event.time_start}</td>
                        <td>{event.time_end}</td>
                        <td>
                            <select className="form-select p-2 rounded-2xl bg-primary text-white"
                                value={event.status}
                                onChange={(e) => handleChangeStatus(e, event)}>
                                <option value="active">Active</option>
                                <option value="expired">Expired</option>
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