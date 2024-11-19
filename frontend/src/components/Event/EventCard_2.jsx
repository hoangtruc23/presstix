import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function EventCard_2(props) {
    const { event } = props;

    return (
        <div className='relative cursor-pointer group hover:shadow-2xl hover:bg-gray-50 overflow-hidden rounded-lg transition-all duration-300'>
            {/* Event Image */}
            <img 
                src={event?.images[0]?.image_url} 
                className='w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105' 
                alt={event?.name}
            />
            
            {/* Overlay for event details */}
            <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6'>
                {/* Event Name */}
                <h4 className='text-lg font-semibold mb-2 text-white line-clamp-2'>{event?.name}</h4>

                {/* Event Time and Date */}
                <div className="text-sm text-white opacity-80">
                    <div>
                        <h5 className='font-medium'>{dayjs(event?.time_start).format('HH:mm')} - {dayjs(event?.time_end).format('HH:mm')}</h5>
                    </div>
                    <div>
                        <h5>{dayjs(event?.time_start).format('DD-MM-YYYY')}</h5>
                    </div>
                </div>
            </div>

            {/* Hover Effect on Event Card */}
            <div className="absolute inset-0 bg-transparent group-hover:bg-gradient-to-t group-hover:from-black group-hover:via-transparent group-hover:to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
        </div>
    );
}

EventCard_2.propTypes = {
    event: PropTypes.object.isRequired
}

export default EventCard_2;