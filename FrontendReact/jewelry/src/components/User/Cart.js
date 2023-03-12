import axios from "axios";
import { useState, Navigate, useEffect } from "react";
import React from "react";
import { ReactSession } from "react-client-session";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { MdRemoveShoppingCart } from "react-icons/md";
import { SiCashapp } from "react-icons/si";

const Cart = () => {
  if (ReactSession.get("idUser") === null) {
    window.location.href = "/login";
  }
  const [cartItems, setCartItems] = useState([]);
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = () => {
    setLoading(true);

    var carts = [];
    axios
      .get("http://127.0.0.1:8000/cart/" + ReactSession.get("idUser"))
      .then((res)  => {
        const data = res.data;
        setCartItems(data);
        carts = data;
        var productsIds = [];

        data.forEach((element) => {
          productsIds.push(element.ProductId);
        });

        axios
          .post("http://127.0.0.1:8000/productsByIds", productsIds)
          .then((res) => {
            const data = res.data;
            setProds(data);
            var total = 0;

            carts.forEach((c) => {
              var qt = c.Quantity;
              var price =
                data[data.findIndex((p) => p.ProductId == c.ProductId)].Price;
              total = total + parseFloat(qt) * parseFloat(price);
            });
            setSubtotal(total);
          });
      });

    setLoading(false);
  };

  const DeleteCart = (CartId, prodId) => {
    setLoading(true);
    axios.delete("http://127.0.0.1:8000/cart/" + CartId).then((res) => {
      setCartItems(cartItems.filter((p) => p.ProductId !== prodId));
      setProds(prods.filter((p) => p.ProductId !== prodId));
    });
  };

  const EmptyCart = () => {
    setLoading(true);
    axios
      .delete(
        "http://127.0.0.1:8000/deletecartofuser/" + ReactSession.get("idUser")
      )
      .then((res) => {
        const data = res.data;
        if (data.status === "success") {
          setCartItems([]);
          setProds([]);
        } else {
          console.log(res.status);
        }
      });
    //setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    var total = 0;

    prods.forEach((p) => {
      var price = p.Price;
      var qt =
        cartItems[cartItems.findIndex((c) => c.ProductId == p.ProductId)]
          .Quantity;
      total = total + parseFloat(qt) * parseFloat(price);
    });
    setSubtotal(total);

    setLoading(false);
  }, [prods]);

  const QuantityChange = (NewQuantity, CurrentProduct) => {
    setLoading(true);

    var cart =
      cartItems[
        cartItems.findIndex((p) => p.ProductId == CurrentProduct.ProductId)
      ];
    cart["Quantity"] = NewQuantity;
    axios.put("http://127.0.0.1:8000/cart", cart).then((res) => {
      if (res.data === "success") {
        LoadData();
      }
    });

    console.log('aaaaa',cartItems.length)
  };

  const CheckOut = () => {

    if(prods.length>0)
    {
      ReactSession.set("Subtotal", Subtotal);
      window.location.href = "/paypal";
    }
   

    

  };

  const listQuantities = (currentProductStock, currentProductId) => {
    var qts = []
    for (let i=1;i<=parseInt(currentProductStock) ; i++){

      qts.push(i)

    }

    const currentProductQuantity = cartItems[cartItems.findIndex((p) => p.ProductId == currentProductId )].Quantity;

    
    return qts.map((quantity,index) => {
      if (index == 0) {
        if (String(quantity) !== currentProductQuantity)  {
          return [<option> {currentProductQuantity}</option>, <option> {String(quantity)}</option>];
        }
        else{
          return <option> {currentProductQuantity}</option>
        }
      }
      if (String(quantity) !== currentProductQuantity) {
        return <option> {String(quantity)}</option>;
      }
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
          <div className="row align-items-center CartHeader">
            <button className="col-6 CartEmpty" onClick={() => EmptyCart()}>
              E M P T Y &nbsp; C A R T &nbsp;&nbsp;
              <MdRemoveShoppingCart size={25} />
            </button>
            <button className="col-6 CartCheckout" disabled={prods.length == 0}   onClick={() => CheckOut()}>
              P R O C E E D &nbsp;  T O &nbsp; C H E C K O U T <SiCashapp size={25} />
            </button>
          </div>
          <div className="row align-items-center CartSubtotal">
            <button className="col-12 CartSubtotal">
              S U B T O T A L &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $ {Subtotal}
            </button>
          </div>
          {prods.map((currentProd) => {
            return (
              <>
                <div className="row CartCard align-items-center">
                  <img
                    className="col-1 col-sm-1 col-md-3 col-lg-4 col-xl-4 CartImage"
                    alt="product"
                    src={currentProd.Image}
                  />

                  <div className="col-6  col-sm-6 col-md-3 col-lg-4 col-xl-4 ">
                    <h3 className="CartTitle">{currentProd.Title}</h3>

                    <h3 className="CartPrice">{currentProd.Price}$</h3>

                    <h3 className="CartQuantity">
                      Quantity &nbsp;
                      <select
                        onChange={(e) =>
                          QuantityChange(e.target.value, currentProd)
                        }
                      >
                        
                        {listQuantities(currentProd.Stock, currentProd.ProductId)}
                      </select>
                    </h3>
                  </div>

                  <div className="CartIconsDiv col-xs-4 col-lg-4 col-md-4  col-xl-4 col-sm-4 ">
                    <RiDeleteBin3Fill
                      onClick={() =>
                        DeleteCart(
                          cartItems[
                            cartItems.findIndex(
                              (p) => p.ProductId == currentProd.ProductId
                            )
                          ].CartId,
                          currentProd.ProductId
                        )
                      }
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
      {prods.length == 0 && (
        <div className="EmptyCart">C A R T &nbsp;&nbsp; E M P T Y </div>
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
export default Cart;
