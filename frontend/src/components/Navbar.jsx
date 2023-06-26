import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Tienda</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="btn btn-primary nav-link" to="/login">Iniciar sesión</Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-primary nav-link" to="/register">Registrarse</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
