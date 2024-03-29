import { useState,useEffect } from 'react';
import axios from 'axios';
import AuthService from '../../services/auth.service';
import ProductService from '../../services/product.service';

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');
  const [isProductDeleted, setIsProductDeleted] = useState(false);
  const [content, setContent] = useState('')

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    ProductService.getProducts().then(
      (response) => {
        console.log(response.data)
        setContent(response.data);
      },
      (error) => {
        console.log(error)
        const contentError =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(contentError);
      }
    );}, []);

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
      .then(() => {
        setIsProductDeleted(true);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {content ? content.map(item => <div key={item.id}><strong>id: </strong>{item.id} <strong>name: </strong>{item.name}</div>) : <div>Loading...</div>}
      <div className='form-label'>
        <label>Enter the Product ID to delete:</label>
        <input type="text" className='form-control mb-3' value={productId} onChange={handleProductIdChange} />
        <button onClick={handleDeleteProduct} className='btn btn-primary'>Delete Product</button>
      </div>

      {isProductDeleted && <p className='alert alert-success'>Product with ID {productId} has been deleted.</p>}
    </div>
  );
};

export default DeleteProduct;
