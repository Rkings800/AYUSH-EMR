import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import HeaderHero from "./HeaderHero";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      {/* ✅ Hero Section at the top */}
     

      {/* ✅ Navigation Bar */}
      <div className="header-bottom">
        <nav className="nav-container">
          {/* Desktop Navigation */}
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/features" className="nav-link">Features</Link>
           <Link to="/About" className="nav-link">About</Link>
           <Link to="/map" className="nav-link">Nearest Ayush Centre</Link>
         <Link to="/contact" className="nav-link">Contact</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </nav>

        {/* ✅ Mobile Dropdown Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
         <div className="mobile-nav-links">
  <Link to="/" className="mobile-nav-link">Home</Link>
  <Link to="/features" className="mobile-nav-link">Features</Link>
  <Link to="/about" className="mobile-nav-link">About</Link>
  <Link to="/map" className="mobile-nav-link">Nearest Ayush Centre</Link>
  <Link to="/contact" className="mobile-nav-link">Contact</Link>
</div>
        </div>
      </div>
    </header>
  );
}