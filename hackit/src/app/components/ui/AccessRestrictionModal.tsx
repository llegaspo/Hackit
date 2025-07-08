"use client";
import React, { useEffect, memo } from 'react';
import { X, Lock } from 'lucide-react';
import { createPortal } from 'react-dom';

interface AccessRestrictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

const AccessRestrictionModal: React.FC<AccessRestrictionModalProps> = ({
  isOpen,
  onClose,
  featureName
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <>
      <style jsx>{`
        .access-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
          animation: fadeIn 0.3s ease-out;
        }

        .access-modal-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 28rem;
          position: relative;
          animation: modalSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(2rem);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .access-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1.5rem 1rem 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .access-modal-close-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          color: #666;
        }

        .access-modal-close-button:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #333;
        }

        .access-modal-body {
          padding: 1rem 1.5rem 1.5rem 1.5rem;
          text-align: center;
        }

        .access-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          background: linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(255, 105, 180, 0.1));
          border: 2px solid rgba(233, 30, 99, 0.2);
          border-radius: 50%;
          margin: 0 auto 1.5rem auto;
          position: relative;
          overflow: hidden;
        }

        .access-icon-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(233, 30, 99, 0.1), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .access-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          margin-bottom: 0.75rem;
        }

        .access-message {
          font-size: 1rem;
          color: #666;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .access-feature-name {
          font-weight: 600;
          color: #E91E63;
        }

        .access-subtitle {
          font-size: 0.875rem;
          color: #888;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          margin-bottom: 2rem;
        }

        .access-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .access-button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 0.875rem;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .access-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s ease;
        }

        .access-button:hover::before {
          left: 100%;
        }

        .sign-up-button {
          background: linear-gradient(135deg, #E91E63, #FF6B9D);
          color: white;
          box-shadow: 0 0.5rem 1rem rgba(233, 30, 99, 0.3);
        }

        .sign-up-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 0.75rem 1.5rem rgba(233, 30, 99, 0.4);
          background: linear-gradient(135deg, #D81B60, #E91E63);
        }

        .log-in-button {
          background: rgba(255, 255, 255, 0.8);
          color: #333;
          border: 2px solid rgba(233, 30, 99, 0.3);
        }

        .log-in-button:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
          border-color: rgba(233, 30, 99, 0.5);
          color: #E91E63;
        }

        .access-button:active {
          transform: translateY(-1px) scale(1.02);
        }

        @media (max-width: 768px) {
          .access-modal-content {
            margin: 0.5rem;
            max-width: none;
            border-radius: 1rem;
          }

          .access-modal-header {
            padding: 1rem 1rem 0.75rem 1rem;
          }

          .access-modal-body {
            padding: 0.75rem 1rem 1rem 1rem;
          }

          .access-buttons {
            flex-direction: column;
            gap: 0.75rem;
          }

          .access-button {
            width: 100%;
            padding: 1rem 1.5rem;
          }

          .access-title {
            font-size: 1.25rem;
          }

          .access-message {
            font-size: 0.875rem;
          }
        }
      `}</style>

      <div className="access-modal-overlay" onClick={onClose}>
        <div 
          className="access-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="access-modal-header">
            <div style={{ flex: 1 }} />
            <button className="access-modal-close-button" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="access-modal-body">
            <div className="access-icon-container">
              <Lock size={24} color="#E91E63" />
            </div>
            
            <h2 className="access-title">Account Required</h2>
            
            <p className="access-message">
              You need an account to access <span className="access-feature-name">{featureName}</span>
            </p>
            
            <p className="access-subtitle">
              Join our community to unlock all features and connect with amazing people!
            </p>

            <div className="access-buttons">
              <a href="/sign-up" className="access-button sign-up-button">
                Sign Up
              </a>
              <a href="/sign-in" className="access-button log-in-button">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Use portal to render outside the main container
  return createPortal(modalContent, document.body);
};

export default memo(AccessRestrictionModal); 