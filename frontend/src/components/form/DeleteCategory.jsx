import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from '../../services/auth.service';
import { fetchCategories } from '../../services/category.service';

const DeleteCategory = () => {
  const [categoryId, setCategoryId] = useState('');
  const [isCategoryDeleted, setIsCategoryDeleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false)

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
    setSelectedCategory(e.target.value)
  };

  const handleDeleteCategory = () => {
    if (!categoryId) {
      return; // Missing categoryId
    }

    const apiUrl = `http://localhost:8080/api/admin/categories/${categoryId}`;
    const currentUser = AuthService.getCurrentUser();
    const accessToken = currentUser.accessToken;

    axios.delete(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(() => {
        setIsCategoryDeleted(true);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        setError(true)
      });
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategoriesData();
  }, []);

  const fetchCategoriesData = async () => {
    const categoriesData = await fetchCategories();
    setCategories(categoriesData);
  };

  return (
    <div>
      <div className='form-group'>
        <label htmlFor='category'>Categories</label>
        <select
          id='categoryFilterId'
          className='form-control'
          onChange={handleCategoryIdChange}
          value={selectedCategory}
        >
          <option value=''>Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-label mt-3"> 
        <button onClick={handleDeleteCategory} className="btn btn-primary">Delete Category</button>
      </div>

      {isCategoryDeleted && <p className='alert alert-success'>Category with ID {categoryId} has been deleted.</p>}
      {error && <p className='alert alert-warning'>Category with ID {categoryId} can not delete because one or more products have this category.</p>}
    </div>
  );
};

export default DeleteCategory;
