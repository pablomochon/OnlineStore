import Products from "./Products";
import { useState, useEffect } from "react";

import UserService from "../services/user.service";

export const Home = () => {
  const [content, setContent] = useState([]);
  
  const [filters] = useState({
    category: 'Hogar',
    minprice: 0
  })

  useEffect(() => {
    UserService.getProducts().then(
      (response) => {
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

  const filterProducts = (products) => {
    return products.filter(p => {
      return (
        p.price >= filters.minprice && 
        (
          filters.category === 'all' ||
          p.category.name === filters.category
        )
      )
    })
  }

  const filteredProducts = filterProducts(content)

  return(
    <Products products={filteredProducts} />
  );
};

export default Home;