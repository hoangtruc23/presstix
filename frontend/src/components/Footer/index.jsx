function Footer() {
    return (
        <div className="min-h-96 bg-black text-white mt-[50px]">
            <div className="d-flex items-center mx-72 mb-14 gap-24 py-10">
                <h1 className='w-[70%] text-[51px] font-semibold uppercase'>Quản lý và bán vé dễ dàng hơn. Hợp tác cùng Presstix</h1>
                <button className='w-[20%] h-fit text-[18px] bg-[#D9D9D9] text-black py-3 rounded-full'>Bắt đầu ngay!</button>
            </div>
            <div className="d-flex gap-5 justify-between pb-32 px-32">
                <div className="">
                    <div className="border-b-2 w-[200px] mb-3">
                        <h4 className='text-[20px] text-uppercase font-semibold'>Contact Detail</h4>
                    </div>
                    <p><span className='font-semibold'>Tel: </span>84732984793</p>
                    <p><span className='font-semibold'>Email: </span>admin@gmail.com</p>

                </div>
                <div className="">
                    <div className="border-b-2 w-[200px] mb-3">
                        <h4 className='text-[20px] text-uppercase font-semibold'>Menu</h4>
                    </div>
                    <ul>
                        <li> <a className='text-uppercase font-semibold'>Home</a></li>
                        <li> <a className='text-uppercase font-semibold'>Home</a></li>
                        <li> <a className='text-uppercase font-semibold'>Home</a></li>
                        <li> <a className='text-uppercase font-semibold'>Home</a></li>
                    </ul>


                </div>
                <div className="">
                    <div className="border-b-2 w-[200px] mb-3">
                        <h4 className='text-[20px] text-uppercase font-semibold'>OUR PARTNERS</h4>
                    </div>
                    <ul>
                        <li> <a className='text-uppercase font-semibold'>Home</a></li>

                        <li> <a className='text-uppercase font-semibold'>Home</a></li>
                    </ul>
                </div>
                <div className="w-[30%]">
                    <div className="border-2 mb-3 p-3">
                        <p>We have a specialized team of Professionals, some of us with over 30 years in the hotel industry and other in the real estate, combined makes this a winning team ready to help you. We offer professional advise, maintaining discretion...</p>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Footer