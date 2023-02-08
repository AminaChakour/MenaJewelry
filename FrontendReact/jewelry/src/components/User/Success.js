import axios from "axios";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { ReactSession } from "react-client-session";
import ReactLoading from "react-loading";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const Success = () => {
  if (ReactSession.get("Paid") !== true) {
    window.location.href = "/home";
  }
  const [cartItems, setCartItems] = useState([]);
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderNumber, setOrderNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [fullName, setFullName] = useState("");
  const form = useRef();

  useEffect(() => {
    setFullName(ReactSession.get("fullname"));
    setOrderTotal(ReactSession.get("Total"));
    setPurchaseDate(new Date().toLocaleString().replace(",", ""));
    const dt = new Date().toLocaleString().replace(",", "");
    setOrderNumber(
      "KAI-" +
        ReactSession.get("fullname")[0] +
        ReactSession.get("fullname")[1] +
        "-" +
        dt.replace("/", "-").replace("/", "-").replace(" ", "-")
    );
    setUserEmail(ReactSession.get("userEmail"));
  }, []);

  useEffect(() => {
    //document.getElementById("btnSubmit").click();
    //reactsession true
  }, [userEmail]);

  useEffect(() => {
    prods.forEach((prod) => {});
  }, [prods]);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_pqtli1n", //service id
        "template_ot7qkde", //template id
        form.current, //form data
        "1TgayAGfGkg-j8WHL" //key
      )
      .then(
        (result) => {
          console.log(result.text);




          LoadData();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const LoadData = () => {
    axios
      .get("http://127.0.0.1:8000/cart/" + ReactSession.get("idUser"))
      .then((res) => {
        const data = res.data;
        setCartItems(data);
        var productsIds = [];

        data.forEach((element) => {
          productsIds.push(element.ProductId);
        });

        var ids = productsIds.join(" "); //create strings from array
        ReactSession.set("ids", ids);

        axios
          .post("http://127.0.0.1:8000/productsByIds", JSON.stringify({ ids }))
          .then((res) => {
            const data = res.data;
            setProds(data);
          });
      });
  };

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
        <form name="myForm" ref={form} onSubmit={sendEmail}>
          <input type="hidden" value={userEmail} name="toEmail" />
          <input type="hidden" value={fullName} name="fullName" />
          <input type="hidden" value={orderTotal} name="orderTotal" />
          <input type="hidden" value={orderNumber} name="orderNumber" />
          <input type="submit" className="btnSubmit" id="btnSubmit" />
        </form>


        
        <h3> Email sent successfully, check orders for order details. Thank you.</h3>
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
export default Success;
