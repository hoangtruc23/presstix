import PropTypes from 'prop-types'
import { Button, Modal, Col, Form, Row } from 'react-bootstrap';

function ModalUpdateEvent(props) {
  const { show, setShow, event } = props;
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Body>
        <h3>Cập nhật thông tin sự kiện</h3>
        {event ? (
          <Form>
            <Row className="mb-3 gap-3 justify-center">
              <Form.Group className='w-[30%]'>
                <Form.Label>Thumbnail</Form.Label>
                <div className="w-full min-h-52 bg-slate-400"></div>
                <Form.Control type="file" />
              </Form.Group>
              <Form.Group className='w-[60%]'>
                <Form.Label>Banner</Form.Label>
                <div className="w-full min-h-52 bg-slate-400"></div>
                <Form.Control type="file" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Tên</Form.Label>
                <Form.Control type="text" defaultValue={event.name} placehoder={event.name} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCategory">
                <Form.Label className='w-full'>Loại sự kiện</Form.Label>
                <Form.Select className='form-select p-2 rounded-2xl bg-primary text-white'>
                  <option value="active" selected={event.status === "active"}>Active</option>
                  <option value="expired" selected={event.status === "expired"}>Expired</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridTimeStart">
                <Form.Label>Thời gian bắt đầu</Form.Label>
                <Form.Control type="datetime-local" defaultValue={event.time_start} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTimeEnd">
                <Form.Label>Thời gian kết thúc</Form.Label>
                <Form.Control type="datetime-local" defaultValue={event.time_end} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSlot">
                <Form.Label>Chỗ</Form.Label>
                <Form.Control type="number" defaultValue={event.slot} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridStatus">
                <Form.Label className='w-full'>Trạng thái</Form.Label>
                <Form.Select className='form-select p-2 rounded-2xl bg-primary text-white'>
                  <option value="active" selected={event.status === "active"}>Active</option>
                  <option value="expired" selected={event.status === "expired"}>Expired</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridCheckbox">
              <Form.Check type="checkbox" label="I agree to the terms" />
            </Form.Group>
          </Form>
        ) : (
          <p>No event selected.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalUpdateEvent.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  event: PropTypes.array,
}


export default ModalUpdateEvent;
