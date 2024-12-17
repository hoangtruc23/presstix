import BtnSeeMore from "../../components/Button/BtnSeeMore"
import CarouselItems from "../../components/Carousel/CarouselItems"
import HomeCarousel from "../../components/Carousel/HomeCarousel"
import EventList from "../../components/Event/EventList"
import TPHCM from "../../assets/img/city/TPHCM.jpg"
import HaNoi from "../../assets/img/city/HaNoi.jpg"
import DaNang from "../../assets/img/city/DaNang.jpg"
import BannerAds from "../../assets/img/ads/banner.png"
import { useState } from "react"


function HomePage() {
  const [cityList, setCityList] = useState([
    {
      name: "TP HCM",
      image: TPHCM,
      events: 50,
    },
    {
      name: "Hà Nội",
      image: HaNoi,
      events: 60,
    },
    {
      name: "Đà Nẵng",
      image: DaNang,
      events: 70,
    },
  ]);

  return (
    <>
      <HomeCarousel />
      <div className="w-[80%] mx-auto px-4">
        <div className="">
          <h2 className="mb-4">Khám phá danh mục</h2>
          <CarouselItems />
        </div>

        <div className="my-[50px]">
          <h2 className="text-[28px] mb-4"><i className="fa-solid fa-fire"></i> Sự kiện mới nhất</h2>
          <EventList />
          <div className="my-[50px]">
            <BtnSeeMore />
          </div>
        </div>

        <img src='https://ticketbox.vn/_next/image?url=https%3A%2F%2Fsalt.tkbcdn.com%2Fts%2Fds%2F73%2Fa7%2F9c%2Fe628279a31a9d8dca6f683fc4a38e30a.jpg&w=3840&q=75' alt="" />

        <div className="my-[50px]">
          <h2 className="mb-4"> <i className="fa-solid fa-fire"></i> Sự kiện đang HOT
          </h2>
          <EventList />
          <div className="my-[50px]">
            <BtnSeeMore />
          </div>
        </div>

        <div className="my-[50px]">
          <h2 className="mb-4"> <i className="fa-solid fa-fire"></i> Địa điểm tổ chức</h2>

          <div className="d-flex gap-10">
            {cityList.map((city, index) => (
              <div key={index} className="relative duration-500 hover:scale-105 group">
                <img
                  alt="Event"
                  src={city.image}
                  className="w-full h-[300px] object-cover rounded-lg mb-4 transition-all ease-in-out group-hover:opacity-80"
                />
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-white text-[48px] m-0">
                    {city.name}
                  </h3>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>

    </>
  )
}

export default HomePage