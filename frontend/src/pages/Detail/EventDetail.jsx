import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import TicketTable from '../../components/Tables/TicketTable';
import { getEventDetail } from '../../services/apiService'
import HostEvent from '../../components/Event/HostEvent';
import CarouselItems from '../../components/Carousel/CarouselItems';


function EventDetail() {
  const slug = useParams();
  const [eventDetail, setEventDetail] = useState();
  const [ticketType, setTicketType] = useState([]);

  const fetchEventDetail = async () => {
    const res = await getEventDetail(slug.id);
    setEventDetail(res.data.data);
    setTicketType(res.data.data.ticket_type);

  }
  useEffect(() => {
    fetchEventDetail();
  }, [])

  return (
    <div>
      <div className='h-[60vh] bg-[#333333]'>
        <div className='d-flex w-[100%] h-[60vh] justify-center items-center'>
          <div className="rounded-3xl w-[700px] h-[400px]">
            <img src={eventDetail?.images[1]?.image_url} className='rounded-3xl w-[700px] h-[400px]' />
          </div>
          <div className="rounded-3xl w-[300px] h-[400px] p-[20px] bg-[#6c6c6c]">
            <h2 className='font-semibold text-[22px] text-white'>{eventDetail?.name}</h2>
            <div className='d-flex gap-3 items-center text-white'>
              <i className="fa-solid fa-clock"></i>
              <h3 className='font-semibold '>{dayjs(eventDetail?.time_start).format('HH-mm')}</h3>
              <span>-</span>
              <h3 className='font-semibold '>{dayjs(eventDetail?.time_end).format('HH-mm')}</h3>
              <span> / </span>
              <h3 className='font-semibold '>{dayjs(event?.time_start).format('DD-MM')}</h3>
            </div>
            <div className='d-flex gap-[10px]'>
              <i className="fa-solid fa-location-dot text-white text-[16px]"></i>
              <h2 className='font-semibold text-[18px] text-white m-0'>{eventDetail?.address}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='container flex gap-12'>
        <div className='w-[60%]'>
          <div className='min-h-[350px]'>
            <h2>Thông tin sự kiện</h2>
            <div className="">
              <p>{eventDetail?.description}</p>
            </div>
          </div>
          <div className='min-h-[250px]'>
            <HostEvent />
          </div>

        </div>
        <div className='w-[40%]'>
          <div className='booking-event border-6 min-h-[200px]'>
            <TicketTable ticketType={ticketType}  />

          </div>
        </div>

      </div>
      <div className='container'>
        <h2>Có thể bạn cũng thích</h2>
        <CarouselItems />
      </div>
    </div>
  )
}

export default EventDetail