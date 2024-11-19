import { useEffect, useState } from 'react'
import cateimg from '../../assets/img/cate.png'
import { getEventCate } from '../../services/apiService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

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
            spaceBetween={50}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {listCates && listCates.length > 0 && listCates.map((cate, index) => (
                <SwiperSlide key={index} >
                    <img
                        className='rounded-xl object-cover  '
                        src={cateimg}
                        alt="Event"
                    />
                    <h4 className='text-center'>{cate.name}</h4>
                </SwiperSlide>
            ))}


        </Swiper>
    );
}

export default CarouselItems