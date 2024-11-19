import contact from '../../assets/img/contacts-books.png'
import '../main.scss'
function Contact() {
    return (
        <div className='min-h-96 my-20'>
            <div className="contact-block w-[60%] ">
                <div className="w-[50%] d-flex justify-center items-center">
                    <img src={contact} className='w-[50%]' />
                </div>
                <div className="w-[50%]">
                    <h1>Contact</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="Email" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Message</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;