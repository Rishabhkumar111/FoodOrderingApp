import { useContext } from "react";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";

export default function ConfirmationPage() {
    const userProgressCxt = useContext(UserProgressContext);
    function handleCloseCart() {
        userProgressCxt.hideCart();
      }
  return (
    <Modal
      open={userProgressCxt.progress === "done"}
      onClose={userProgressCxt.progress === "done" ? handleCloseCart : null}
    >
      <h2>You have placed your Order</h2>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
      </p>
    </Modal>
  );
}
