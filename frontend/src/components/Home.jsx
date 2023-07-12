import Products from "./Products";
import Filters from "./Filters";
import { useState, useEffect } from "react";
import { useFilters } from '../hooks/useFilters'
import UserService from "../services/user.service";


export const Home = () => {
  const [content, setContent] = useState("");
  const { filterProducts } = useFilters()

  useEffect(() => {
    UserService.getProducts().then(
      (response) => {
        console.log(response.data, "==> UseEffect")
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

    const filteredProducts = filterProducts(content)

  return (
    <div className="container">
      mi home: 
      <Filters></Filters>
      <Products products={filteredProducts}></Products>
    </div>
  );
};

export default Home;