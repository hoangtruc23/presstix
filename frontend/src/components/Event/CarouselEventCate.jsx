import { useEffect, useState } from 'react'
import Slider from "react-slick";
import cateimg from '../../assets/img/cate.png'
import { getEventCate } from '../../services/apiService';



function CarouselEventCate() {
    const [listCates, setListCates] = useState([]);

    const fetchEventCate = async () => {
        const res = await getEventCate();
        setListCates((prevList) => [...prevList, ...res.data.data]);
    }

    useEffect(() => {
        fetchEventCate();
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: <button type="button" className="slick-prev"><i className="fas fa-chevron-left"></i></button>,
        nextArrow: <button type="button" className="slick-next"><i className="fas fa-chevron-right"></i></button>
    };

    return (
        <Slider {...settings} className='slick-event-cate'>
            {listCates.map((cate, index) => (
                <div key={index} className='d-flex flex-col items-center text-center'>
                    <img src={cateimg} className="w-[150px]" />
                    <p className="my-4">{cate?.name}</p>
                </div>  
            ))}
        </Slider>
    )
}

export default CarouselEventCate