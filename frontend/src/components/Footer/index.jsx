import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Footer() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const handleBtnStartOrganizer = () => {
        if (!isAuthenticated) {
            toast.error("Vui lòng đăng nhập để tiếp tục!");
            return;
        }
        navigate("/organizer");
    }
    return (
        <div className="min-h-40 bg-blue-500 text-white mt-[50px]">
            <div className="d-flex items-center mx-72 gap-24 py-10">
                <h1 className='w-[70%] text-[51px] font-semibold uppercase'>Quản lý và bán vé dễ dàng hơn. Hợp tác cùng Presstix</h1>
                <button className='w-[20%] h-fit text-[18px] bg-white text-black py-3 rounded-full' onClick={handleBtnStartOrganizer}>Bắt đầu ngay!</button>
            </div>
            <div className="d-flex gap-5 justify-between pb-12 px-32">
                <div className="">
                    <div className="border-b-2 w-[200px] mb-3">
                        <h4 className='text-[20px] text-uppercase font-semibold'>Thông tin liên hệ</h4>
                    </div>
                    <p><span className='font-semibold'>Tel: </span>+84 779641623</p>
                    <p><span className='font-semibold'>Email: </span>admin@gmail.com</p>

                </div>
                <div className="">
                    <div className="border-b-2 w-[200px] mb-3">
                        <h4 className='text-[20px] text-uppercase font-semibold'>Danh sách</h4>
                    </div>
                    <ul>
                        <Link to='/'> <a className='text-uppercase'>Trang chủ</a></Link>
                        <li> <a className='text-uppercase'>Sự kiện</a></li>
                        <li> <a className='text-uppercase'>Giới thiệu</a></li>
                        <li> <a className='text-uppercase'>Liện hệ</a></li>
                    </ul>
                </div>

                <div className="">
                    <div className="w-[200px] mb-3">
                        <h4 className=''>Đăng ký email nhận thông tin sự kiện hot nhất</h4>
                        <div className="d-flex">
                            <input className='p-2 text-black' type="text" placeholder="" />
                            <button className='btn bg-black'>Gửi</button>
                        </div>
                    </div>


                </div>

                <div className="w-[30%]">
                    <div className="border-2 mb-3 p-3">
                        <p>
                            PressTix hy vọng mang đến cho mọi người một website thân thiện, có thể mua vé dễ dàng và tiện lợi.
                            Đồng thời cũng giúp các ban tổ chức nhỏ lẻ có thể quản lý sự kiện của mình dễ dàng và linh hoạt hơn
                        </p>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Footer