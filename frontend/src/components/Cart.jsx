import './Cart.css';
import { useId } from 'react';
import { CartIcon, ClearCartIcon } from './Icons.jsx';
import { useCart } from '../hook/useCart';
import { Link } from 'react-router-dom';

function CartItem({ image, price, name, quantity, addToCart }) {
  return (
    <li>
      <img src={image} alt={name} />
      <div>
        <strong>{name}</strong> - {price}€
      </div>
      <footer>
        <small>qty: {quantity}</small>
        <button className="btn btn-primary" onClick={addToCart}>
          +
        </button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart } = useCart();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />

      <aside className="cart">
      {cart.length === 0 ? (
          <p className="empty-cart-message">Cart is empty</p>
        ) : (
          <ul>
            {cart.map((product) => (
              <CartItem key={product.id} addToCart={() => addToCart(product)} {...product} />
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <footer>
            <button className="btn btn-danger" onClick={clearCart}>
              <ClearCartIcon /> Clear Cart
            </button>
            <Link to="/cart" className="btn btn-primary">
              Pay
            </Link>
          </footer>
        )}
      </aside>
    </>
  );
}
