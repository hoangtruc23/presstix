import card from '../../assets/img/event1.webp';

function EventCard_2() {
    return (
        <div className='d-flex w-[600px] gap-4'>
            <div className=''>
                <img src={card} />
            </div>
            <div>
                <h3>Huhu</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
    )
}

export default EventCard_2