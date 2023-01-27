import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { ReactSession } from "react-client-session";

const SelectedProd = () => {
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/product/" + ReactSession.get("SelectedProductId")
      )
      .then((res) => {
        setProduct(res.data);
        console.log("result : ", res.data);
      });
  }, []);

  return (
    <div className="row SelectedProductCard">
      <img className="col-xl-6 col-md-12 col-xs-12 selectedProdImage" alt="y" src={Product.Image} />
      <div className="col-6">
        <h1 className="ProductDetails" >{Product.Title}</h1>
        <br />
        <h4 className="ProductDetails">{Product.Description}</h4>
        <br />
        <h4 className="ProductDetails">{Product.Price}$</h4>
        <br />
        <br />
        <button className="btn btn-warning"> Add to cart</button>
      </div>
     
    </div>
  );
};

export default SelectedProd;
