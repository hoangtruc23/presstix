import React from 'react';
import ticket from '../../assets/img/ticket.png';
import InforEvent from '../InforEvent/InforEvent';
import HostEvent from '../HostEvent/HostEvent';
import PromotionalAd from '../PromotionnalAd/PromotionalAd';
import './EventTitle.scss';  // Import the SCSS file

function EventTitle() {
    const info_ticket = [
        {
            title: 'Lakeside Camping at Pawna',
            date: '20:00 - 22:00, 10 Month 09, 2024',
            address: 'Venue',
            interested: 10,
            price: 200000,
        },
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="container">
            {info_ticket.map((item, index) => (
                <div key={index} className="w-[80%] ">
                    <img src={ticket} alt="Event Ticket" className="ticketImage" />
                    <h1 className="eventTitle">{item.title}</h1>

                    <div className="eventDetails">
                        <div className="eventInfo">
                            <h3>
                                <i className="fa-solid fa-calendar-days mr-3"></i> {item.date}
                            </h3>
                            <h3>
                                <i className="fa-solid fa-place-of-worship mr-2"></i> {item.address}
                            </h3>
                        </div>

                        <div className="priceSection">
                            <hr />
                            <h4>Price from: {formatPrice(item.price)}</h4>
                            <button className="bookButton btn btn-primary">Book Now</button>
                        </div>
                    </div>
                    <hr />
                    <div className="infoSections">
                        <div className="hostEventSection col">
                            <div className="sectionContent">
                                <HostEvent />
                            </div>
                            <div className="sectionContent">
                                <InforEvent />
                            </div>
                        </div>
                        <div className="promotionalAdSection col-4">
                            <div className="sectionContent">
                                <PromotionalAd />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EventTitle;
