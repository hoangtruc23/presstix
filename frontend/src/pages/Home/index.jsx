import BtnSeeMore from "../../components/Button/BtnSeeMore"
import CarouselItems from "../../components/Carousel/CarouselItems"
import HomeCarousel from "../../components/Carousel/HomeCarousel"
import EventList from "../../components/Event/EventList"



function HomePage() {
  return (
    <>
      <HomeCarousel />
      <div className="w-[80%] mx-auto px-4">
        <div className="my-[50px]">
          <h2 className="mb-4">Khám phá danh mục</h2>
          <CarouselItems/>
        </div>
        <div className="my-[50px]">
          <h2 className="text-[28px] mb-4">Sự kiện mới nhất</h2>
          <EventList />
          <div className="my-[50px]">
            <BtnSeeMore />
          </div>
        </div>
        <div className="my-[50px]">
          <h2 className="mb-4">Discover Best of Online Events</h2>
          <EventList />
          <div className="my-[50px]">
            <BtnSeeMore />
          </div>
        </div>
        <div className="my-[50px]">
          <h2 className="mb-4">Trending Events around the World</h2>
          <EventList />
          <div className="my-[50px]">
            <BtnSeeMore />
          </div>
        </div>
      </div>

    </>
  )
}

export default HomePage