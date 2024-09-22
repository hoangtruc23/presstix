import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import event1 from '../../assets/img/event1.webp';
import { Button } from 'react-bootstrap';
import ModalBooking from '../../components/Modals/ModalBooking';
import TicketTable from '../../components/Tables/TicketTable';
import { getEventDetail } from '../../services/apiService'


function EventDetail() {
  const slug = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [eventDetail, setEventDetail] = useState();

  const fetchEventDetail = async () => {
    const res = await getEventDetail(slug.id);
    setEventDetail(res.data);
    console.log(res);
  }
  useEffect(() => {
    fetchEventDetail();
  }, [])

  return (
    <div>
      <div className='h-[60vh] bg-[#333333]'>
        <div className='d-flex w-[100%] h-[60vh] justify-center items-center'>
          <div className="rounded-3xl w-[700px] h-[400px]">
            <img src={event1} className='rounded-3xl w-[700px] h-[400px]' />
          </div>
          <div className="rounded-3xl w-[300px] h-[400px] p-[20px] bg-[#6c6c6c]">
            <h2 className='font-semibold text-[22px] text-white'>{eventDetail?.name}</h2>
            <div className='d-flex gap-3 items-center text-white'>
              <i className="fa-solid fa-clock"></i>
              <h3 className='font-semibold '>{moment(eventDetail?.time_start).format('HH-mm')}</h3>
              <span>-</span>
              <h3 className='font-semibold '>{moment(eventDetail?.time_end).format('HH-mm')}</h3>
              <span> / </span>
              <h3 className='font-semibold '>{moment(event?.time_start).format('DD-MM')}</h3>
            </div>
            <div className='d-flex gap-[10px]'>
              <i className="fa-solid fa-location-dot text-white text-[16px]"></i>
              <h2 className='font-semibold text-[18px] text-white m-0'>{eventDetail?.location}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='container flex'>
        <div className='w-[60%]'>
          <div className='min-h-[350px]'>
            <h2 >Event Description</h2>
          </div>
          <div className='min-h-[250px]'>
            <h2>Ban tổ chức</h2>

          </div>
          <div className='min-h-[150px]'>
            <h2>Thẻ</h2>

          </div>

        </div>
        <div className='w-[40%]'>
          <div className='booking-event border-6 min-h-[200px]'>
            <TicketTable />
            <Button className="float-right" onClick={handleShow}>
              Đặt vé
            </Button>
            <ModalBooking
              show={show}
              handleClose={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail