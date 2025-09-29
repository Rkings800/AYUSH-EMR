import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function HeaderHero() {
  const navigate = useNavigate();

  return (
    <div className="header-hero">
      {/* ✅ Background Image */}
      <div className="header-hero-bg">
        <img 
          src="/hospital ke bache.webp" 
          alt="Healthcare Background" 
          className="header-hero-bg-image"
        />
        <div className="header-hero-overlay"></div>
      </div>
      
      {/* ✅ Content */}
      <div className="header-hero-content">
        <div className="logo-compact">
          <img 
            src="/WhatsApp Image 2025-09-15 at 12.42.45 PM.jpeg"
            alt="Logo Icon"
            className="logo-icon-small"
          />
        </div>

        <div className="header-actions-compact">
          <button className="contact-btn-small">Contact</button>
          {/* ✅ Route to /login */}
          <button 
            className="login-btn-small" 
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderHero;