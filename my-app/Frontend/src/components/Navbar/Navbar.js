import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Home/logo.png'

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="KITS Quiz Masters Logo" className="navbar-logo-image" />
          KITS Quiz Masters
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/quizzes" className="navbar-link">
            Quizzes
          </Link>
        </li>
        <li>
          <button className="navbar-link navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;