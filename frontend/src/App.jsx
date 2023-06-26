import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import HomePage from './HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;