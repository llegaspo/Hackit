"use client";

import React from 'react';

const LoadingSpinner = () => {
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#FFF8F8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    transition: 'opacity 0.5s ease-out',
  };

  const spinnerStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    border: '3px solid #F7C5C5',
    borderTop: '3px solid #E8A8A8',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  };

  const textStyle: React.CSSProperties = {
    fontFamily: "'Britti Sans Trial', sans-serif",
    fontSize: '1.2rem',
    color: '#666',
    fontWeight: 300,
  };

  return (
    <>
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .loading-text {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
      
      <div style={containerStyle}>
        <div style={spinnerStyle}></div>
        <div style={textStyle} className="loading-text">
          Loading...
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner; 