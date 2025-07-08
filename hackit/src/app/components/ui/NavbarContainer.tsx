"use client";
import React, { memo } from 'react';
import { Search, Menu } from 'lucide-react';

interface NavbarContainerProps {
  onMobileMenuToggle: () => void;
}

const NavbarContainer: React.FC<NavbarContainerProps> = ({ onMobileMenuToggle }) => {
  const navStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'black',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    fontWeight: 300,
    flexShrink: 0,
  };

  const logoCircleStyle: React.CSSProperties = {
    width: '2.5rem',
    height: '2.5rem',
    backgroundColor: '#F7C5C5',
    borderRadius: '50%',
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    maxWidth: '31.25rem',
    margin: '0 2rem',
  };
  
  const searchInputStyle: React.CSSProperties = {
    backgroundColor: '#F5EFF0',
    border: 'none',
    borderRadius: '1.25rem',
    padding: '0.75rem 1.5rem 0.75rem 3rem',
    width: '100%',
    color: 'black',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    fontWeight: 300,
    fontSize: '0.875rem',
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '1rem',
    color: '#333',
    zIndex: 1,
  };

  const navLinksStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2rem',
    flexShrink: 0,
  };

  const burgerButtonStyle: React.CSSProperties = {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    color: '#333',
    flexShrink: 0,
  };

  return (
    <>
      <style jsx>{`
        .nav-link {
          text-decoration: none;
          color: #333;
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          font-weight: 300;
        }

        .nav-link:hover {
          background-color: #F7C5C5;
          color: #222;
          transform: translateY(-0.125rem);
          box-shadow: 0 0.25rem 0.75rem rgba(247, 197, 197, 0.4);
        }

        .nav-link.active {
          background-color: #F0B8B8;
          color: #111;
          font-weight: 400;
        }

        .nav-link.active:hover {
          background-color: #E8A8A8;
          transform: translateY(-0.0625rem);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -0.125rem;
          left: 50%;
          width: 0;
          height: 0.125rem;
          background-color: #E8A8A8;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 80%;
        }

        /* Desktop styles - ensure hamburger is hidden */
        @media (min-width: 769px) {
          .burger-button {
            display: none !important;
          }
          
          .desktop-nav {
            display: flex !important;
          }
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          
          .burger-button {
            display: block !important;
          }

          .navbar-container {
            padding: 1rem !important;
            gap: 0.5rem;
          }

          .logo-section {
            flex-shrink: 0;
            min-width: fit-content;
          }

          .search-container {
            margin: 0 0.75rem !important;
            flex-grow: 1 !important;
            min-width: 0;
          }

          .search-input {
            padding: 0.6rem 1rem 0.6rem 2.5rem !important;
            font-size: 1rem !important; /* 16px */
            min-width: 0;
          }

          .search-icon {
            left: 0.75rem !important;
          }

          .logo-text {
            font-size: 1.125rem !important; /* 18px */
          }

          .logo-circle {
            width: 2.25rem !important; /* 36px */
            height: 2.25rem !important;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 0.75rem !important;
          }

          .search-container {
            margin: 0 0.5rem !important;
          }

          .search-input {
            padding: 0.6rem 0.75rem 0.6rem 2.25rem !important;
            font-size: 0.9375rem !important; /* 15px */
          }

          .search-icon {
            left: 0.5rem !important;
          }

          .logo-text {
            font-size: 1rem !important; /* 16px */
          }

          .logo-circle {
            width: 2rem !important; /* 32px */
            height: 2rem !important;
          }
        }
      `}</style>

      <div style={navStyle} className="navbar-container">
        <div style={logoStyle} className="logo-section">
          <div style={logoCircleStyle} className="logo-circle"></div>
          <span className="logo-text">appname</span>
        </div>
        <div style={searchContainerStyle} className="search-container">
          <Search style={searchIconStyle} size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search..." 
            style={searchInputStyle} 
            className="search-input"
          />
        </div>
        <nav style={navLinksStyle} className="desktop-nav">
          <a href="#" className="nav-link active">Home</a>
          <a href="#" className="nav-link">Resources</a>
          <a href="#" className="nav-link">Market</a>
          <a href="#" className="nav-link">Contact</a>
        </nav>
        <button 
          style={burgerButtonStyle} 
          className="burger-button"
          onClick={onMobileMenuToggle}
        >
          <Menu size={20} />
        </button>
      </div>
    </>
  );
};

export default memo(NavbarContainer); 