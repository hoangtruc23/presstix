import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchEvents } from '../../services/apiService';
import './event_component.scss'
import EventCard from './EventCard';
import EventCard_1 from './EventCard_1';

function EventList() {
    const [EventList, setEventList] = useState([]);

    const fetchDataEvents = async () => {
        try {
            const res = await searchEvents();
            setEventList(res.data.data);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    useEffect(() => {
        fetchDataEvents();
    }, []);

    return (
        <div className="d-flex gap-[30px]">
            {EventList.map((event, index) => (
                <Link to={`/event-detail/${event?.slug}`} key={index} className=' rounded-md'>
                    {/* <EventCard event={event} /> */}
                    <EventCard_1 event={event}  />
                </Link>
            ))}
        </div>
    );
}

export default EventList;