import React, { useState } from 'react';
import ticket from '../../assets/img/ticket.png';
import './EventOther.scss'; // Import file SCSS

function EventOther() {
    const initialTickets = [
        { date: '25-26', title: 'Lakeside Camping at Pawna', venue: 'Venue', interested: 10, price: 200, isStarFilled: false },
        { date: '15-16', title: 'Mountain Adventure', venue: 'Venue', interested: 12, price: 300, isStarFilled: false },
        { date: '21-22', title: 'River Rafting', venue: 'Venue', interested: 15, price: 250, isStarFilled: false },
        { date: '24-25', title: 'Forest Trekking', venue: 'Venue', interested: 8, price: 180, isStarFilled: false },
        { date: '04-05', title: 'Desert Safari', venue: 'Venue', interested: 20, price: 350, isStarFilled: false },
        { date: '20-21', title: 'City Tour', venue: 'Venue', interested: 25, price: 100, isStarFilled: false },
    ];

    const [tickets, setTickets] = useState(initialTickets);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? tickets.length - itemsPerPage : prevIndex - itemsPerPage));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex >= tickets.length - itemsPerPage ? 0 : prevIndex + itemsPerPage));
    };

    const handleStarClick = (index) => {
        // Lấy chỉ số chính xác của sản phẩm dựa trên trang hiện tại
        const ticketIndex = currentIndex + index;

        setTickets((prevTickets) => {
            return prevTickets.map((ticket, idx) => {
                if (idx === ticketIndex) {
                    // Đảo ngược trạng thái ngôi sao của sản phẩm
                    const isCurrentlyFilled = ticket.isStarFilled;
                    const newInterested = isCurrentlyFilled ? ticket.interested - 1 : ticket.interested + 1;

                    return {
                        ...ticket,
                        isStarFilled: !isCurrentlyFilled,
                        interested: newInterested,
                    };
                }
                return ticket;
            });
        });
    };





    return (
        <div className="event-carousel">
            <button className="prev-btn" onClick={handlePrevClick}>
                <i className="fa-solid fa-arrow-left-long"></i>
            </button>
            <div className="carousel-content">
                {tickets.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => (
                    <div key={index} className="event-item">
                        <img src={ticket} alt="Ticket" />
                        <div className="event-details">
                            <div className="date">
                                <h5>{item.date}</h5>
                            </div>
                            <div className="details">
                                <h5>{item.title}</h5>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, qui.</p>
                                <p>8:30 - 7:30</p>
                                <h3>
                                    <i
                                        className={`fa-solid fa-star ${item.isStarFilled ? 'filled' : ''}`}
                                        onClick={() => handleStarClick(index)} // Index ở đây là vị trí sản phẩm trên trang hiện tại
                                    ></i>
                                    <span>{item.interested} interested</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="next-btn" onClick={handleNextClick}>
                <i className="fa-solid fa-arrow-right-long"></i>
            </button>
        </div>
    );
}

export default EventOther;
