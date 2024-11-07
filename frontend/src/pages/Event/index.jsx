import { useState, useEffect } from 'react'
import EventsListCard_2 from "../../components/Event/EventsListCard_2";
import SearchEvent from "../../components/Explore";
import { searchEvents } from '../../services/apiService';
import BannerTitle from '../../components/Banner/BannerTitle';
import FilterCateEvent from '../../components/Filter/FilterCateEvent';
function Event() {
    const [search, setSearch] = useState("");
    const [events, setEvents] = useState([]);

    const handleBtnSearchEvents = () => {
        SearchEventsData();
    }

    const SearchEventsData = async () => {
        try {
            const res = await searchEvents(search);
            setEvents(res.data.data)
        } catch {
            console.error('Failed to fetch events');
        }
    }

    useEffect(() => {
        SearchEventsData();
    }, [search])

    return (
        <>
            <div className="relative">
                <BannerTitle />
                <div className='w-[50%] absolute bottom-32 left-1/2 transform -translate-x-1/2'>
                    <SearchEvent setSearch={setSearch} handleBtnSearchEvents={handleBtnSearchEvents} />
                </div>
            </div>


            <div className="container min-h-[600px]">
                <div className="d-flex">
                    <div className='filter w-[20%]'>

                        <h2>Sắp xếp theo</h2>
                        <FilterCateEvent/>

                    </div>

                    <div className=" w-[80%]">

                        <EventsListCard_2 events={events} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Event;