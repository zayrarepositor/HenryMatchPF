//======PAQUETES Y LIBRERIAS

import React from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//======IMPORTACIONES DE COMPONENTES
//======IMPORTACIONES DE FUNCIONES NUESTRAS
//======ESTILO E IMAGENES
import creditCard from "./tarjeta.jpg";

//STRIPE CLAVE PUBLICABLE pk_test_51LHnyuJ7NqOhO9cbrpQWMKYKfkW09dgZGHXXmjGudts20yyqA4vyDxHz3bufSWmUkTHvtGeIfII2LfR1DJpuumId00oxxCoyhE;
/*
NUMERO TARJETA DE PRUEBA 
4242 4242 4242 4242 
4000056655665556
5555555555554444
fecha futura: 12/34
cualquier CVC de tres dígitos (cuatro dígitos si usas una tarjeta American Express)
cualquier valor para los demás campos del formulario.
*/
const stripePromise = loadStripe(
  "pk_test_51LHnyuJ7NqOhO9cbrpQWMKYKfkW09dgZGHXXmjGudts20yyqA4vyDxHz3bufSWmUkTHvtGeIfII2LfR1DJpuumId00oxxCoyhE"
);

const Form = () => {
  const stripe = useStripe();

  const elements = useElements();

  const handleSubmit = async (e, paymentMethod) => {
    e.preventDefault();
    await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <img src={creditCard} /> <CardElement />
      <button>QUIERO!</button>
    </form>
  );
};

const CheckoutForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <Form />
    </Elements>
  );
};

export default CheckoutForm;
