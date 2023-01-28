import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";



const SelectedProd = () => {
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/product/" + ReactSession.get("SelectedProductId")
      )
      .then((res) => {
        setProduct(res.data);
        console.log("result : ", res.data);
      });
  }, []);

  function addToCart(ProductId){

    
    const Quantity = "1"
    const UserId = ReactSession.get("idUser");
    if ( UserId === null)
    {
      window.location.href = "/login"
    }
    axios
    .post(
      "http://127.0.0.1:8000/cart" ,
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

       
      } else if (data.status === "error") 
      {
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
      <img className="col-xl-6 col-md-12 col-xs-12 selectedProdImage" alt="y" src={Product.Image} />
      <div className="col-6">
        <h1 className="ProductDetails" >{Product.Title}</h1>
        <br />
        <h4 className="ProductDetails">{Product.Description}</h4>
        <br />
        <h4 className="ProductDetails">{Product.Price}$</h4>
        <br />
        <br />
        <button onClick={()=> {addToCart(Product.ProductId)}} className="btn btn-warning"> ADD TO CART</button>
      </div>
     
    </div>
  );
};

export default SelectedProd;
