import { useEffect, useState } from 'react'
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
            spaceBetween={80}
            // loop={true}
            // pagination={{
            //     clickable: true,
            // }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {listCates && listCates.length > 0 && listCates.map((cate, index) => (
                <SwiperSlide key={index} >
                    {/* <img
                        className='rounded-xl object-cover  '
                        src={cateimg}
                        alt="Event"
                    /> */}
                    <div className="d-flex flex-col items-center">
                        <i className="text-[50px] p-[50px] rounded-full bg-slate-200 fa-solid fa-music"></i>
                        <h4 className='text-center'>{cate.name}</h4>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default CarouselItems