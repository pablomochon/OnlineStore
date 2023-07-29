import { useState } from 'react';
import axios from 'axios';
import AuthService from '../../services/auth.service';

const DeleteCategory = () => {
  const [categoryId, setCategoryId] = useState('');
  const [isCategoryDeleted, setIsCategoryDeleted] = useState(false);

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
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
      });
  };

  return (
    <div>
      <div className="form-label"> 
        <label >Enter the Category ID to delete:</label>
        <input type="text" className="form-control" value={categoryId} onChange={handleCategoryIdChange} />
        <button onClick={handleDeleteCategory} className="btn btn-primary">Delete Category</button>
      </div>

      {isCategoryDeleted && <p className='alert alert-success'>Category with ID {categoryId} has been deleted.</p>}
    </div>
  );
};

export default DeleteCategory;
