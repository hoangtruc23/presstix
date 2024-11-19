// import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import carousel1 from '../../assets/img/carousel1.jpg'
import banner2 from '../../assets/img/banner-2.png'
import banner3 from '../../assets/img/banner-3.png'

function HomeCarousel() {
  // const [listCates, setListCates] = useState([]);


  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper h-[700px]"
    >
      <SwiperSlide>
        <img
          className='rounded-xl object-cover w-full h-full'
          src={banner2}
          alt="Event"
        />
      </SwiperSlide>
      <SwiperSlide className='p-14 h-[700px]'>
        <img
          className='rounded-xl object-cover w-full h-full'
          src={carousel1}
          alt="Event"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          className='rounded-xl object-cover w-full h-full'
          src={banner3}
          alt="Event"
        />
      </SwiperSlide>
    </Swiper>
  )
}

export default HomeCarousel