"use client";
import React, { memo, useState } from 'react';
import { X } from 'lucide-react';
import AccessRestrictionModal from './AccessRestrictionModal';

interface PreviewMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreviewMobileMenu: React.FC<PreviewMobileMenuProps> = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFeatureName, setModalFeatureName] = useState('');

  const handleRestrictedFeature = (featureName: string) => {
    setModalFeatureName(featureName);
    setIsModalOpen(true);
    onClose(); // Close the mobile menu when showing modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalFeatureName('');
  };

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
          cursor: pointer;
          user-select: none;
        }

        .mobile-menu-link:hover {
          color: #F7C5C5;
        }

        .mobile-menu-link.active {
          color: #E91E63;
          font-weight: 500;
        }

        .mobile-menu-link.restricted {
          position: relative;
        }

        .mobile-menu-link.restricted::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 0.125rem;
          background: linear-gradient(90deg, #E91E63, #F7C5C5);
          transition: width 0.3s ease;
          border-radius: 0.0625rem;
        }

        .mobile-menu-link.restricted:hover::after {
          width: 100%;
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
          <span className="mobile-menu-link active">Home</span>
          <span 
            className="mobile-menu-link restricted" 
            onClick={() => handleRestrictedFeature('Resources')}
          >
            Resources
          </span>
          <span 
            className="mobile-menu-link restricted" 
            onClick={() => handleRestrictedFeature('Market')}
          >
            Market
          </span>
          <span 
            className="mobile-menu-link restricted" 
            onClick={() => handleRestrictedFeature('Contact')}
          >
            Contact
          </span>
        </nav>
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

export default memo(PreviewMobileMenu); 