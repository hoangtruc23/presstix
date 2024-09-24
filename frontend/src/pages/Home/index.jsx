import BtnSeeMore from "../../components/Button/BtnSeeMore"
import CarouselItems from "../../components/Carousel/CarouselItems"
import HomeCarousel from "../../components/Carousel/HomeCarousel"
import ListEvents from "../../components/Event/ListEvents"



function HomePage() {
  return (
    <>
      <HomeCarousel />
      <div className="w-[80%] mx-auto px-4">
        <div className="my-[50px]">
          <h1 className="text-[32px] mb-4">Explore Categories</h1>
          <CarouselItems/>
        </div>
        <div className="my-[50px]">
          <h1 className="text-[32px] mb-4">Popular Events in Mumbai</h1>
          <ListEvents />
          <div className="my-[50px]">
            <BtnSeeMore />
          </div>
        </div>
        <div className="my-[50px]">
          <h1 className="text-[32px] mb-4">Discover Best of Online Events</h1>
          <ListEvents />
          <div className="my-[50px]">
            <BtnSeeMore />
          </div>
        </div>
        <div className="my-[50px]">
          <h1 className="text-[32px] mb-4">Trending Events around the World</h1>
          <ListEvents />
          <div className="my-[50px]">
            <BtnSeeMore />
          </div>
        </div>
      </div>

    </>
  )
}

export default HomePage