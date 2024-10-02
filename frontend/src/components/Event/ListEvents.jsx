import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvent } from '../../services/apiService';
import './event_component.scss'

import EventCard_1 from './EventCard_1';

function ListEvents() {
    const [listEvents, setListEvents] = useState([]);

    const fetchDataEvents = async () => {
        try {
            const res = await getAllEvent();
            setListEvents(res.data.data);
        } catch (error) {
            console.error('Failed to fetch events:', error);
        }
    };

    useEffect(() => {
        fetchDataEvents();
    }, []);

    return (
        <div className="d-flex justify-center gap-[30px] flex-wrap">
            {listEvents.map((event, index) => (
                <Link to={`/event-detail/${event?.slug}`} key={index} className='w-[30%] info-event-home rounded-md'>
                    <EventCard_1 event={event} />
                </Link>

            ))}
        </div>
    );
}

export default ListEvents;