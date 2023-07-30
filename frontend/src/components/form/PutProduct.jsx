import { useState } from 'react';
import axios from 'axios';
import AuthService from "../../services/auth.service";

const PutProduct = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [isProductPut, setIsProductPut] = useState(false)

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
      .then(() => {
        setIsProductPut(true);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div className='form-label'>
        <label>Enter the Product ID to update:</label>
        <input type="text" className='form-control' value={productId} onChange={handleProductIdChange} />
        <button className="btn btn-primary mt-3" onClick={handleFetchProduct}>Fetch Product</button>
      </div>

      {productData && (
        <form onSubmit={handleUpdateProduct}>
          {/* Product form fields */}
          <div className='form-label'>
            <label>Name:</label>
            <input type="text" className='form-control' value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} />
          </div>
          <div>
            <label className='form-label'>Price:</label>
            <input type="number" className='form-control' value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
          </div>
          <div className='form-label'>
            <label>Description:</label>
            <input type="text"  className='form-control' value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
          </div>
          <div className='form-label'>
            <label>Brand:</label>
            <input type="text"  className='form-control' value={productData.brand} onChange={(e) => setProductData({ ...productData, brand: e.target.value })} />
          </div>
          <div className='form-label'>
            <label>Volume:</label>
            <input type="text"  className='form-control' value={productData.volume} onChange={(e) => setProductData({ ...productData, volume: e.target.value })} />
          </div>
          <div className='form-label'>
            <label>Stock:</label>
            <input type="number" className='form-control' value={productData.stock} onChange={(e) => setProductData({ ...productData, stock: e.target.value })} />
          </div>
          <div className='form-label'>
            <label>Weight:</label>
            <input type="number" className='form-control' value={productData.weight} onChange={(e) => setProductData({ ...productData, weight: e.target.value })} />
          </div>
          <div className='form-label'>
            <label>Image URL:</label>
            <input type="text" className='form-control' value={productData.image} onChange={(e) => setProductData({ ...productData, image: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary mt-3 mb-3">Save Changes</button>
        </form>
      )}

      {isProductPut && <p className='alert alert-success'>Product with ID {productId} has been updated.</p>}
    </div>
  );
};

export default PutProduct;
