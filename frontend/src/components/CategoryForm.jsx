import { useState } from "react";
import ProductService from "../services/product.service";
import axios from "axios";
import AuthService from "../services/auth.service";

const CategoryForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
      const currentUser = AuthService.getCurrentUser();
      const token = currentUser.accessToken;

      const response = await axios.post(
        "http://localhost:8080/api/admin/category",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response.data);
      })
      .catch((error) => {
        // Manejar errores
        console.error("ERROR ==>", error);
      });
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="container">
      <h2>Crear Categoría</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre:
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
          Crear Categoría
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
