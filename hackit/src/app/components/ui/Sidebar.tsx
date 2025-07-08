import React, { memo } from 'react';

interface SidebarProps {
  user?: {
    name: string;
    role: string;
    profileColor: string;
    avatar?: string; // For future profile image integration
  };
}

const Sidebar: React.FC<SidebarProps> = ({ 
  user = {
    name: "Placeholder Name",
    role: "Works at",
    profileColor: "#F7C5C5"
  }
}) => {
  const sidebarStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginRight: '1rem',
    width: '17.5rem',
    height: 'fit-content',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 0.5rem 2rem rgba(0, 0, 0, 0.1)',
  };

  const profileCircleStyle: React.CSSProperties = {
    width: '3.75rem',
    height: '3.75rem',
    backgroundColor: user.profileColor,
    borderRadius: '50%',
    marginBottom: '1rem',
    backgroundImage: user.avatar ? `url(${user.avatar})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const welcomeTextStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#333',
    marginBottom: '0.5rem',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 300,
    color: '#666',
    marginBottom: '0.25rem',
  };

  const roleStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 300,
    color: '#888',
  };

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .sidebar {
            display: none !important;
          }
        }
      `}</style>
      
      <div style={sidebarStyle} className="sidebar">
        <div style={profileCircleStyle}></div>
        <div style={welcomeTextStyle}>Welcome back!</div>
        <div style={nameStyle}>{user.name}</div>
        <div style={roleStyle}>{user.role}</div>
      </div>
    </>
  );
};

export default memo(Sidebar);
