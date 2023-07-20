import { useState } from 'react';
import axios from 'axios';
import AuthService from '../../services/auth.service';

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');
  const [isProductDeleted, setIsProductDeleted] = useState(false);

  const currentUser = AuthService.getCurrentUser();

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleDeleteProduct = () => {
    if (!productId) {
      return;
    }

    const apiUrl = `http://localhost:8080/api/admin/products/${productId}`;
    const accessToken = currentUser.accessToken;

    axios.delete(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        setIsProductDeleted(true);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div>
        <label>Enter the Product ID to delete:</label>
        <input type="text" value={productId} onChange={handleProductIdChange} />
        <button onClick={handleDeleteProduct}>Delete Product</button>
      </div>

      {isProductDeleted && <p>Product with ID {productId} has been deleted.</p>}
    </div>
  );
};

export default DeleteProduct;
