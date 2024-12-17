import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
import CreateTicketType from "../../components/Ticket/CreateTicketType";
import { createNewEvent, getEventCate } from "../../services/apiService";
import { getLocationVN } from "../../utils/axiosInstance";
import 'ckeditor5/ckeditor5.css';

function CreateEvent() {
  const [eventCate, setEventCate] = useState([]);
  const [listTicketType, setListTicketType] = useState([]);
  const [imageLogo, setImageLogo] = useState(null);
  const [imageBia, setImageBia] = useState(null);
  const [locationList, setLocationList] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    user_id: 1,
    address: '',
    location: '',
    description: '',
    policy: '',
    time_start: '',
    time_end: '',
    status: 'active',
    event_cate_id: '',
    ticket_types: [],
    images: []
  });


  const fetchDataEventCate = async () => {
    const res = await getEventCate();
    setEventCate(res.data.data);
  };

  const fetchDataLocationVN = async () => {
    const res = await getLocationVN();
    setLocationList(res.data.data)
  };

  useEffect(() => {
    fetchDataEventCate();
    fetchDataLocationVN();

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'event_cate_id') {
      const selectedEvent = eventCate.find(event => event.name === value);
      setFormData(prev => ({ ...prev, [name]: selectedEvent ? selectedEvent.id : '' }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData(prev => ({ ...prev, description: data }));
  };

  const handleImageLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageLogo(reader.result);
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, images: [...prev.images, file] }));
    }
  };

  const handleImageBia = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageBia(reader.result);
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, images: [...prev.images, file] }));
    }
  };

  const handleStatusChange = (e) => {
    setFormData(prev => ({ ...prev, status: e.target.value }));
  };

  const handleSubmitCreateEvent = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    payload.append('name', formData.name);
    payload.append('user_id', formData.user_id);
    payload.append('address', formData.address);
    payload.append('location', formData.location);
    payload.append('description', formData.description);
    payload.append('policy', formData.policy);
    payload.append('time_start', formData.time_start);
    payload.append('time_end', formData.time_end);
    payload.append('status', formData.status);
    payload.append('event_cate_id', formData.event_cate_id);

    listTicketType.forEach((ticketType, index) => {
      if (ticketType.name && ticketType.price && ticketType.quantity) {
        payload.append(`ticket_types[${index}][name]`, ticketType.name);
        payload.append(`ticket_types[${index}][price]`, ticketType.price);
        payload.append(`ticket_types[${index}][quantity]`, ticketType.quantity);
      }
    });
   
    formData.images.forEach((image, index) => {
      payload.append(`images[${index}]`, image);
    });

    // for (let item of payload.entries()) {
    //   console.log(item[0], item[1]);
    // }

    try {
      const res = await createNewEvent(payload);
      if (res.data.success) {
        toast.success('Tạo sự kiện thành công');
      }
    } catch {
      toast.error('Tạo sự kiện thất bại');
    }
  };

  return (
    <div className='mb-60'>
      <h1>Tạo sự kiện</h1>
      <form onSubmit={handleSubmitCreateEvent}>
        <h2>Thông tin sự kiện</h2>
        <div className="d-flex form-group">
          <div className="w-1/3 form-control rounded-xl min-h-80 h-auto">
            <label htmlFor="logo-upload">Logo </label>
            <input type="file" accept="image/*" onChange={handleImageLogo} style={{ display: 'none' }} id="logo-upload" />
            {imageLogo && (
              <img src={imageLogo} alt="Preview" className='rounded-xl object-cover' style={{ width: '720px', height: '400px' }} />
            )}
          </div>
          <div className="form-control rounded-xl min-h-60 h-auto">
            <label>Ảnh bìa sự kiện: </label>
            <input type="file" accept="image/*" onChange={handleImageBia} />
            {imageBia && (
              <img src={imageBia} alt="Preview" className='rounded-xl object-cover' style={{ width: '1280px', height: '400px' }} />
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Tên sự kiện: </label>
          <input type="text" className="form-control rounded-xl" name='name' onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="eventList" className="form-label">Loại sự kiện: </label>
          <input
            className="form-control"
            list="datalistOptions"
            id="eventList"
            placeholder="Type to search..."
            name='event_cate_id'
            onChange={handleChange}
          />
          <datalist id="datalistOptions">
            {eventCate && eventCate.map((event, index) => (
              <option key={index} value={event.name}>{event.name}</option>
            ))}
          </datalist>
        </div>
        <div className="form-group d-flex items-end gap-2">
          <div className="w-2/3">
            <label>Địa điểm: </label>
            <input type="text" className="form-control rounded-xl" name='address' onChange={handleChange} />
          </div>

          <div className="w-1/3">
            <label htmlFor="locationList" className="form-label">Tỉnh/ Thành phố: </label>
            <input
              className="form-control"
              list="datalistLocation"
              id="locationList"
              placeholder="Type to search..."
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
            />
            <datalist id="datalistLocation">
              {locationList &&
                locationList.map((location, index) => (
                  <option key={index} value={location.name}>
                    {location.name}
                  </option>
                ))}
            </datalist>
          </div>
        </div>

        <div className="form-group">
          <label>Thông tin sự kiện: </label>
          <div>
            <CKEditor
              name='description'
              onChange={handleEditorChange}
              editor={ClassicEditor}
              config={{
                toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
                plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
                initialData: formData.description,
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Policy: </label>
          <textarea
            className="form-control rounded-xl"
            name='policy'
            onChange={handleChange}
            placeholder=''
          />
        </div>
        <div className="d-flex gap-5">
          <div className="form-group w-[40%]">
            <label>Thời gian bắt đầu: </label>
            <input type="datetime-local" className="form-control rounded-xl" name='time_start' onChange={handleChange} />
          </div>
          <div className="form-group w-[40%]">
            <label>Thời gian kết thúc: </label>
            <input type="datetime-local" className="form-control rounded-xl" name='time_end' onChange={handleChange} />
          </div>
        </div>
        <h2>Thông tin các loại vé</h2>
        <CreateTicketType setListTicketType={setListTicketType} />
        <div className="form-group w-[40%]">
          <label>Trạng thái: </label>
          <select className="form-select bg-red-500 text-white py-2 px-5 rounded-lg mx-3"
            value={formData.status}
            onChange={handleStatusChange}>
            <option value="active">Active</option>
            <option value="private">Private</option>
          </select>
          <button type="submit" className="btn btn-success w-40 py-2">Tạo sự kiện</button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;