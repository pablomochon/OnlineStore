import { useState } from 'react';
import axios from 'axios';
import AuthService from "../../services/auth.service";

const ProductForm = () => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [volume, setVolume] = useState('');
  const [stock, setStock] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState('');

  const currentUser = AuthService.getCurrentUser();

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
      .then(response => {
   
        console.log(response.data);
        console.log("todo OK");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Categoría ID:</label>
        <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Descripción:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Marca:</label>
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
      </div>
      <div>
        <label>Volumen:</label>
        <input type="text" value={volume} onChange={(e) => setVolume(e.target.value)} />
      </div>
      <div>
        <label>Stock:</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>
      <div>
        <label>Peso:</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <div>
        <label>Imagen URL: http://something.jpg</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <button type="submit">Crear Producto</button>
    </form>
  );
};

export default ProductForm;
