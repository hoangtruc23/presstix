import contact from '../../assets/img/contact.png'
import '../main.scss'
function Contact() {
    return (
        <div className='min-h-96 mt-20 mb-44'>
            <div className="contact-block w-[60%] ">
                <div className="w-[50%]">
                    <h1>Liên hệ</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Tên</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="Email" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nội dung</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary min-w-24">Gửi</button>
                    </form>
                </div>
                <div className="w-[50%] d-flex justify-center items-center">
                    <img src={contact} className='' />
                </div>
            </div>
        </div>
    );
}

export default Contact;