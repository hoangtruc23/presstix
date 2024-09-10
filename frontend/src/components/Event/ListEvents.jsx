
import ticket from '../../assets/img/ticket.png'

function ListEvents() {

    const info_ticket = [
        {
            date: '25-26',
            title: 'Lakeside Camping at Pawna',
            venue: 'Venue',
            interested: 10,
            price: 200,
        },
        {
            date: '25-26',
            title: 'Lakeside Camping at Pawna',
            venue: 'Venue',
            interested: 10,
            price: 200,
        },
        {
            date: '25-26',
            title: 'Lakeside Camping at Pawna',
            venue: 'Venue',
            interested: 10,
            price: 200,
        },
        {
            date: '25-26',
            title: 'Lakeside Camping at Pawna',
            venue: 'Venue',
            interested: 10,
            price: 200,
        },
        {
            date: '25-26',
            title: 'Lakeside Camping at Pawna',
            venue: 'Venue',
            interested: 10,
            price: 200,
        },
        {
            date: '25-26',
            title: 'Lakeside Camping at Pawna',
            venue: 'Venue',
            interested: 10,
            price: 200,
        },
    ]



    return (
        <div className="d-flex justify-center gap-3 flex-wrap">
            {info_ticket.map((item, index) => (
                <div key={index} className="w-[32%]" >
                    <img src={ticket} />
                    <div className="d-flex gap-5">
                        <div className='w-[20%]' >
                            <h3>{item.date}</h3>
                        </div>
                        <div>
                            <h4>{item.title}</h4>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, qui.</p>
                            <p>8:30 - 7:30</p>
                            <p>interested</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListEvents