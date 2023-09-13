import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalPayment from "./TotalPayment";

export default function ResultListCategoriesComponent({ baskets }) {
  return (
    <>
      <Col md={3} mt="2">
        <h4>
          <strong>Result</strong>
        </h4>
        <hr />
        <ListGroup variant="flush">
          {baskets.map((basket) => (
            <ListGroup.Item key={basket.product.id}>
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
        </ListGroup>

        <TotalPayment baskets={baskets} />
      </Col>
    </>
  );
}
