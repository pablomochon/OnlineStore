import { useEffect, useState } from 'react';
import AuthService from '../services/auth.service';
import { Alert } from 'react-bootstrap';

const SeeOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const currentUser = AuthService.getCurrentUser();
  const token = currentUser.accessToken;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        setError('Failed to fetch orders.');
      }
    } catch (error) {
      setError('Error occurred while fetching orders.');
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      {orders.map((order) => (
        <div key={order.id} className="card mb-3">
          <div className="card-header">Order ID: {order.id}</div>
          <div className="card-header">Shipping Address: {order.shippingAddress}</div>
          <div className="card-body">
            <h5 className="card-title">Products:</h5>
            <ul className="list-group">
              {order.items.map((item) => (
                <li key={item.id} className="list-group-item">
                  Name: {item.product.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer">Total Price: {calculateTotalPrice(order.items)}€</div>
        </div>
      ))}
    </div>
  );
};

export default SeeOrders;
