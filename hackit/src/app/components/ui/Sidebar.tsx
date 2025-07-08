"use client";
import React, { memo } from 'react';

interface User {
  id: string;
  name: string;
  role: string;
  profileColor: string;
  avatar?: string;
}

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const sidebarStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 0.5rem 2rem rgba(0, 0, 0, 0.1)',
    padding: '0', // Remove padding to accommodate gradient
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    height: 'fit-content',
    width: '100%',
    overflow: 'hidden',
  };

  const gradientTopStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #E91E63, #9C27B0, #673AB7, #3F51B5)',
    borderRadius: '1.5rem 1.5rem 0 0',
    zIndex: 1,
  };

  const contentStyle: React.CSSProperties = {
    padding: '2rem',
    paddingTop: '2.5rem', // Extra padding to account for gradient
  };

  const welcomeStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#333',
    marginBottom: '0.5rem',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '2rem',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
  };

  const profileSectionStyle: React.CSSProperties = {
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    paddingTop: '1.5rem',
  };

  const profileHeaderStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '1rem',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
  };

  const profileItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  };

  const profileCircleStyle: React.CSSProperties = {
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    backgroundColor: user.profileColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.125rem',
    fontWeight: 600,
    color: 'white',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
  };

  const profileInfoStyle: React.CSSProperties = {
    flex: 1,
  };

  const profileNameStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '0.25rem',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
  };

  const profileRoleStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#666',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
  };

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .sidebar-container {
            display: none !important;
          }
        }
      `}</style>
      
      <div style={sidebarStyle} className="sidebar-container">
        {/* Beautiful Gradient Top */}
        <div style={gradientTopStyle}></div>
        
        <div style={contentStyle}>
          <h2 style={welcomeStyle}>Welcome!</h2>
          <p style={descriptionStyle}>
            Connect with inspiring women leaders, share your journey, and discover opportunities to grow your business and career.
          </p>
          
          <div style={profileSectionStyle}>
            <h3 style={profileHeaderStyle}>Your Profile</h3>
            <div style={profileItemStyle}>
              <div style={profileCircleStyle}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div style={profileInfoStyle}>
                <div style={profileNameStyle}>{user.name}</div>
                <div style={profileRoleStyle}>{user.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Sidebar);
