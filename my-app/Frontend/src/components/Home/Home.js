import React from 'react';
import './Home.css'; 
import gif from './homegif.gif'; 
import logo from './logo.png'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="gif-container">
        <img src={gif} alt="Animated GIF" className="gif" />
      </div>
      <div className="button-container">
        <div className="logo-container">
          <img src={logo} alt="KITS Quiz Masters Logo" className="logo" /> {/* Logo Image */}
        </div>
        <h1>KITS Quiz Masters</h1>
        <button onClick={() => window.location.href='/login'} className="login-button">
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Home;