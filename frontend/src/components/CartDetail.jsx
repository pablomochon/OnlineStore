import { Link } from 'react-router-dom';
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
            </footer>
          </li>
        )
    }

const CartDetail = () => {
    const { cart} = useCart()


  return (
    <div>
      <h2>Shopping Cart</h2>
      <aside>
          <ul>
            {cart.map(product => (
            <CartItem
              key={product.id}

              {...product}
            />
            ))}
          </ul>
        </aside>
      <Link to="/cart/checkout">Proceed to Checkout</Link>
    </div>
  );
};

export default CartDetail;