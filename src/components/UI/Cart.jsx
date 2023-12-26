import { useContext } from "react";
import Modal from "./Modal.jsx";
import CartContext from "../../store/CartContext.jsx";
import { currencyFormatter } from "../../utils/formatting.js";
import Button from "./Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCxt = useContext(UserProgressContext);

  const totalPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCloseCart() {
    userProgressCxt.hideCart();
  }
  function handleOpenCheckout() {
    userProgressCxt.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCxt.progress === "cart"}
      onClose={userProgressCxt.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleOpenCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
