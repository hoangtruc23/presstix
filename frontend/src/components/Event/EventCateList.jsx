import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getEventCate } from '../../services/apiService';
import PropTypes from 'prop-types';


function EventCateList(props) {
    const { handleInputChange } = props;
    const [eventCateList, setEventCateList] = useState();
    const fecthDataEventCateList = async () => {
        const res = await getEventCate();
        setEventCateList(res.data.data);
    }
    useEffect(() => {
        fecthDataEventCateList();
    }, []);
    return (
        <>
            <Form.Control
                as="select"
                name="event_cate_id"
                onChange={handleInputChange}
            >
                {eventCateList && eventCateList.map((cate, index) => (
                    <option value={cate.id} key={index}>{cate.name}</option>
                ))}
            </Form.Control>

        </>
    )
}

EventCateList.propTypes  = {
    handleInputChange : PropTypes.func
}
export default EventCateList