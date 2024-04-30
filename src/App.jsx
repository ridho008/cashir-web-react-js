import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavbarComponent from "./components/NavbarComponent";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";
import ResultListCategoriesComponent from "./components/ResultListCategoriesComponent";
import ListCategoriesComponent from "./components/ListCategoriesComponent";
import api from "./utils/contants";
import Menus from "./components/Menus";
import swal from "sweetalert";
import axios from "axios";

export default function App() {
  let [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState(["Makanan"]);
  const [baskets, setBasket] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        const response = await api.get(
          "/products?category.nama=" + categories,
          {
            signal: controller.signal,
          }
        );
        setMenus(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();

    const fetchAllBaskets = async () => {
      try {
        const response = await api.get("/keranjangs", {
          signal: controller.signal,
        });
        console.log(setBasket(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBaskets();

    return () => controller.abort();
  }, []);

  function ChangeClickCategory(value) {
    setCategories(value);
    const fetchByCategory = async () => {
      try {
        const response = await api.get("/products?category.nama=" + value);
        setMenus(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchByCategory();
  }

  function inputBasket(value) {
    // console.log("Menu ", value);

    // cek apakah product sudah ada dikeranjang ?
    const getByProductID = async () => {
      try {
        const response = await api.get("/keranjangs?product.id=" + value.id);
        if (response.data.length == 0) {
          // jika product belum ada dikeranjang
          const addBasket = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          const postBasket = async () => {
            try {
              const response = await api.post("/keranjangs", addBasket);
              swal({
                title: "Success",
                text: "Item in Basket " + addBasket.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            } catch (err) {
              console.log(err);
            }
          };
          postBasket();
        } else {
          // jika product ada update product tersebut
          const addBasket = {
            jumlah: response.data[0].jumlah + 1,
            total_harga: response.data[0].total_harga + value.harga,
            product: value,
          };

          const putBasket = async () => {
            try {
              await api.put("/keranjangs/" + response.data[0].id, addBasket);
              swal({
                title: "Success",
                text: "Item in Basket " + addBasket.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            } catch (err) {
              console.log(err);
            }
          };
          putBasket();
        }
      } catch (err) {
        console.log(err);
      }
    };
    getByProductID();
  }

  if (!menus) return <div style={{ color: "black" }}>Data is not found</div>;
  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <Row>
          <ListCategoriesComponent
            ChangeClickCategory={ChangeClickCategory}
            categoriesNow={categories}
          />
          <Col>
            <h4 className="mt-4">
              <strong>List Products</strong>
            </h4>
            <hr />
            <Row>
              {menus.map((menu) => (
                <Menus key={menu.id} menu={menu} inputBasket={inputBasket} />
              ))}
            </Row>
            <Row className="mb-4">
              <Col md={{ offset: 9 }}>total searches : {menus.length}</Col>
            </Row>
          </Col>
          <ResultListCategoriesComponent baskets={baskets} />
        </Row>
      </Container>
    </>
  );
}

// import React from "react";
// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider, Swicth } from "react-router-dom";
// import "./index.css";
// import NavbarComponent from "./components/NavbarComponent";
// import { Home, Success } from "./views";

// const App = () => {
//   return (
//     <createBrowserRouter>
//       <NavbarComponent />
//       <main>
//         <Swicth>
//           <Route path="/" component={Home} />
//         </Swicth>
//       </main>
//     </createBrowserRouter>
//   );
// };

// export default App;
