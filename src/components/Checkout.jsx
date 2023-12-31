import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const useProgressCxt = useContext(UserProgressContext);

  const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCloseCheckout() {
    useProgressCxt.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fb = new FormData(event.target);
    const customerData = Object.fromEntries(fb.entries());
    // console.log(customerData);
    async function fetchOrder() {
      await fetch("http://localhost:3000/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: { items: cartCtx.items, customer: customerData },
        }),
      });
    }
    fetchOrder();
    cartCtx.clearAll();
    useProgressCxt.showConfirmationPage();
  }

  return (
    <Modal open={useProgressCxt.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(totalPrice)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Steet" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
