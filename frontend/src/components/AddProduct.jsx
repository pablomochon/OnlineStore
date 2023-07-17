import { useState, useEffect } from "react";

import AuthService from "../services/auth.service";

export function isAdminContent () {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        setShowContent(user.roles.includes("ROLE_ADMIN"));
      }
    }, []);
}

export const AddProduct = () => {

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowContent(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  return(
    <div className="container">
        {showContent ? 
        <div className="jumbotron">
            form to add Product
        </div>
        :
        <h2 className="alert alert-danger" role="alert">
          You need admin user to access it!
        </h2>
    }
    </div>
  )
}