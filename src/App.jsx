import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/UI/Cart";
import ConfirmationPage from "./components/UI/ConfirmationPage";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
        <ConfirmationPage />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
