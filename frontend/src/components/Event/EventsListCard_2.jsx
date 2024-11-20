
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './event_component.scss'
import EventCard_1 from './EventCard_1';


function EventsListCard_2(props) {
    const { events } = props;

    return (
        <div className='d-flex gap-5 flex-wrap'>
            {events != null}{
                events.map((event, index) => (
                    <Link to={`/event-detail/${event?.slug}`} key={index} className='w-[300px]'>
                        <EventCard_1 event={event}  />
                    </Link>

                ))
            }
        </div>
    )
}

EventsListCard_2.propTypes = {
    events: PropTypes.array
}


export default EventsListCard_2