import './Products.css'
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
    <main className="container products">
      <ul>
        {Array.isArray(content) ? (content.map(p => {

          return(
            <li key={p.id}>
              <img 
              src=""
              alt={p.name} />
              <div>
                <strong>{p.name}</strong> - ${p.price}
              </div>
              <div>
                {p.brand}
              </div>
              <div>
                {p.description}
              </div>
              <div>
                volume: {p.volume} - weight: {p.weight}
              </div>
              <div>
              stock: {p.stock}
              </div>
              <div>
                <button>add</button>
              </div>
            </li>
          )
        })) : <p> no data avaible</p>}
      </ul>
    </main>
  );
};

export default Products;