import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import api from "../utils/contants";
import { useEffect } from "react";

const TotalPayment = ({ baskets }) => {
  function submitTotalPayment(sum) {
    const order = {
      total_bayar: sum,
      menus: baskets,
    };

    const inputAllBasketsOrder = async () => {
      try {
        const response = await api.post("/pesanans", order);
        swal({
          title: "Order Processed",
          text: "Terima Kasih",
          icon: "success",
          button: false,
        });
      } catch (err) {
        console.log(err);
      }
    };
    inputAllBasketsOrder();

    const deleteAllBaskets = async () => {
      try {
        const response = await api.get("/keranjangs");
        const basket = response.data;
        basket.map((item) => {
          try {
            api.delete("/keranjangs/" + item.id);
          } catch (error) {
            console.log(error.message);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    deleteAllBaskets();
  }

  // menghitung total semua product
  const sum = baskets.reduce(
    (prevValue, currentValue) => prevValue + currentValue.total_harga,
    0
  );

  return (
    <div style={{ margin: "auto" }}>
      <h6>
        Total Payment : <strong> Rp.{numberWithCommas(sum)}</strong>
      </h6>
      <div className="d-grid gap-2">
        <Button
          variant="primary"
          size="md"
          onClick={() => submitTotalPayment(sum)}
        >
          <FontAwesomeIcon icon={faShoppingCart} /> Pay
        </Button>
      </div>
    </div>
  );
};

export default TotalPayment;
