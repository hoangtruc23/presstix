import carousel1 from '../../assets/img/carousel1.jpg'

function HomeCarousel() {
  return (
    <div className="HomeCarousel">
      <img src={carousel1} alt="banner carousel" />

      <div className="content-carousel text-semibold uppercase">
        <h1 className='text-[50px] text-white'>Don’t miss out!</h1>
        <h1 className='text-[40px] text-white'>Explore the vibrant events happening locally and globally.</h1>
      </div>
    </div>
  )
}

export default HomeCarousel