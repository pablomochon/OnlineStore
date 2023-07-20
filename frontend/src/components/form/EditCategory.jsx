import { useState } from 'react';
import axios from 'axios';
import AuthService from '../../services/auth.service';

const EditCategory = () => {
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(false);

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
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
      .then(response => {
        setIsCategoryUpdated(true);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div>
        <label>Enter the Category ID to edit:</label>
        <input type="text" value={categoryId} onChange={handleCategoryIdChange} />
      </div>
      <div>
        <label>Enter the new Category Name:</label>
        <input type="text" value={categoryName} onChange={handleCategoryNameChange} />
        <button onClick={handleEditCategory}>Edit Category Name</button>
      </div>

      {isCategoryUpdated && <p>Category with ID {categoryId} has been updated.</p>}
    </div>
  );
};

export default EditCategory;
