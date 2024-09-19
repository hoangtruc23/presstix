import { useState, useEffect } from 'react';
import moment from 'moment';
import ticket from '../../assets/img/ticket.png';
import { getAllEvent } from '../../services/apiService';

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
        <div className="d-flex justify-center gap-3 flex-wrap">
            {listEvents.map((event, index) => (
                <div key={index} className="w-[32%]">
                    <img src={ticket} alt="Event" />
                    <div className="d-flex gap-5">
                        <div className='w-[20%]'>
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