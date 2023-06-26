import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica para enviar los datos del formulario al backend y manejar la autenticación
    console.log('Iniciar sesión:', username, password);
    
    // Limpia los campos del formulario
    setUsername('');
    setPassword('');
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de usuario:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mb-3">Iniciar sesión</button>
      </form>

      <Link to=".." className="mb-3">Volver</Link> {/* Enlace para volver atrás con margen inferior */}
    </div>
    
  );
};

export default LoginPage;
