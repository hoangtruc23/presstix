import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchEvents } from '../../services/apiService';
import './event_component.scss'
import EventCard from './EventCard';

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
        <div className="d-flex justify-center gap-[30px] flex-wrap">
            {EventList.map((event, index) => (
                <Link to={`/event-detail/${event?.slug}`} key={index} className='w-[30%] info-event-home rounded-md'>
                    <EventCard event={event} />
                </Link>

            ))}
        </div>
    );
}

export default EventList;