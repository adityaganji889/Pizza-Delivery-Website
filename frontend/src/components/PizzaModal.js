import { Button, Modal } from 'react-bootstrap'

function PizzaModal(props) {
  const {pizza, modalShow, setModalShow} = props
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={modalShow} onHide={()=>setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='d-flex justify-content-center'>
          <img src={pizza.image} alt="img" className='wh-300'/>
          </div>
          <p>{pizza.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={()=>setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PizzaModal;