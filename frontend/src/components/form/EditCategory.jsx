import { useState,useEffect } from 'react';
import axios from 'axios';
import AuthService from '../../services/auth.service';
import { fetchCategories } from '../../services/category.service';

const EditCategory = () => {
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
    setSelectedCategory(e.target.value)
  };

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleEditCategory = () => {
    if (!categoryId || !categoryName) {
      return; // Missing categoryId or categoryName
    }

    const apiUrl = `http://localhost:8080/api/admin/categories/${categoryId}`;
    const currentUser = AuthService.getCurrentUser();
    const accessToken = currentUser.accessToken;

    const categoryData = {
      name: categoryName
    };

    axios.put(apiUrl, categoryData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setIsCategoryUpdated(true);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
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
    <div className='container'>
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
      <div className='form-group'>
        <label>Enter the new Category Name:</label>
        <input
          type='text'
          className='form-control'
          value={categoryName}
          onChange={handleCategoryNameChange}
        />
        <button className='btn btn-primary' onClick={handleEditCategory}>
          Edit Category Name
        </button>
      </div>
  
      {isCategoryUpdated && (
        <p className='alert alert-success'>
          Category with ID {categoryId} has been updated.
        </p>
      )}
    </div>
  );  
};

export default EditCategory;
