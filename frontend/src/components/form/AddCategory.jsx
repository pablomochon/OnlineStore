import { useState } from "react";
import AuthService from "../../services/auth.service";
import axios from "axios";


const CategoryForm = () => {
  const [name, setName] = useState("");
  const [isAddCategory, setIsAddCategory] = useState(false);

  const handleSubmit = async(e) => {
  e.preventDefault();
  try{
    const currentUser = AuthService.getCurrentUser();
    const token = currentUser.accessToken;
    const response = await axios.post('http://localhost:8080/api/admin/categories',
    { name },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }
    );

    if (response.status === 200) {
      setIsAddCategory(true)
    }
  }
  catch(e){
    return console.error("error ==>", e)
  }

  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="container">
      <h2>Create category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
      {isAddCategory && <p className='alert alert-success'>Category has been created</p>}
    </div>
  );
};

export default CategoryForm;
