import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import event1 from '../../assets/img/event1.webp';

function EventCard_1(props) {
    const { event } = props;
    return (
        <div>
            <img src={event1} alt="Event" />
            <div className="d-flex gap-3 p-[10px]">
                <div className='w-[20%] text-center font-semibold'>
                    <h3>{dayjs(event?.time_start).format('DD-MM')}</h3>
                </div>
                <div className='w-[80%]'>
                    <h4>{event?.name}</h4>
                    <div className='flex items-center gap-1'>
                        <h3>{dayjs(event?.time_start).format('HH:mm')}</h3>
                        <span>-</span>
                        <h3>{dayjs(event?.time_end).format('HH:mm')}</h3>
                    </div>
                    <p>interested</p>
                </div>
            </div>

        </div>
    )
}

EventCard_1.propTypes = {
    event: PropTypes.object.isRequired,
}


export default EventCard_1