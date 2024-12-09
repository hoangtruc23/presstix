import { useState, useEffect } from 'react';
import EventsListCard_2 from "../../components/Event/EventsListCard_2";
import { searchEvents } from '../../services/apiService';
import background from '../../assets/img/background-search.jpg';
import iconSearch from '../../assets/img/search.png';
import FilterCateEvent from '../../components/Filter/FilterCateEvent';
import CarouselAds from '../../components/Carousel/CarouselAds';

function Event() {
    const [search, setSearch] = useState("");
    const [events, setEvents] = useState([]);
    const [eventCateId, setEventCate] = useState('');

    const SearchEventsData = async () => {
        try {
            const res = await searchEvents(search, eventCateId);
            setEvents(res.data.data);
        } catch {
            console.error('Failed to fetch events');
        }
    };

    useEffect(() => {
        SearchEventsData();
    }, [search, eventCateId]);

    return (
        <>
            <div className="h-[400px] relative m-5">
                <img src={background} alt="Carousel" className="w-full h-full object-cover rounded-3xl shadow-lg" />

                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex  w-full px-4">
                    <div className="flex justify-center w-[45%]">
                        <img src={iconSearch} alt="Icon Search" className="w-[400px] object-cover" />
                    </div>
                    <div className="flex flex-col justify-center items-center w-[45%]">
                        <h1>Tìm kiếm sự kiện yêu thích của bạn</h1>
                        <input
                            type="text"
                            className="form-control p-4 text-[18px] bg-white text-gray-800 border border-gray-300 rounded-xl shadow-md w-full md:w-[80%]"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm sự kiện bạn thích"
                        />
                    </div>
                </div>
            </div>

            <div className="container d-flex gap-10 min-h-[600px]">
                <div className="w-[15%] bg-white mb-2 ">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900">Sắp xếp theo</h2>
                    <FilterCateEvent eventCate={eventCateId} setEventCate={setEventCate} />

                    <div className="mt-5">
                    <CarouselAds listEvent={events}/> 
                    </div>
                </div>
                <div className="w-[80%]">
                    <EventsListCard_2 events={events} />
                </div>

            </div>
        </>
    );
}

export default Event;