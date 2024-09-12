import BtnSeeMore from "../../components/Button/BtnSeeMore"
import HomeCarousel from "../../components/Carousel/HomeCarousel"
import ListCate from "../../components/Cate/ListCate"
import ListEvents from "../../components/Event/ListEvents"



function HomePage() {
  return (
    <>
      <HomeCarousel />
      <div className="w-[80%] mx-auto px-4">
        <div className="my-[50px]">
          <h1 className="text-[32px]">Explore Categories</h1>
          <ListCate />
        </div>
        <div className="my-[50px]">
          <h1 className="text-[32px]">Popular Events in Mumbai</h1>
          <ListEvents />
          <div className="my-[50px]">
            <BtnSeeMore />
          </div>
        </div>
        <div className="my-[50px]">
          <h1 className="text-[32px]">Discover Best of Online Events</h1>
          <ListEvents />
          <div className="my-[50px]">
            <BtnSeeMore />
          </div>
        </div>
        <div className="my-[50px]">
          <h1 className="text-[32px]">Trending Events around the World</h1>
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