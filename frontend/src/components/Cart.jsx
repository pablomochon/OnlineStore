import './Cart.css'
import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useCart } from '../hook/useCart';

function CartItem ({image, price, name, quantity, addToCart}) {
  return(
    <li>
      <img 
      src={image}
      alt={name} 
      />
      <div>
          <strong>{name}</strong> - ${price}
      </div>
      <footer>
        <small>
          qty: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}
export function Cart () {
    const cartCheckboxId = useId()
    const { cart, clearCart, addToCart } = useCart()
  
    return (
      <>
        <label className='cart-button' htmlFor={cartCheckboxId}>
          <CartIcon />
        </label>
        <input id={cartCheckboxId} type='checkbox' hidden />
  
        <aside className='cart'>
          <ul>
            {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
            ))}
          </ul>
  
          <button onClick={clearCart}>
            <ClearCartIcon />
          </button>
        </aside>
      </>
    )
  }