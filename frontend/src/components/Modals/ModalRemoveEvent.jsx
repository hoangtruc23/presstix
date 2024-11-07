import { Button, Modal } from 'react-bootstrap';
import { deleteEvent } from '../../services/Admin/apiServiceAdmin';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'

function ModalRemoveEvent(props) {
  const { show, setShow, event,handleDeleteEvent } = props;

  const handleClose = () => {
    setShow(!show);
  }
  
  const fetchRemoveEvent = async () => {
    const res = await deleteEvent(event.id);
    if (res.data.status === 'success') {
      toast.success(res.data.message);
      handleDeleteEvent();
    } else {
      toast.warning(res.data.message);
    }
  }

  const handleRemove = () => {
    fetchRemoveEvent();
    handleClose();
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <h3> Bạn có chắc muốn xoá sự kiện này không ?</h3>
        <p>{event.name}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Huỷ
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalRemoveEvent.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  event: PropTypes.array,
  handleDeleteEvent: PropTypes.func,
}


export default ModalRemoveEvent