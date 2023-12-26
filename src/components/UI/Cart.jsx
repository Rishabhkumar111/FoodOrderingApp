import { useContext } from "react";
import Modal from "./Modal.jsx";
import CartContext from "../../store/CartContext.jsx";
import { currencyFormatter } from "../../utils/formatting.js";
import Button from "./Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCxt = useContext(UserProgressContext);

  const totalPrice = cartCtx.items.reduce((totalPrice, item)=>{
    return totalPrice + (item.quantity * item.price);
  },0);

  function handleCloseCart(){
    userProgressCxt.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCxt.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        <Button >Go to Checkout</Button>
      </p>
    </Modal>
  );
}
