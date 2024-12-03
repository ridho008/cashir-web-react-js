import { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import api from "../utils/contants";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

function Icon({ nama }) {
  switch (nama) {
    case "Makanan":
      return <FontAwesomeIcon icon={faUtensils} />;
    case "Minuman":
      return <FontAwesomeIcon icon={faCoffee} />;
    case "Cemilan":
      return <FontAwesomeIcon icon={faCheese} />;
    default:
      return <FontAwesomeIcon icon={faUtensils} />;
  }
}

export default function ListCategoriesComponent({
  ChangeClickCategory,
  categoriesNow,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Col md={2} mt="2">
        <h6>
          <strong>List Categories</strong>
        </h6>
        <hr />

        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => ChangeClickCategory(category.nama)}
                className={categoriesNow == category.nama && "active"}
                style={{ cursor: "pointer" }}
              >
                <Icon nama={category.nama} /> {category.nama}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    </>
  );
}
