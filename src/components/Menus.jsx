import { Card, Col, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

export default function Menus({ menu, inputBasket }) {
  return (
    <>
      <Col md={4} xs={6} className="mb-4">
        <Card onClick={() => inputBasket(menu)}>
          <Card.Img
            variant="top"
            src={
              "images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar
            }
          />
          <Card.Body>
            <Badge>
              <span>{menu.kode}</span>
            </Badge>
            <Card.Title>{menu.nama}</Card.Title>
            <Card.Text>{numberWithCommas(menu.harga)}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
