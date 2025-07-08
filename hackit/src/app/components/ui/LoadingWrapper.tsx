"use client";

import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingWrapperProps {
  children: React.ReactNode;
  minLoadingTime?: number;
}

const LoadingWrapper = ({ children, minLoadingTime = 1500 }: LoadingWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay before showing content for smooth transition
      setTimeout(() => setShowContent(true), 100);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  const contentStyle: React.CSSProperties = {
    opacity: showContent ? 1 : 0,
    transition: 'opacity 0.5s ease-in',
  };

  const loadingStyle: React.CSSProperties = {
    opacity: isLoading ? 1 : 0,
    pointerEvents: isLoading ? 'auto' : 'none',
  };

  return (
    <>
      {/* Loading Spinner */}
      <div style={loadingStyle}>
        <LoadingSpinner />
      </div>
      
      {/* Main Content */}
      <div style={contentStyle}>
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper; 