import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

export const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const a = AuthService.getCurrentUser();

    if (a) {
      setShowContent(a.roles.includes("ROLE_USER"));
    }
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>

      {showContent ? (
      <div>
        
        <Link to={"/myOrders"} className=""><strong>See my orders 🛒</strong></Link>
      </div>
      ) : (
      <div></div>
      )}

    </div>
  );
};

export default Profile;