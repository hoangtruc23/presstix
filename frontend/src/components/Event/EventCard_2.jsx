import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function EventCard_2(props) {
    const { event } = props;
    return (
        <div className='relative cursor-pointer group hover:shadow-lg hover:bg-slate-100 overflow-hidden rounded-lg'>
            <img 
                src={event?.images[0]?.image_url} 
                className='w-[350px] h-[350px] object-cover transition-transform duration-500 group-hover:scale-110' 
                alt={event?.name}
            />
            <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 text-white'>
                <h4 className='text-lg font-semibold mb-2 line-clamp-1'>{event?.name}</h4>
                <div className="d-flex text-sm">
                    <h5>{dayjs(event?.time_start).format('HH:mm')} - {dayjs(event?.time_end).format('HH:mm / ')}</h5>
                    <h5>{dayjs(event?.time_start).format('DD-MM')}</h5>
                </div>
            </div>
        </div>
    );
}

EventCard_2.propTypes = {
    event: PropTypes.object.isRequired
}

export default EventCard_2;