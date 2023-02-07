import axios from "axios";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { ReactSession } from "react-client-session";
import ReactLoading from "react-loading";
import emailjs from "emailjs-com";

const Success = () => {
  if (ReactSession.get("Paid") !== true) {
    window.location.href = "/home";
  }
  const [cartItems, setCartItems] = useState([]);
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useremail, setUserEmail] = useState('');
  const form = useRef();

  useEffect(() => {

    setUserEmail('amina.chakour@hotmail.com')
    // LoadData()
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_pqtli1n",
        "template_ot7qkde",
        form.current,
        "1TgayAGfGkg-j8WHL"
      )
      .then(
        (result) => {
          console.log(result.text);
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
        <form ref={form} onSubmit={sendEmail}>
          <input type="email" value={useremail} name="toEmail" />
          <input type="submit" value="Receive order confirmation by email" />
        </form>
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
