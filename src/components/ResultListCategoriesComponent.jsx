import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalPayment from "./TotalPayment";
import { useState } from "react";
import ModalComponent from "./ModalComponent";
import api from "../utils/contants";
import { useEffect } from "react";

export default function ResultListCategoriesComponent({ baskets }) {
  const [showModal, setShowModal] = useState(false);
  const [basketDetail, setBasketDetail] = useState(false);
  const [count, setCount] = useState(0); // jumlah
  const [description, setDescription] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const handleClose = () => setShowModal(false);

  const handleShow = (basket) => {
    setShowModal(true);
    setBasketDetail(basket);
    setCount(basket.jumlah);
    setDescription(basket.description);
    setTotalPrice(basket.total_harga);
  };

  function handleAddButton() {
    setCount((prev) => prev + 1);
    setTotalPrice(basketDetail.product.harga * (count + 1));
  }

  function handleLessButton() {
    if (count !== 1) {
      setCount((prev) => prev - 1);
      setTotalPrice(basketDetail.product.harga * (count - 1));
    }
  }

  function handleChangeDescription(description) {
    setDescription(description);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // menutup modal otomatis
    handleClose();

    const data = {
      jumlah: count,
      total_harga: totalPrice,
      product: basketDetail.product,
      keterangan: description,
    };

    const postBasket = async () => {
      try {
        const response = await api.put("/keranjangs/" + basketDetail.id, data);
        swal({
          title: "Updated Success",
          text: "Update Item in Basket " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1000,
        });
      } catch (err) {
        console.log(err);
      }
    };
    postBasket();
  }

  function handleDelete(id) {
    // menutup modal otomatis
    handleClose();

    const deleteBasket = async () => {
      try {
        const response = await api.delete("/keranjangs/" + id);
        swal({
          title: "Deleted Order",
          text: "Delete Item in Basket " + basketDetail.product.nama,
          icon: "success",
          button: false,
          timer: 1000,
        });
      } catch (err) {
        console.log(err);
      }
    };
    deleteBasket();
  }

  return (
    <>
      <Col md={3} mt="2">
        <h4>
          <strong>Result</strong>
        </h4>
        <hr />
        <ListGroup variant="flush">
          {baskets.map((basket) => (
            <ListGroup.Item
              key={basket.product.id}
              onClick={() => handleShow(basket)}
            >
              <Row>
                <Col xs={2}>
                  <Badge pill bg="info">
                    {basket.jumlah}
                  </Badge>
                </Col>
                <Col>
                  <h5>{basket.product.nama}</h5>
                  <span>{numberWithCommas(basket.product.harga)}</span>
                </Col>
                <Col>
                  <strong className="float-right">
                    Rp.{numberWithCommas(basket.total_harga)}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}

          <ModalComponent
            handleClose={handleClose}
            showModal={showModal}
            basketDetail={basketDetail}
            count={count}
            description={description}
            handleLessButton={handleLessButton}
            handleAddButton={handleAddButton}
            handleSubmit={handleSubmit}
            handleChangeDescription={handleChangeDescription}
            totalPrice={totalPrice}
            handleDelete={handleDelete}
          />
        </ListGroup>

        <TotalPayment baskets={baskets} />
      </Col>
    </>
  );
}
