import { Link } from 'react-router-dom';
import { useCart } from '../hook/useCart';

function CartItem({ image, price, name, quantity }) {
  return (
    <li className="list-group-item d-flex align-items-center">
      <img
        src={image}
        alt={name}
        style={{ maxWidth: '100px', marginRight: '20px' }}
      />
      <div>
        <strong>{name}</strong> - ${price}
      </div>
      <footer className="ml-auto">
        <small>qty: {quantity}</small>
      </footer>
    </li>
  );
}

const CartDetail = () => {
  const { cart } = useCart();

  const getTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };
  
  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      <aside className="my-4">
        <ul className="list-group">
          {cart.map((product) => (
            <CartItem key={product.id} {...product} />
          ))}
        </ul>
      </aside>
      <div className="mb-3">
        <strong>Total: ${getTotal()}</strong>
      </div>
      <Link to="/cart/checkout" className="btn btn-primary">
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartDetail;