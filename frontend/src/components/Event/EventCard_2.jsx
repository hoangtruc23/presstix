import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import card from '../../assets/img/event1.webp';

function EventCard_2(props) {
    const { event } = props;
    return (
        <div className='d-flex gap-4 cursor-pointer hover:shadow-lg hover:bg-slate-100 p-3'>
            <img src={card} className='w-[45%]' />
            <div>
                <h4 className='line-clamp-1'>{event?.name}</h4>
                <div className="d-flex">
                    <h5>{dayjs(event?.time_start).format('HH : mm') + ' - ' + dayjs(event?.time_end).format('HH : mm / ')}</h5>
                    <h5>{dayjs(event?.time_start).format('DD - MM ')}</h5>
                </div>
            </div>
        </div>

    )
}

EventCard_2.propTypes = {
    event: PropTypes.object.isRequired
}

export default EventCard_2