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
  const [Subtotal, setSubtotal] = useState(0);



  useEffect(() => {
    setLoading(true)

    var carts = [];
    axios
      .get("http://127.0.0.1:8000/cart/" + ReactSession.get("idUser"))
      .then((res) => {
        const data = res.data;
        setCartItems(data);
        carts = data;
        var productsIds = [];


        data.forEach((element) => {
          productsIds.push(element.ProductId);
        });

        var ids = productsIds.join(" "); //create strings from array
        ReactSession.set("ids",ids)

        axios
          .post("http://127.0.0.1:8000/productsByIds", JSON.stringify({ ids }))
          .then((res) => {
            const data = res.data;
            setProds(data);
            var total=0;
            
            carts.forEach((c) => {
                var qt= c.Quantity;
                var price = data[data.findIndex(p=>p.ProductId == c.ProductId)].Price;
                total = total + parseFloat(qt)*parseFloat(price);
            })
            setSubtotal(total)
          });
      });

      setLoading(false)
  }, []);

  const checkOut= () => {



  }

  const deleteCart =(CartId,prodId) =>  {

 axios.delete("http://127.0.0.1:8000/cart/" + CartId)
 .then((res) => {

  setProds(prods.filter(p => p.ProductId !== prodId))


 })

  }
  return (
    <>
      {loading ? (
        <div className="loader">
          <ReactLoading type="cylon" color="gray" height={667} width={400} />
        </div>
      ) : (
        <div>
          <div className="row align-items-center CartHeader">
    
                <button className= "col-6 CartSubtotal" > SUBTOTAL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${Subtotal} </button>
                <button className= "col-6 CartCheckout" onClick={() => checkOut}> PROCEED TO CHECKOUT </button>
              </div>
          {prods.map((currentProd) => {
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
                    onClick={() => deleteCart(cartItems[cartItems.findIndex(p => p.ProductId == currentProd.ProductId)].CartId, currentProd.ProductId)}
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
