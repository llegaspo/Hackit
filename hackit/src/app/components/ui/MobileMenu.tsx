"use client";
import React, { memo } from 'react';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const mobileMenuStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: isOpen ? '0' : '-100%',
    width: '80%',
    maxWidth: '18.75rem',
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '-0.125rem 0 0.625rem rgba(0, 0, 0, 0.1)',
    transition: 'right 0.3s ease',
    zIndex: 1000,
    padding: '2rem',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    display: 'block', // Always block, controlled by right property
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: isOpen ? 'block' : 'none',
  };

  return (
    <>
      <style jsx>{`
        .mobile-menu-link {
          display: block;
          text-decoration: none;
          color: #333;
          padding: 1rem 0;
          border-bottom: 1px solid #f0f0f0;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          font-weight: 300;
          transition: color 0.3s ease;
          font-size: 1.125rem;
        }

        .mobile-menu-link:hover {
          color: #F7C5C5;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 0.125rem solid #f0f0f0;
        }

        .mobile-menu-title {
          font-size: 1.25rem;
          font-weight: 700;
        }
        
        @media (max-width: 480px) {
          .mobile-menu-link {
            font-size: 1rem !important;
          }

          .mobile-menu-title {
            font-size: 1.125rem !important;
          }
        }
      `}</style>

      {/* Mobile menu overlay */}
      <div style={overlayStyle} onClick={onClose} />

      {/* Mobile side menu */}
      <div style={mobileMenuStyle}>
        <div className="mobile-menu-header">
          <h3 style={{ margin: 0 }} className="mobile-menu-title">Menu</h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>
        <nav>
          <a href="#" className="mobile-menu-link">Home</a>
          <a href="#" className="mobile-menu-link">Resources</a>
          <a href="#" className="mobile-menu-link">Market</a>
          <a href="#" className="mobile-menu-link">Contact</a>
        </nav>
      </div>
    </>
  );
};

export default memo(MobileMenu); 