import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../Home/logo.png';
import img2 from './facebook.png';
import './Footer.css';
import img3 from './linkedin.png';
import img1 from './social.png';
import img4 from './twitter.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section (Logo + Text) */}
        <div className="footer-left">
          <div className="logo-text">
            <img src={logo} alt="Logo" className="footer-logo" />
            <h2>KITS Quiz Masters</h2>
          </div>
          <h4>Knowledge is power, Quiz it up!</h4>
        </div>

        {/* Right Section (Links + Social Media) */}
        <div className="footer-right">
          <div className="footer-links">
            <Link to="/about-us">About Us</Link> {/* Use Link instead of a */}
            <Link to="/contact-us">Contact Us</Link>
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
          </div>
          <div className="social-media">
            <a href="https://www.facebook.com/">
              <img src={img2} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/accounts/login/?hl=en">
              <img src={img1} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/home">
              <img src={img3} alt="LinkedIn" />
            </a>
            <a href="https://x.com/i/flow/login?lang=en">
              <img src={img4} alt="Twitter" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
