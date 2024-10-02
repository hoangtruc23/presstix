
import EventCard_2 from "../../components/Event/EventCard_2";
import SearchEvent from "../../components/Explore";
import { Form } from 'react-bootstrap'
function Event() {
    return (
        <>
            <div className="banner min-h-[500px] bg-[#892932] d-flex flex-col justify-center items-center">
                <h1 className='text-white'>Event Page</h1>
                <div className='w-[50%]'>
                    <SearchEvent />
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
                        <Form.Check
                            type='checkbox'
                            label='Price'
                        />
                        <Form.Check
                            type='checkbox'
                            label='Price'
                        />
                        <Form.Check
                            type='checkbox'
                            label='Price'
                        />
                    </div>
                    <div className="">
                        <h2>Search By</h2>
                        <EventCard_2 />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Event;