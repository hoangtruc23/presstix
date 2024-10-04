import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import event1 from '../../assets/img/event1.webp';

function EventCard(props) {
    const { event, layout } = props;
    return (
        <>
            {layout === 'explore' ? (
                <div className='d-flex gap-4 cursor-pointer hover:shadow-lg hover:bg-slate-100 p-3'>
                    <img src={event1} className='w-[45%]' />
                    <div>
                        <h4 className='line-clamp-1'>{event?.name}</h4>
                        <div className="d-flex">
                            <h5>{dayjs(event?.time_start).format('HH : mm') + ' - ' + dayjs(event?.time_end).format('HH : mm / ')}</h5>
                            <h5>{dayjs(event?.time_start).format('DD - MM ')}</h5>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <img src={event1} alt="Event" />
                    <div className="d-flex gap-3 p-[10px]">
                        <div className='w-[20%] text-center font-semibold'>
                            <h3>{dayjs(event?.time_start).format('DD-MM')}</h3>
                        </div>
                        <div className='w-[80%]'>
                            <h4>{event?.name}</h4>
                            <div className='flex items-center gap-1'>
                                <h3>{dayjs(event?.time_start).format('HH:mm')}</h3>
                                <span>-</span>
                                <h3>{dayjs(event?.time_end).format('HH:mm')}</h3>
                            </div>
                            <p>interested</p>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

EventCard.propTypes = {
    event: PropTypes.object.isRequired,
    layout: PropTypes.string,
}

export default EventCard