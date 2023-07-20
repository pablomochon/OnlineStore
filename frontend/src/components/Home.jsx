import Products from "./Products";
import { useState, useEffect } from "react";

import UserService from "../services/product.service";
import { Filters } from "./Filters";
import { Cart } from "./Cart";
import { Footer } from "./Footer";

export const Home = () => {
  const [content, setContent] = useState([]);
  
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
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
        p.price >= filters.minPrice && 
        (
          filters.category === 'all' ||
          p.category.name === filters.category
        )
      )
    })
  }

  const filteredProducts = filterProducts(content)

  return(
    <>
    <Filters changeFilters={setFilters} />
    <Cart />
    <Products products={filteredProducts} />
    </>
  );
};

export default Home;