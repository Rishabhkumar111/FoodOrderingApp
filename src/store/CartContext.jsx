import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    let existingIndex = -1;
    state.items.forEach((element, ind) => {
      if (element.id === action.item.id) {
        existingIndex = ind;
      }
    });
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
    const existingIndex = state.items.findIndex((item) => {
      item.id === action.id;
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

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
