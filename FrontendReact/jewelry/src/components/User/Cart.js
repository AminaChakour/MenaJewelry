import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { ReactSession } from "react-client-session";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import { RiDeleteBin3Fill } from "react-icons/ri";


const Cart = () => {
  if (ReactSession.get("idUser") === null) {
    window.location.href = "/login";
  }
  const [cartItems, setCartItems] = useState([]);
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://127.0.0.1:8000/cart/" + ReactSession.get("idUser"))
      .then((res) => {
        const data = res.data;
        setCartItems(data);
        console.log('items',data)
        var productsIds = [];


        data.forEach((element) => {
          productsIds.push(element.ProductId);
        });

        var ids = productsIds.join(" "); //create strings from array
        ReactSession.set("ids",ids)

        axios
          .post("http://127.0.0.1:8000/productsByIds", JSON.stringify({ ids }))
          .then((res) => {
            setProds(res.data);
            console.log('prods',res.data)
          });
      });

      setLoading(false)
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader">
          <ReactLoading type="cylon" color="gray" height={667} width={400} />
        </div>
      ) : (
        <div>
          {prods.map((currentProd, index) => {
            return (
              <>
                <div className="row CartCard align-items-center">
                  <img
                    className="d-none d-md-block col-md-3 col-lg-4 col-xl-4 col-sm-1 CartImage"
                    alt="image"
                    src={currentProd.Image}
                  />

                  <div className="col-xs-6 col-lg-4 col-md-3  col-xl-4 col-sm-6 ">
                    <h3 className="CartTitle">{currentProd.Title}</h3>

                    <h3 className="CartPrice">{currentProd.Price}$</h3>

                    <h3 className="CartQuantity">
                      Quantity &nbsp;
                      <select>
                        {console.log(String(currentProd.ProductId))}
                        <option>{cartItems[cartItems.findIndex(p => p.ProductId == currentProd.ProductId)].Quantity}</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </h3>
                  </div>

                  <div className="CartIconsDiv col-xs-4 col-lg-4 col-md-4  col-xl-4 col-sm-4 ">
                    <RiDeleteBin3Fill
                      size={50}
                      color="gray"
                      className="CartIcons"
                    />
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
    </>
  );
};
export default Cart;
