import { useState, useEffect } from "react";

import AuthService from "../services/auth.service";

export const ProductForm = () => {

  const [showContent, setShowContent] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    categoryId: 1,
    price: "",
    description: "",
    brand: "",
    volume: "",
    stock: "",
    weight: "",
    image: "",
  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowContent(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/admin/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        // Producto creado exitosamente, puedes realizar acciones adicionales aquí
        console.log("Producto creado exitosamente");
      } else {
        // Ocurrió un error al crear el producto, maneja la respuesta adecuadamente
        console.error("Error al crear producto");
      }
    } catch (error) {
      // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
      console.error(error);
    }
  };


  return(
    <div className="container">
        {showContent ? 
    <div className="container">
    <h2>Crear Producto</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="categoryId" className="form-label">
          ID de Categoría:
        </label>
        <input
          type="number"
          className="form-control"
          id="categoryId"
          name="categoryId"
          value={productData.categoryId}
          onChange={handleChange}
          required
        />
      </div>
      {/* Agrega aquí los demás campos del formulario */}
      <button type="submit" className="btn btn-primary">
        Crear Producto
      </button>
    </form>
    </div>
        :
        <h2 className="alert alert-danger" role="alert">
          You need admin user to access it!
        </h2>
    }
    </div>
  )
}