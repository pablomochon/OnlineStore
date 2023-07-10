import { useState, useEffect } from "react";

import UserService from "../services/user.service";

export const Products = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getProducts().then(
      (response) => {
        console.log(response.data)
        setContent(response.data);
      },
      (error) => {
        const contentError =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(contentError);
      }
    );}, []);

  return (
    <div className="container">
    {Array.isArray(content) ? (
      content.map(item => (
        <ul key={item.id}>
          <li>name: {item.name}</li>
          <li>desc: {item.description}</li>
          <li>brand: {item.brand}</li>
          <li>stock: {item.stock}</li>
          <li>volume: {item.volume}</li>
          <li>weight: {item.weight}</li>
        </ul>
      ))
    ) : (
      <p>No data available</p>
    )}
    </div>
  );
};

export default Products;