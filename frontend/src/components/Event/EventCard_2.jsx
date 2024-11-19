import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function EventCard_2(props) {
    const { event } = props;

    return (
        <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 bg-white">
    {/* Image Section */}
    <div className="relative">
        <img 
            src={event?.images[0]?.image_url} 
            alt={event?.name} 
            className="w-full h-[350px] object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105" 
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
    </div>

    {/* Details Section */}
    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {/* Event Name */}
        <h4 className="text-xl font-bold text-white mb-3 line-clamp-2">
            {event?.name}
        </h4>
        {/* Event Time and Date */}
        <div className="text-sm text-white">
            <p className="mb-1 font-medium">
                {dayjs(event?.time_start).format('HH:mm')} - {dayjs(event?.time_end).format('HH:mm')}
            </p>
            <p>{dayjs(event?.time_start).format('DD-MM-YYYY')}</p>
        </div>
    </div>

    {/* Information Section */}
    <div className="relative bg-white p-4 flex flex-col space-y-2">
        {/* Event Name (Visible without hover) */}
        <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {event?.name}
        </h4>
        {/* Event Time (Visible without hover) */}
        <div className="text-sm text-gray-500 flex items-center space-x-2">
            <span className="flex items-center">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="w-4 h-4 text-gray-400"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M8.25 4.5v1.125A2.25 2.25 0 006 7.875H4.5a.75.75 0 00-.75.75v9.75c0 .414.336.75.75.75h15a.75.75 0 00.75-.75v-9.75a.75.75 0 00-.75-.75H18a2.25 2.25 0 01-2.25-2.25V4.5M9 3h6m-7.5 6h9"
                    />
                </svg>
                {dayjs(event?.time_start).format('DD-MM-YYYY')}
            </span>
        </div>
    </div>
</div>
    );
}

EventCard_2.propTypes = {
    event: PropTypes.object.isRequired
}

export default EventCard_2;