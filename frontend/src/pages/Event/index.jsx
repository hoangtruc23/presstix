import { useState,useEffect } from 'react'
import EventsListCard_2 from "../../components/Event/EventsListCard_2";
import SearchEvent from "../../components/Explore";
import { Form, DropdownButton, Dropdown } from 'react-bootstrap'
import { searchEvents } from '../../services/apiService';
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
    }, [])

    return (
        <>
            <div className="banner min-h-[500px] bg-[#892932] d-flex flex-col justify-center items-center">
                <h1 className='text-white'>Event Page</h1>
                <div className='w-[50%]'>
                    <SearchEvent setSearch={setSearch} handleBtnSearchEvents={handleBtnSearchEvents} />
                </div>
            </div>

            <div className="container">
                <div className="d-flex">
                    <div className='filter w-[20%]'>
                        <h2>Filter</h2>
                        <Form.Check
                            type='checkbox'
                            label='Price'
                        />

                    </div>
                    <div className=" w-[80%]">
                        <div className="d-flex gap-4 items-center">
                            <h2>Order By</h2>
                            <DropdownButton title="Choose">
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <EventsListCard_2 events={events} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Event;