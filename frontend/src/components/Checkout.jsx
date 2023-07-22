import { useState } from 'react';

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the logic to submit the checkout form
    console.log('Shipping Address:', shippingAddress);
    console.log('Payment Method:', paymentMethod);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h3>Shipping Address</h3>
            <div className="form-group">
              <label htmlFor="shippingAddress">Address:</label>
              <input
                type="text"
                className="form-control"
                id="shippingAddress"
                value={shippingAddress}
                onChange={handleShippingAddressChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Shipping Address
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h3>Payment Method</h3>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              <select
                className="form-control"
                id="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                {/* Add more payment methods as needed */}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Payment Method
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
