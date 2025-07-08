"use client";
import React, { memo, useState } from 'react';
import { Search, Menu } from 'lucide-react';
import AccessRestrictionModal from './AccessRestrictionModal';

interface PreviewNavbarContainerProps {
  onMobileMenuToggle: () => void;
}

const PreviewNavbarContainer: React.FC<PreviewNavbarContainerProps> = ({ onMobileMenuToggle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFeatureName, setModalFeatureName] = useState('');

  const handleRestrictedFeature = (featureName: string) => {
    setModalFeatureName(featureName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalFeatureName('');
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(15px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'black',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    fontWeight: 300,
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  const logoCircleStyle: React.CSSProperties = {
    width: '2.5rem',
    height: '2.5rem',
    backgroundColor: '#F7C5C5',
    borderRadius: '50%',
    boxShadow: '0 0.25rem 0.75rem rgba(247, 197, 197, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
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
    backgroundColor: 'rgba(245, 239, 240, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1.25rem',
    padding: '0.75rem 1.5rem 0.75rem 3rem',
    width: '100%',
    color: 'black',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    fontWeight: 300,
    fontSize: '0.875rem',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 0.125rem 0.5rem rgba(0, 0, 0, 0.05)',
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '1rem',
    color: '#666',
    zIndex: 1,
    transition: 'all 0.3s ease',
  };

  const navLinksStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2rem',
    flexShrink: 0,
  };

  const burgerButtonStyle: React.CSSProperties = {
    display: 'none',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    color: '#333',
    flexShrink: 0,
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  return (
    <>
      <style jsx>{`
        .logo-section:hover {
          transform: translateY(-0.125rem) scale(1.02);
        }

        .logo-section:hover .logo-circle {
          transform: scale(1.1) rotate(10deg);
          background: linear-gradient(135deg, #F7C5C5, #E8A8A8);
          box-shadow: 0 0.5rem 1.5rem rgba(247, 197, 197, 0.5);
        }

        .logo-section:hover .logo-text {
          color: #E91E63;
          font-weight: 500;
        }

        .search-input:focus {
          outline: none;
          background-color: rgba(255, 255, 255, 0.9);
          border-color: #F7C5C5;
          box-shadow: 0 0.25rem 1rem rgba(247, 197, 197, 0.3);
          transform: scale(1.02);
        }

        .search-input:focus + .search-icon {
          color: #E91E63;
          transform: scale(1.1);
        }

        .search-container:hover .search-input {
          background-color: rgba(255, 255, 255, 0.85);
          border-color: rgba(247, 197, 197, 0.5);
          transform: translateY(-0.0625rem);
        }

        .search-container:hover .search-icon {
          color: #E91E63;
          transform: scale(1.05);
        }

        .nav-link {
          text-decoration: none;
          color: #333;
          position: relative;
          padding: 0.625rem 1.25rem;
          border-radius: 0.75rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          font-weight: 300;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid transparent;
          backdrop-filter: blur(10px);
          user-select: none;
          cursor: pointer;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(247, 197, 197, 0.2), rgba(233, 30, 99, 0.1));
          border-radius: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #E91E63;
          transform: translateY(-0.25rem) scale(1.05);
          box-shadow: 0 0.5rem 1.5rem rgba(247, 197, 197, 0.4);
          border-color: rgba(247, 197, 197, 0.3);
          font-weight: 500;
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        .nav-link.active {
          background: linear-gradient(135deg, rgba(247, 197, 197, 0.3), rgba(233, 30, 99, 0.15));
          color: #E91E63;
          font-weight: 600;
          border-color: rgba(247, 197, 197, 0.4);
          box-shadow: 0 0.25rem 1rem rgba(247, 197, 197, 0.3);
        }

        .nav-link.active:hover {
          background: linear-gradient(135deg, rgba(247, 197, 197, 0.4), rgba(233, 30, 99, 0.2));
          transform: translateY(-0.1875rem) scale(1.05);
          box-shadow: 0 0.75rem 2rem rgba(247, 197, 197, 0.5);
        }

        .nav-link.restricted {
          position: relative;
        }

        .nav-link.restricted::after {
          content: '';
          position: absolute;
          bottom: -0.25rem;
          left: 50%;
          width: 0;
          height: 0.125rem;
          background: linear-gradient(90deg, #E91E63, #F7C5C5);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateX(-50%);
          border-radius: 0.0625rem;
        }

        .nav-link.restricted:hover::after {
          width: 80%;
        }

        .burger-button:hover {
          background: rgba(247, 197, 197, 0.3);
          transform: scale(1.05);
          border-color: rgba(247, 197, 197, 0.5);
          color: #E91E63;
        }

        .burger-button:active {
          transform: scale(0.95);
        }

        .logo-section {
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          user-select: none;
        }

        .logo-text {
          user-select: none;
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
            onClick={() => handleRestrictedFeature('Search')}
            readOnly
          />
        </div>
        <nav style={navLinksStyle} className="desktop-nav">
          <span className="nav-link active">Home</span>
          <span 
            className="nav-link restricted" 
            onClick={() => handleRestrictedFeature('Resources')}
          >
            Resources
          </span>
          <span 
            className="nav-link restricted" 
            onClick={() => handleRestrictedFeature('Market')}
          >
            Market
          </span>
          <span 
            className="nav-link restricted" 
            onClick={() => handleRestrictedFeature('Contact')}
          >
            Contact
          </span>
        </nav>
        <button 
          style={burgerButtonStyle} 
          className="burger-button"
          onClick={onMobileMenuToggle}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Access Restriction Modal */}
      <AccessRestrictionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        featureName={modalFeatureName}
      />
    </>
  );
};

export default memo(PreviewNavbarContainer); 