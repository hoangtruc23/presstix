import dayjs from 'dayjs';
import PropTypes from 'prop-types';

function EventCard_1(props) {
    const { event } = props;
    
    return (
        <div
            key={event.id}
            className="bg-white shadow-lg rounded-lg p-4 w-[300px] hover:shadow-xl transition-shadow duration-300 hover:scale-105"
        >
            <img
                src={event?.images[0]?.image_url}
                alt="Event"
                className="w-full h-[200px] object-cover rounded-lg mb-4"
            />
            <div className="flex flex-col">
                <div className="font-semibold text-lg text-blue-600 mb-2">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{event?.name}</h4>

                </div>
                <div className="mb-3 d-flex gap-5">
                    <h3 className="m-0">{dayjs(event?.time_start).format('DD-MM')}</h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">{dayjs(event?.time_start).format('HH:mm')}</span>
                        <span className="text-gray-400">-</span>
                        <span className="font-medium">{dayjs(event?.time_end).format('HH:mm')}</span>
                    </div>
                        
                </div>
                <p className="m-0 text-lg">Giá từ: {event?.ticket_type[0].price}</p>
            </div>
        </div>
    );
}

EventCard_1.propTypes = {
    event: PropTypes.object.isRequired,
};

export default EventCard_1;
