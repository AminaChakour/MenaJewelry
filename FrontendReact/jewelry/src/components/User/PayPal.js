import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import axios from "axios";
import React from "react";
import { ReactSession } from "react-client-session";


const PayPal = () => {
  if (ReactSession.get("userEmail") == null) {
    window.location.href = "/login";
  }

  const initialOptions = {
    "client-id":
      "AfCvbSQAq2fL3w1SdaDamPswUmyFawQTwFcZGLxU22p6ndEVPVHyEXqP1d7TopBEP6kylNP6F822UJ-i", //   from sandbox paypal
    currency: "CAD",
    intent: "capture",
  };

 
  const Subtotal = ReactSession.get("Subtotal");



  const taxes = 1.15
  const prixTotal = (parseFloat(Subtotal) * taxes)
    .toFixed(2) //round
    .toString();



  const ButtonWrapper = () => {

    return (
      <PayPalButtons
        className="paypalDiv"
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "CAD",
                  value: parseFloat(prixTotal),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            
            ReactSession.set('Total',prixTotal)
            ReactSession.set('Paid',true)
            window.location.href= '/success';
            
          });
        }}
      />
    );
  };

  return (
    <>
      <div>
        <br />
        <br />

        <PayPalScriptProvider options={initialOptions}>
          <ButtonWrapper />
        </PayPalScriptProvider>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default PayPal;