import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

const SelectedProd = () => {
  const [Product, setProduct] = useState([]);
  const [Quantity,setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/product/" + ReactSession.get("SelectedProductId")
      )
      .then((res) => {
        setProduct(res.data);
        console.log(res.data)
        console.log( ReactSession.get("SelectedProductId"))
  
      });
  }, []);

  function addToCart(ProductId) {
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
          Quantity
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
  }

  return (
    <div className="row SelectedProductCard">
      <img
        className="col-xl-6 col-md-12 col-xs-12 selectedProdImage"
        alt="y"
        src={Product.Image}
      />
      <div className="col-6">
        <h1 className="ProductDetails">{Product.Title}</h1>
        <br />
        <h4 className="ProductDetails">{Product.Description}</h4>
        <br />
        <h4 className="ProductDetails">{Product.Price}$</h4>
        <br />
        <h4> Quantity</h4>
        <select onChange={(e)=>setQuantity(e.target.value)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <br />
        <button
          onClick={() => {
            addToCart(Product.ProductId);
          }}
          className="btn btn-warning"
        >
          ADD TO CART
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default SelectedProd;
