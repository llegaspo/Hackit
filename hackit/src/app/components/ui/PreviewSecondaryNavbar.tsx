"use client";
import React from 'react';
import Link from 'next/link';
import { Monitor } from 'lucide-react';

interface PreviewSecondaryNavbarProps {
  activeView: string;
  onViewChange: (viewName: string) => void;
}

const PreviewSecondaryNavbar: React.FC<PreviewSecondaryNavbarProps> = ({ activeView, onViewChange }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: 'white',
    padding: '1rem 2rem',
    gap: '0',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    position: 'relative',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const leftSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flex: '1',
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: 'auto',
  };

  const sectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: '#F8F8F8',
    margin: '0 0.5rem',
    borderRadius: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 300,
    color: '#333',
    position: 'relative',
    fontSize: '0.875rem',
    minWidth: '120px',
  };

  const getSectionStyle = (tabName: string): React.CSSProperties => {
    const isActive = activeView === tabName;

    return {
      ...sectionStyle,
      backgroundColor: isActive ? 'white' : '#F8F8F8',
      boxShadow: isActive ? '0 0.25rem 1rem rgba(0, 0, 0, 0.15)' : 'none',
      fontWeight: isActive ? 700 : 300,
      border: isActive ? '1px solid rgba(255, 255, 255, 0.8)' : '1px solid transparent',
      transform: isActive ? 'translateY(-0.125rem)' : 'translateY(0)',
    };
  };

  const iconStyle: React.CSSProperties = {
    color: '#333',
  };

  const glowingButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 1.5rem',
    borderRadius: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: 600,
    fontSize: '0.875rem',
    border: 'none',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    minWidth: '100px',
    boxShadow: '0 4px 12px rgba(233, 30, 99, 0.25)',
    backdropFilter: 'blur(10px)',
  };

  const loginButtonStyle: React.CSSProperties = {
    ...glowingButtonStyle,
    background: 'linear-gradient(135deg, #E91E63, #AD1457)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3), 0 0 20px rgba(233, 30, 99, 0.2)',
  };

  const signupButtonStyle: React.CSSProperties = {
    ...glowingButtonStyle,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
    color: '#E91E63',
    border: '2px solid #E91E63',
    boxShadow: '0 4px 12px rgba(233, 30, 99, 0.2), 0 0 15px rgba(233, 30, 99, 0.15)',
  };

  return (
    <>
      <style jsx>{`
        .secondary-nav-section {
          position: relative;
          overflow: hidden;
          user-select: none;
        }

        .secondary-navbar-container {
          position: relative;
        }

        .secondary-nav-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(247, 197, 197, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .secondary-nav-section:hover::before {
          left: 100%;
        }

        .secondary-nav-section:hover {
          background: linear-gradient(135deg, rgba(247, 197, 197, 0.2), rgba(233, 30, 99, 0.1)) !important;
          transform: translateY(-0.25rem) scale(1.02) !important;
          box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15) !important;
          border: 1px solid rgba(247, 197, 197, 0.4) !important;
        }

        .secondary-nav-section.active:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(247, 197, 197, 0.1)) !important;
          transform: translateY(-0.1875rem) scale(1.02) !important;
          box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.2) !important;
        }

        .secondary-nav-section:active {
          transform: translateY(-0.0625rem) scale(0.98) !important;
        }

        .nav-icon {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          user-select: none;
        }

        .secondary-nav-section:hover .nav-icon {
          transform: scale(1.1) rotate(5deg);
          color: #E91E63 !important;
        }

        .secondary-nav-section.active .nav-icon {
          color: #E91E63 !important;
        }

        .nav-text {
          display: inline;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          user-select: none;
        }

        .secondary-nav-section:hover .nav-text {
          color: #E91E63 !important;
          font-weight: 600 !important;
        }

        .secondary-nav-section.active .nav-text {
          color: #E91E63 !important;
        }

        .glowing-btn {
          position: relative;
          overflow: hidden;
        }

        .glowing-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          transition: left 0.5s ease;
        }

        .glowing-btn:hover::before {
          left: 100%;
        }

        .login-btn:hover {
          transform: translateY(-4px) scale(1.05);
          background: linear-gradient(135deg, #D81B60, #8E24AA);
          box-shadow: 0 12px 30px rgba(233, 30, 99, 0.4), 0 0 30px rgba(233, 30, 99, 0.6);
        }

        .signup-btn:hover {
          transform: translateY(-4px) scale(1.05);
          background: linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(233, 30, 99, 0.05));
          box-shadow: 0 12px 30px rgba(233, 30, 99, 0.3), 0 0 25px rgba(233, 30, 99, 0.4);
          border-color: #D81B60;
          color: #D81B60;
        }

        .glowing-btn:active {
          transform: translateY(-2px) scale(1.02);
        }

        @media (max-width: 768px) {
          .secondary-navbar-container {
            padding: 1rem !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            gap: 1rem !important;
          }

          .left-section {
            flex: 1 !important;
            justify-content: flex-start !important;
          }

          .right-section {
            margin-left: 0 !important;
            justify-content: flex-end !important;
            gap: 0.75rem !important;
          }

          .secondary-nav-section {
            margin: 0 !important;
            padding: 0.75rem 1rem !important;
            min-height: auto !important;
            min-width: auto !important;
            border-radius: 1rem !important;
          }

          .glowing-btn {
            padding: 0.6rem 1rem !important;
            min-width: 75px !important;
            font-size: 0.8rem !important;
            border-radius: 1.5rem !important;
          }

          .nav-text {
            font-size: 0.8rem !important;
          }
        }

        @media (max-width: 480px) {
          .secondary-navbar-container {
            padding: 0.75rem !important;
            flex-direction: column !important;
            gap: 1rem !important;
          }

          .left-section {
            width: 100% !important;
            justify-content: center !important;
          }

          .right-section {
            width: 100% !important;
            justify-content: center !important;
            gap: 1rem !important;
          }

          .secondary-nav-section {
            padding: 0.75rem 1.5rem !important;
            min-width: 150px !important;
          }

          .glowing-btn {
            padding: 0.75rem 1.25rem !important;
            min-width: 90px !important;
            font-size: 0.875rem !important;
          }

          .nav-text {
            display: inline !important;
            font-size: 0.875rem !important;
          }
        }

        @media (max-width: 360px) {
          .glowing-btn {
            padding: 0.7rem 1rem !important;
            min-width: 80px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>

      <div style={containerStyle} className="secondary-navbar-container">
        <div style={leftSectionStyle} className="left-section">
          <div 
            style={getSectionStyle('forHer')} 
            className="secondary-nav-section"
            onClick={() => onViewChange('forHer')}
          >
            <Monitor size={22} style={iconStyle} className="nav-icon" />
            <span className="nav-text">For Her Page</span>
          </div>
        </div>
        
        <div style={rightSectionStyle} className="right-section">
          <Link href="/sign-in" style={loginButtonStyle} className="glowing-btn login-btn">
            Log In
          </Link>
          
          <Link href="/sign-up" style={signupButtonStyle} className="glowing-btn signup-btn">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default PreviewSecondaryNavbar; 