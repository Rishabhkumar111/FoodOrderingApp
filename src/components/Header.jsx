import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const totalNUmberOfItems = cartCtx.items.reduce((totalNUmberOfItems, item)=>{
    return totalNUmberOfItems+item.quantity;
  },0)
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo Image" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart {totalNUmberOfItems}</Button>
      </nav>
    </header>
  );
}
