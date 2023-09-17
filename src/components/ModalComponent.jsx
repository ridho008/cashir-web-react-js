import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ModalComponent = ({
  showModal,
  handleClose,
  basketDetail,
  count,
  description,
  handleLessButton,
  handleAddButton,
  handleChangeDescription,
  handleSubmit,
  totalPrice,
  handleDelete,
}) => {
  return (
    <>
      {basketDetail ? (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {basketDetail.product.nama}
              {" Rp."}
              {numberWithCommas(basketDetail.product.harga)}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Total Payment</Form.Label>
                <p>{numberWithCommas(totalPrice)}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Amount</Form.Label>
                <br />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleLessButton()}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <strong style={{ margin: "0px 10px" }}>{count}</strong>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddButton()}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="example: spicy, a little rice"
                  name="description"
                  value={description}
                  onChange={(e) => handleChangeDescription(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => handleDelete(basketDetail.id)}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete Order
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default ModalComponent;
