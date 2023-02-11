import axios from "axios";
import { useState, Navigate, useEffect } from "react";
import React from "react";
import { ReactSession } from "react-client-session";
import ReactLoading from "react-loading";



const SelectedOrder = () => {
  if (ReactSession.get("idUser") === null) {
    window.location.href = "/login";
  }

  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    setLoading(true);

    axios.get("http://127.0.0.1:8000/GetOrderById/"+ ReactSession.get("SelectedOrderId")).then((res) => {
        const data = res.data;
        setTotal(data.Total)
        setPurchaseDate(data.PurchaseDate)

  })


    axios
      .get(
        "http://127.0.0.1:8000/orderDetails/" +
          ReactSession.get("SelectedOrderId")
      )
      .then((res) => {
        const data = res.data;
        setProds(data);
      });

    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader">
          <ReactLoading
            className="loader"
            type="cylon"
            color="#EADDCA"
            height={667}
            width={400}
          />
        </div>
      ) : (
        <div>
          <div className="row align-items-center CartSubtotal">
            <button className="col-12 CartSubtotal">
             {purchaseDate}   <br/>  TOTAL &nbsp; ${total}   
            </button>
          </div>
          {prods.map((currentProd) => {
            return (
              <>
                <div className="row OrderDetailsCard">
                  <img
                    className="col-1 col-sm-1 col-md-3 col-lg-4 col-xl-4  OrderDetailsImage"
                    alt="product"
                    src={currentProd.Image}
                  />

                  <div className="col-6 col-sm-6 col-md-6 col-lg-6  col-xl-6  ">
                    <h3 className="OrderDetailsTitle">{currentProd.Title}</h3>
                    <h3 className="OrderDetailsQuantity">Qty {currentProd.Quantity}</h3>
                  </div>

                  <div className="col-1 col-sm-1 col-md-1 col-lg-2  col-xl-2 ">
                    <h3 className="OrderDetailsPrice">{currentProd.Price}$</h3>
                  </div>

                  
                </div>
              </>
            );
          })}
        </div>
      )}


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
    </>
  );
};
export default SelectedOrder;
