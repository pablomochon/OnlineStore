import Products from "./Products";
import { useState, useEffect } from "react";

import {ProductService} from '../services/product.service';
import {Filters} from "./Filters";
import {Cart} from "./cart/Cart";
import { Footer } from './layout/Footer'

export const Home = () => {
  const [content, setContent] = useState([]);
  
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  useEffect(() => {
    ProductService.getProducts().then(
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
    <div>
    <Filters changeFilters={setFilters} />
    <Cart />
    <Products products={filteredProducts} />
    <Footer />
    </div>
  );
};

export default Home;