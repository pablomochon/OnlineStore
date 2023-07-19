import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";


export const BoardAdmin = () => {

  const [showContent, setShowContent] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowContent(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  return (
    <div className="container"> 
        {showContent ?
        <header className="jumbotron">
        <h1>Hello {currentUser.username}, what do you want to do?</h1>
        <div className="list-group">
          <Link to={"/admin/AddProduct"} className="btn btn-primary">Add a product</Link>
          <Link to={"/admin/category"} className="btn btn-primary">Add a category</Link>
        </div>

        </header>
        : 
        <h2 className="alert alert-danger" role="alert">
          You need admin user to access it!
        </h2>}
    </div>
  );
};

export default BoardAdmin;
