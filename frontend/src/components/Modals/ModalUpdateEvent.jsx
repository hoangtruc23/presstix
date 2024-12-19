import PropTypes from 'prop-types';
import { Button, Modal, Col, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import './modal.scss'
import EventCateList from '../Event/EventCateList';
import { putUpdateEvent } from '../../services/apiService';
import { toast } from 'react-toastify';

function ModalUpdateEvent({ show, setShow, event }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    time_start: '',
    time_end: '',
    policy: '',
    description: '',
    status: 'available',
    ticket_type: [],
    event_cate_id: '',
    images: [],
  });

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || '',
        address: event.address || '',
        time_start: event.time_start || '',
        time_end: event.time_end || '',
        policy: event.policy || '',
        description: event.description || '',
        status: event.status || 'available',
        ticket_type: event.ticket_type || [],
        event_cate_id: event.event_cate_id || 1,
        images: event.images || [],
      });

    }
  }, [event]);

  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTicketTypes = [...formData.ticket_type];
    updatedTicketTypes[index] = { ...updatedTicketTypes[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, ticket_type: updatedTicketTypes }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          images: [...(prevData.images || []), file],
          previews: [...(prevData.previews || []), reader.result],
        }));
      };
      reader.readAsDataURL(file); 
    }
  };
  const handleAddTicketType = () => {
    setFormData((prevData) => ({
      ...prevData,
      ticket_type: [...prevData.ticket_type, { name: '', price: '', quantity: '' }],
    }));
  };

  const handleRemoveTicketType = (index) => {
    const updatedTicketTypes = formData.ticket_type.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, ticket_type: updatedTicketTypes }));
  };

  const handleEditorChange = (name, editor) => {
    const newData = editor.getData();

    setFormData((prevData) => ({
      ...prevData,
      [name]: newData,
    }));
  };

  const handleConfirmUpdateEvent = async () => {
    const formDataToSubmit = new FormData();


    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'ticket_type' && key !== 'images') {
        formDataToSubmit.append(key, value);
      }
    });

    formData.ticket_type.forEach((ticketType, index) => {
      formDataToSubmit.append(`ticket_types[${index}][name]`, ticketType.name);
      formDataToSubmit.append(`ticket_types[${index}][price]`, ticketType.price);
      formDataToSubmit.append(`ticket_types[${index}][quantity]`, ticketType.quantity);
    });

    formData.images.forEach((image) => {
      formDataToSubmit.append('images[]', image);
    });

    // formData.images.forEach((image, index) => {
    //   console.log(`Image ${index}:`, image);
    // });

    try {
      const res = await putUpdateEvent(event.id, formDataToSubmit);
      toast.success(res.data.message)
      handleClose();
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg' >
      <Modal.Body>
        <h3>Cập nhật thông tin sự kiện</h3>
        {event ? (
          <Form>
            <div className="form-group">
              <div className="form-control rounded-xl min-h-80 h-auto">
                <label htmlFor="logo-upload">Logo </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="logo-upload"
                />

                {formData.images && formData.images.length > 0 ? (
                  <img
                    src={formData.images[0].image_url}
                    alt="Logo Preview"
                    className="rounded-xl object-cover"
                    style={{ width: '720px', height: '400px' }}
                  />
                ) : (
                  <p>No image available</p>
                )}

             
              </div>
              {/* <div className="form-control rounded-xl min-h-60 h-auto">
                <label>Ảnh bìa sự kiện: </label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
               
              </div> */}
            </div>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tên sự kiện"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCategory">
                <Form.Label>Loại sự kiện</Form.Label>
                <EventCateList handleInputChange={handleInputChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridStatus">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  className={`${formData.status === "available" ? "bg-primary" : "bg-danger"} text-white`}
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="available">Available</option>
                  <option value="expired">Expired</option>
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Địa chỉ"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridTimeStart">
                <Form.Label>Thời gian bắt đầu</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="time_start"
                  value={formData.time_start}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTimeEnd">
                <Form.Label>Thời gian kết thúc</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="time_end"
                  value={formData.time_end}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 edit-policy">
              <Form.Group as={Col} controlId="formGridPolicy">
                <Form.Label>Policy</Form.Label>
                <CKEditor
                  name="policy"
                  editor={ClassicEditor}
                  data={formData.policy || ''}
                  onChange={(event, editor) => handleEditorChange('policy', editor)}
                  config={{
                    toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
                    plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3 edit-desc">
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Thông tin sự kiện</Form.Label>
                <CKEditor
                  name="description"
                  onChange={(event, editor) => handleEditorChange('description', editor)}
                  editor={ClassicEditor}
                  data={formData.description || ''}
                  config={{
                    toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
                    plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
                  }}
                />
              </Form.Group>
            </Row>

            <h5>Loại vé</h5>

            {formData?.ticket_type.map((ticket, index) => (
              <Row key={index} className="mb-3">
                <Form.Group as={Col} controlId={`formGridTicketName${index}`}>
                  <Form.Label>Tên vé</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={ticket.name}
                    onChange={(e) => handleTicketChange(index, e)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId={`formGridTicketPrice${index}`}>
                  <Form.Label>Giá vé</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={ticket.price}
                    onChange={(e) => handleTicketChange(index, e)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId={`formGridTicketPrice${index}`}>
                  <Form.Label>Số lượng vé</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    disabled={true}
                    value={ticket.quantity}
                    onChange={(e) => handleTicketChange(index, e)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId={`formGridTicketPrice${index}`}>
                  <Form.Label>Số vé đã bán</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    disabled={true}
                    value={ticket.quantity_sold}
                    onChange={(e) => handleTicketChange(index, e)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId={`formGridTicketQuantity${index}`}>
                  <Form.Label>Số vé thêm</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    onChange={(e) => handleTicketChange(index, e)}
                  />
                </Form.Group>

                <Form.Group className='mt-auto'>
                  <Button variant="danger" onClick={() => handleRemoveTicketType(index)}>Xóa vé</Button>
                </Form.Group>
              </Row>
            ))}

            <Button variant="secondary" onClick={handleAddTicketType}>Thêm loại vé</Button>


          </Form>
        ) : (
          <p>No event selected.</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirmUpdateEvent}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalUpdateEvent.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  event: PropTypes.object,
};

export default ModalUpdateEvent;
