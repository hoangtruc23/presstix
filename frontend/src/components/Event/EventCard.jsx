import dayjs from 'dayjs';
import PropTypes from 'prop-types';

function EventCard(props) {
    const { event, layout } = props;
    return (
        <>
            {layout === 'explore' ? (
                <div className='d-flex gap-4 cursor-pointer hover:shadow-lg hover:bg-slate-100 p-3'>
                    <img src={event?.images[0]?.image_url} className='w-[45%]' />
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
                    <img src={event?.images[0]?.image_url} alt="Event" className='h-80' />
                    <div className="d-flex gap-3 p-[10px]">
                        <div className='text-center font-semibold'>
                            <h3 className='w-max'>{dayjs(event?.time_start).format('DD-MM')}</h3>
                        </div>
                        <div className='w-[80%]'>
                            <h4 className='line-clamp-1'>{event?.name}</h4>
                            <div className='flex items-center gap-1'>
                                <h3 className='m-0'>{dayjs(event?.time_start).format('HH:mm')}</h3>
                                <span>-</span>
                                <h3 className='m-0'>{dayjs(event?.time_end).format('HH:mm')}</h3>
                            </div>
                            <p>Interest</p>
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