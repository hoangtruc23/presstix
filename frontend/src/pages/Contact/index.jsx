import { useState } from "react";
import { toast } from 'react-toastify';
import emailjs from "emailjs-com";
import contact from "../../assets/img/contact.png";
import "../main.scss";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_mztuuxj", 
        "template_gpnpw2s", 
        formData,
        "2FdP5MR0Ju5Ca_zXH" 
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Email đã được gửi thành công!");
          setFormData({ name: "", email: "", message: "" }); 
        },
        (err) => {
          console.error("FAILED...", err);
          toast.error("Gửi email thất bại, vui lòng thử lại!");
        }
      );
  };

  return (
    <div className="min-h-96 mt-20 mb-44">
      <div className="contact-block w-[60%] flex justify-between">
        <div className="w-[50%]">
          <h1>Liên hệ</h1>
          <form onSubmit={sendEmail}>
            <div className="mb-3">
              <label className="form-label">Tên</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên của bạn"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email của bạn"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nội dung</label>
              <textarea
                className="form-control"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Nội dung tin nhắn"
                rows="3"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary min-w-24">
              Gửi
            </button>
          </form>
        </div>

        <div className="w-[50%] flex justify-center items-center">
          <img src={contact} alt="Liên hệ" />
        </div>
      </div>
    </div>
  );
}

export default Contact;