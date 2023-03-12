import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";
import ReactLoading from "react-loading";

const SelectedProd = () => {
  const [Product, setProduct] = useState([]);
  const [Quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "http://127.0.0.1:8000/product/" + ReactSession.get("SelectedProductId")
      )
      .then((res) => {
        setProduct(res.data);
      });

    setLoading(false);
  }, []);

  function addToCart(ProductId) {
    setLoading(true);
    const UserId = ReactSession.get("idUser");
    if (UserId === null) {
      window.location.href = "/login";
    }
    axios
      .post(
        "http://127.0.0.1:8000/cart",
        JSON.stringify({
          UserId,
          ProductId,
          Quantity,
        })
      )
      .then((res) => {
        const data = res.data;

        if (data.status === "success") {
          Swal.fire({
            title: "Success",
            text: "Item added to cart !",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } else if (data.status === "error") {
          Swal.fire({
            title: "Error !",
            text: "Try again",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });

    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <div className="loader">
          <ReactLoading type="cylon" color="#EADDCA" height={667} width={400} />
        </div>
      ) : (
        <div className="row SelectedProductCard">
          <img
            className="col-12 col-md-6 col-xl-6 col-lg-6 selectedProdImage"
            alt="y"
            src={Product.Image}
          />
          <div className="col-12 col-xl-6 col-lg-6 col-md-6">
            <div className="row">
              <h1
                style={{ textAlign: "center", color: "gray" }}
                className="col-12 ProductDetails"
              >
                {Product.Title}
              </h1>
            </div>
            <br />
            <h4 className="ProductDetails">
              Description : {Product.Description}
            </h4>
            <br />
            <h4 className="ProductDetails">-- {Product.Category} --</h4>
            <br />
            <div className="row">
              <h4 className="col-2 QuantityDetailsStyle">Quantity </h4>
              <select
                className="col-2"
                onChange={(e) => setQuantity(e.target.value)}
              >
               
                
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <br />
            <h4 className="ProductDetails">{Product.Price}$</h4>
            <br />
            {Product.Stock === "0" && (
              <h4 className="OutOfStock">OUT OF STOCK</h4>
            )}
            <br />

            {Product.Stock !== "0" && (
              <button
                onClick={() => {
                  addToCart(Product.ProductId);
                }}
                className="btnAddToCart"
              >
                ADD TO CART
              </button>
            )}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
    </>
  );
};

export default SelectedProd;
