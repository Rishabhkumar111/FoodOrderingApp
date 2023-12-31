import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
  clearAll: () => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    let existingIndex = -1;
    state.items.forEach((element, ind) => {
      if (element.id === action.item.id) {
        existingIndex = ind;
      }
    });
    // console.log(existingIndex, state.items);
    const updatedItems = [...state.items];

    if (existingIndex !== -1) {
      const updatedItem = {
        ...state.items[existingIndex],
        quantity: state.items[existingIndex].quantity + 1,
      };
      updatedItems[existingIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    let existingIndex = -1;
    state.items.forEach((element, ind) => {
      if (element.id === action.id) {
        existingIndex = ind;
      }
    });
    const updatedItems = [...state.items];

    if (state.items[existingIndex].quantity !== 1) {
      const updatedItem = {
        ...state.items[existingIndex],
        quantity: state.items[existingIndex].quantity - 1,
      };
      updatedItems[existingIndex] = updatedItem;
    } else {
      updatedItems.splice(existingIndex, 1);
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR_ALL") {
    return { items: [] };
  }
  return state;
}
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearAll() {
    dispatchCartAction({ type: "CLEAR_ALL" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearAll,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
