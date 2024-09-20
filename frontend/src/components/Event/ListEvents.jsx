import { useState, useEffect } from 'react';
import moment from 'moment';
import event1 from '../../assets/img/event1.webp';
import { getAllEvent } from '../../services/apiService';
import './event_component.scss'

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
                <div key={index} className="w-[30%] info-event-home rounded-md">
                    <img src={event1} alt="Event" />
                    <div className="d-flex gap-3 p-[10px]">
                        <div className='w-[20%] text-center font-semibold'>
                            <h3>{moment(event?.time_start).format('DD-MM')}</h3>
                        </div>
                        <div>
                            <h4>{event?.name}</h4>
                            <div className='flex items-center gap-1'>
                                <h3>{moment(event?.time_start).format('HH:mm')}</h3>
                                <span>-</span>
                                <h3>{moment(event?.time_end).format('HH:mm')}</h3>
                            </div>
                            <p>interested</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListEvents;