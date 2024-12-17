import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Banner from '../../assets/img/banner.png';

function CarouselAds(props) {
    const { listEvent } = props;
    return (
        <>

            <img
                className='object-contain h-[400px] w-[300px] my-5'
                src={Banner}
                alt="Event"
            />
        </>
        // <Swiper
        //     slidesPerView={1}
        //     spaceBetween={80}
        //     // loop={true}
        //     navigation={true}
        //     modules={[Pagination, Navigation]}
        //     className="mySwiper"
        // >
        //     {listEvent && listEvent.length > 0 && listEvent.map((cate, index) => (
        //         <SwiperSlide key={index} >
        //             <img
        //                 className='object-cover h-[400px] w-[300px] '
        //                 src={cate.images[0]?.image_url}
        //                 alt="Event"
        //             />
        //         </SwiperSlide>
        //     ))}


        // </Swiper>
    );
}

export default CarouselAds