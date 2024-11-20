import { useState, useEffect } from 'react';
import EventsListCard_2 from "../../components/Event/EventsListCard_2";
import SearchEvent from "../../components/Explore";
import { searchEvents } from '../../services/apiService';
import carousel1 from '../../assets/img/carousel1.jpg';
import background from '../../assets/img/background-search.jpg';
import iconSearch from '../../assets/img/search.png';
import FilterCateEvent from '../../components/Filter/FilterCateEvent';

function Event() {
    const [search, setSearch] = useState("");
    const [events, setEvents] = useState([]);

    const handleBtnSearchEvents = () => {
        SearchEventsData();
    };

    const SearchEventsData = async () => {
        try {
            const res = await searchEvents(search);
            setEvents(res.data.data);
        } catch {
            console.error('Failed to fetch events');
        }
    };

    useEffect(() => {
        SearchEventsData();
    }, [search]);

    return (
        <>
            <div className="h-[400px] relative m-5">
                <img src={background} alt="Carousel" className="w-full h-full object-cover rounded-3xl shadow-lg" />

                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex  w-full px-4">
                    <div className="flex justify-center w-[45%]">
                        <img src={iconSearch} alt="Icon Search" className="w-[400px] object-cover" />
                    </div>
                    <div className="flex flex-col justify-center items-center w-[45%]">
                        <h1>Search for your choose</h1>
                        <input
                            type="text"
                            className="form-control p-4 text-[18px] bg-white text-gray-800 border border-gray-300 rounded-xl shadow-md w-full md:w-[80%]"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm sự kiện bạn thích"
                        />
                    </div>
                </div>
            </div>

            <div className="container min-h-[600px] py-8">
                <div className="flex gap-8">
                    <div className="filter w-full md:w-[20%] bg-gray-100 p-6 rounded-xl shadow-lg">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900">Sắp xếp theo</h2>
                        <FilterCateEvent />
                    </div>

                    <div className="w-full md:w-[80%]">
                        <EventsListCard_2 events={events} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Event;