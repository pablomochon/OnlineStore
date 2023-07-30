import { useState } from 'react';
import AuthService from '../../services/auth.service';
import { Alert } from 'react-bootstrap'; // Import the Alert component from Bootstrap


const CheckoutForm = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  // State variable to track the order status
  const [orderStatus, setOrderStatus] = useState(null);

  const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

  const cardNumberRegex = /^(\d{16})$/;
  const cardHolderNameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
  const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvRegex = /^\d{3}$/;

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setExpirationDate((prevDate) => `${month}/${prevDate.slice(3)}`);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setExpirationDate((prevDate) => `${prevDate.slice(0, 2)}/${year}`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardNumber.match(cardNumberRegex)) {
      alert('Invalid card number. Please enter a valid 16-digit card number.');
      return;
    }

    if (!cardHolderName.match(cardHolderNameRegex)) {
      alert('Invalid card holder name. Please enter a valid full name (First Last).');
      return;
    }

    if (!expirationDate.match(expirationDateRegex)) {
      alert('Invalid expiration date. Please enter a date in the format mm/YY.');
      return;
    }

    if (!cvv.match(cvvRegex)) {
      alert('Invalid CVV. Please enter a valid 3-digit CVV.');
      return;
    }

    const body = {
      shippingAddress,
      paymentMethod: {
        cardNumber,
        cardHolderName,
        expirationDate,
        cvv,
      },
      cart: cartInitialState,
    };

    const currentUser = AuthService.getCurrentUser();
    const token = currentUser.accessToken;

    try {
      const response = await fetch('http://localhost:8080/api/orders/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setOrderStatus('success');
        // Clear cart items on successful order placement
        window.localStorage.removeItem('cart');
      } else {
        setOrderStatus('error');
      }
    } catch (error) {
      setOrderStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="shippingAddress" className="form-label">Shipping Address:</label>
        <input
          type="text"
          className="form-control"
          id="shippingAddress"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cardNumber" className="form-label">Card Number:</label>
        <input
          type="text"
          className="form-control"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cardHolderName" className="form-label">Card Holder Name:</label>
        <input
          type="text"
          className="form-control"
          id="cardHolderName"
          value={cardHolderName}
          onChange={(e) => setCardHolderName(e.target.value)}
        />
      </div>
      <div className="mb-3">
      <label htmlFor="expirationDate" className="form-label">
        Expiration Date:
      </label>
      <div className="d-flex">
        <select
          name="expireMM"
          id="expireMM"
          onChange={handleMonthChange}
          value={expirationDate.slice(0, 2)}
        >
          <option value="">Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <select
          name="expireYY"
          id="expireYY"
          onChange={handleYearChange}
          value={expirationDate.slice(3)}
        >
          <option value="">Year</option>
          <option value="23">2023</option>
          <option value="24">2024</option>
          <option value="25">2025</option>
          <option value="26">2026</option>
          <option value="27">2027</option>
          <option value="28">2028</option>
          <option value="29">2029</option>
          <option value="30">2030</option>
          <option value="31">2031</option>
        </select>
      </div>
      <input
        type="hidden"
        name="expiry"
        id="expiry"
        maxLength="4"
        value={expirationDate.replace('/', '')}
      />
    </div>
      <div className="mb-3">
        <label htmlFor="cvv" className="form-label">CVV:</label>
        <input
          type="text"
          className="form-control"
          id="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
      </div>

      {/* Success Message */}
      {orderStatus === 'success' && (
        <Alert variant="success" className="mt-3">
          Order placed successfully!
        </Alert>
      )}

      {/* Error Message */}
      {orderStatus === 'error' && (
        <Alert variant="danger" className="mt-3">
          Failed to place the order. Please try again later.
        </Alert>
      )}
      
      <button type="submit" className="btn btn-primary">Place Order</button>
    </form>
  );
};

export default CheckoutForm;
