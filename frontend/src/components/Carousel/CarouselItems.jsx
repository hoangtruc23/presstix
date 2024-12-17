import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getEventCate } from '../../services/apiService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import TPHCM from "../../assets/img/city/TPHCM.jpg"

function CarouselItems() {
    const [listCates, setListCates] = useState([]);
    useEffect(() => {
        const fetchEventCate = async () => {
            try {
                const res = await getEventCate();
                if (res?.data?.data) {
                    setListCates((prevList) => [...prevList, ...res.data.data]);
                }
            } catch (error) {
                console.error('Error fetching event categories:', error);
            }
        };
        fetchEventCate();
    }, []);


    return (
        <Swiper
            key={listCates.length}
            slidesPerView={5}
            spaceBetween={20}
            // loop={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {listCates && listCates.length > 0 && listCates.map((cate,index) => (
                <SwiperSlide key={index} >
                    <Link to='events' state={{ cate }}>
                        <div className="relative duration-500 hover:scale-105 group">
                            <img
                                alt="image"
                                src={cate?.image || TPHCM}
                                // src={TPHCM}
                                className="w-full h-[200px] object-cover rounded-lg mb-4 transition-all ease-in-out group-hover:opacity-80"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-4">
                                <h3 className="text-white text-[28px] m-0">
                                    {cate.name}
                                </h3>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>

            ))}
        </Swiper>
    );
}

export default CarouselItems