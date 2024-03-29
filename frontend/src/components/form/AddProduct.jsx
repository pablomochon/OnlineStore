import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from "../../services/auth.service";
import { fetchCategories } from '../../services/category.service';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [categories, setCategories] = useState([]); // State to store categories data
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [volume, setVolume] = useState('');
  const [stock, setStock] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState('');

  const [isProductAdded, setIsProductAdded] = useState(false);
  const currentUser = AuthService.getCurrentUser();

  // Fetch all categories when the component mounts
  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const fetchCategoriesData = async () => {
    const categoriesData = await fetchCategories();
    setCategories(categoriesData);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:8080/api/admin/products';
    const accessToken = currentUser.accessToken;

    const productData = {
      name: name,
      category: {
        id: categoryId
      },
      price: price,
      description: description,
      brand: brand,
      volume: volume,
      stock: stock,
      weight: weight,
      image: image
    };

    await axios.post(apiUrl, productData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setIsProductAdded(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='container'>
     <form onSubmit={handleSubmit} className="mb-5">
      <div className="form-label">
        <label htmlFor="name">Nombre:</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="categoryId">Category:</label>
        <select className="form-control" id="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="form-label">
        <label>Price:</label>
        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>

      <div className="form-label">
        <label>Decription:</label>
        <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-label">
        <label>Brand:</label>
        <input type="text" className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)} />
      </div>

      <div className="form-label">
        <label>Volume:</label>
        <input type="text" className="form-control" value={volume} onChange={(e) => setVolume(e.target.value)} />
      </div>

      <div className="form-label">
        <label>Stock:</label>
        <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>

      <div className="form-label">
        <label>Weight:</label>
        <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>

      <div className="form-label">
        <label>image URL:</label>
        <input type="text" className="form-control mb-3" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Create Product</button>
    </form>

    {isProductAdded && <p className='alert alert-success'> Product has been created</p>}
    </div>
  );
};

export default ProductForm;
