import { useState, useEffect } from "react";

import UserService from "../services/user.service";

export const Home = () => {
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
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
      ))
    ) : (
      <p>No data available</p>
    )}
    </div>
  );
};

export default Home;