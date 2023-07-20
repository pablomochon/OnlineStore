import { useState } from "react";
import ProductService from "../../services/product.service";


const CategoryForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();
  let response = ProductService.sendCategory(name);
  if(response.status == 200){
    console.log("hola yo soy kani")
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
    </div>
  );
};

export default CategoryForm;
