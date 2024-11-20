import PropTypes from 'prop-types';
import { Button, Modal, Col, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import './modal.scss'
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
    event_cate_id: 1,
    images: [],
  });

  console.log({ event });

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
        ticket_types: event.ticket_types || [],
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
    const updatedTicketTypes = [...formData.ticket_types];
    updatedTicketTypes[index] = { ...updatedTicketTypes[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, ticket_types: updatedTicketTypes }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          images: [reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTicketType = () => {
    setFormData((prevData) => ({
      ...prevData,
      ticket_types: [...prevData.ticket_types, { name: '', price: '', quantity: '' }],
    }));
  };

  const handleRemoveTicketType = (index) => {
    const updatedTicketTypes = formData.ticket_types.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, ticket_types: updatedTicketTypes }));
  };

  const handleEditorChange = (name, editor) => {
    const newData = editor.getData();  // Lấy dữ liệu từ CKEditor
    console.log(`${name} đã thay đổi:`, newData); // In ra console để kiểm tra giá trị mới

    setFormData((prevData) => ({
      ...prevData,
      [name]: newData,  // Cập nhật đúng trường tương ứng với name
    }));
  };

  const handleConfirm = () => {
    const formDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'ticket_types' && key !== 'images') {
        formDataToSubmit.append(key, value);
      }
    });

    formDataToSubmit.append('ticket_types', JSON.stringify(formData.ticket_types));


    formData.images.forEach((image) => {
      formDataToSubmit.append('images[]', image);
    });

    for (let [key, value] of formDataToSubmit.entries()) {
      console.log(key, value);
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
              <Form.Group as={Col} controlId="formGridStatus">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="available">Available</option>
                  <option value="expired">Expired</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCategory">
                <Form.Label>Loại sự kiện</Form.Label>
                <Form.Control
                  as="select"
                  name="event_cate_id"
                  value={formData.event_cate_id}
                  onChange={handleInputChange}
                >
                  <option value="1">Category 1</option>
                  <option value="2">Category 2</option>
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

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPolicy">
                <Form.Label>Policy</Form.Label>
                <CKEditor
                  name="policy"
                  onChange={(event, editor) => handleEditorChange('policy', editor)}
                  editor={ClassicEditor}
                  config={{
                    toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
                    plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
                    initialData: formData.policy,
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Thông tin sự kiện</Form.Label>
                <CKEditor
                  name="description"
                  onChange={(event, editor) => handleEditorChange('description', editor)}
                  editor={ClassicEditor}
                  config={{
                    toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
                    plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
                    initialData: formData.description,
                  }}
                />
              </Form.Group>
            </Row>

            <h5>Loại vé</h5>

            {/* {event?.ticket_type.map((ticket, index) => (
              <Row key={index} className="mb-3">
                <Form.Group as={Col} controlId={`formGridTicketName${index}`}>
                  <Form.Label>Tên vé</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={ticket.name}
                    onChange={(e) => handleTicketChange(index, e)}  // Gọi hàm cập nhật
                  />
                </Form.Group>
                <Form.Group as={Col} controlId={`formGridTicketPrice${index}`}>
                  <Form.Label>Giá vé</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={ticket.price}
                    onChange={(e) => handleTicketChange(index, e)}  // Gọi hàm cập nhật
                  />
                </Form.Group>
                <Form.Group as={Col} controlId={`formGridTicketQuantity${index}`}>
                  <Form.Label>Số lượng</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={ticket.quantity}
                    onChange={(e) => handleTicketChange(index, e)}  // Gọi hàm cập nhật
                  />
                </Form.Group>
                <Button variant="danger" onClick={() => handleRemoveTicketType(index)}>Xóa vé</Button>
              </Row>
            ))} */}

            <Button variant="secondary" onClick={handleAddTicketType}>Thêm loại vé</Button>


          </Form>
        ) : (
          <p>No event selected.</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
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
