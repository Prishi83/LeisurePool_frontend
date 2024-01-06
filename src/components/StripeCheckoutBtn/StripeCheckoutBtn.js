import axios from "axios";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default function StripeCheckoutBtn({ price }) {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51ImNMTEbgMWPOZuDBKgn8oGOczxcP6YWHc8m1aErRn9pU0ChuB0dWTb0552agawPeGgqVfjoN4AUylZHrYPAu58B00R2q0UhhI";

  const onToken = (token) => {
    axios({
      url: "http://localhost:4242/payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
      },
    })
      .then((response) => {
        alert("succesful payment");
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
        alert(
          "There was an issue with your payment! Please make sure you use the provided credit card."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Leisurpool"
      image="https://i.ibb.co/F71gfCk/logo.jpg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}
