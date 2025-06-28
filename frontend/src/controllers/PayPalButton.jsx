// eslint-disable-next-line no-unused-vars
import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// eslint-disable-next-line react/prop-types
const PayPalButton = ({amount,onSuccess, onError}) => {
  return (
    <PayPalScriptProvider
    options={{ "client-id":import.meta.env.VITE_PAYPAL_CLIENT_ID ,}}>
    <PayPalButtons style={{ layout: "vertical" }}
    createOrder={(data, actions) =>
    {
        return actions.order.create({
            purchase_units: [{amount: {value: parseFloat(amount).toFixed(2)}}]
        })
    }}
onApprove={(data, actions) => {
    console.log("🟡 Paiement approuvé, capture en cours..."); // TEST

  return actions.order.capture().then((details) => {
          console.log("✅ Paiement réussi :", details); 

    onSuccess(details); // Appelle bien avec les détails
  });
}}

    onError={onError}
    />
</PayPalScriptProvider>
  )
}

export default PayPalButton
