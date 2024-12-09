import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

function CarouselAds(props) {
    const {listEvent} = props;
    console.log({listEvent})
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={80}
            // loop={true}
            // pagination={{
            //     clickable: true,
            // }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            {listEvent && listEvent.length > 0 && listEvent.map((cate, index) => (
                <SwiperSlide key={index} >
                    <img
                        className='rounded-xl object-cover h-[400px] w-[300px] '
                        src={cate.images[0]?.image_url}
                        alt="Event"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default CarouselAds