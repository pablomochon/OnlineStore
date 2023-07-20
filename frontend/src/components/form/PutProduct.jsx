import { useState } from 'react';
import axios from 'axios';
import AuthService from "../../services/auth.service";

const PutProduct = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);

  const currentUser = AuthService.getCurrentUser();

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleFetchProduct = () => {
    if (productId) {
      const apiUrl = `http://localhost:8080/api/products/${productId}`;
      const accessToken = currentUser.accessToken;

      axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then(response => {
          setProductData(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    if (!productData) {
      return; // No product data to update
    }

    const apiUrl = `http://localhost:8080/api/admin/products/${productId}`;
    const accessToken = currentUser.accessToken;

    axios.put(apiUrl, productData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Handle the server response after updating the product
        console.log(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div>
        <label>Enter the Product ID to update:</label>
        <input type="text" value={productId} onChange={handleProductIdChange} />
        <button onClick={handleFetchProduct}>Fetch Product</button>
      </div>

      {productData && (
        <form onSubmit={handleUpdateProduct}>
          {/* Product form fields */}
          <div>
            <label>Name:</label>
            <input type="text" value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} />
          </div>
          <div>
            <label>Price:</label>
            <input type="number" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
          </div>
          <div>
            <label>Description:</label>
            <input type="text" value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
          </div>
          <div>
            <label>Brand:</label>
            <input type="text" value={productData.brand} onChange={(e) => setProductData({ ...productData, brand: e.target.value })} />
          </div>
          <div>
            <label>Volume:</label>
            <input type="text" value={productData.volume} onChange={(e) => setProductData({ ...productData, volume: e.target.value })} />
          </div>
          <div>
            <label>Stock:</label>
            <input type="number" value={productData.stock} onChange={(e) => setProductData({ ...productData, stock: e.target.value })} />
          </div>
          <div>
            <label>Weight:</label>
            <input type="number" value={productData.weight} onChange={(e) => setProductData({ ...productData, weight: e.target.value })} />
          </div>
          <div>
            <label>Image URL:</label>
            <input type="text" value={productData.image} onChange={(e) => setProductData({ ...productData, image: e.target.value })} />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default PutProduct;
