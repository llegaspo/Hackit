"use client";

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import LoadingWrapper from '../components/ui/LoadingWrapper';
import FloatingBubblegum from '../components/ui/FloatingBubblegum';
import PreviewNavbarContainer from '../components/ui/PreviewNavbarContainer';
import PreviewSecondaryNavbar from '../components/ui/PreviewSecondaryNavbar';
import PreviewMobileMenu from '../components/ui/PreviewMobileMenu';

// Dynamically import components that aren't needed for the initial render
const PreviewMainFeed = dynamic(() => import('../components/ui/PreviewMainFeed'));

export default function PreviewPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('forHer');

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  const renderContent = () => {
    // For preview page, always show the main feed regardless of activeView
    return <PreviewMainFeed />;
  };

  return (
    <LoadingWrapper>
      {/* Mobile Menu */}
      <PreviewMobileMenu isOpen={isMobileMenuOpen} onClose={handleMobileMenuToggle} />
      <div style={{ 
        backgroundColor: '#FFF8F8', 
        minHeight: '100vh', 
        width: '100%', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-1.25rem) translateX(1.25rem); }
            100% { transform: translateY(0) translateX(0); }
          }

          .floating-image {
            position: absolute;
            opacity: 0.15;
            width: 53.125rem;
            height: auto;
            animation: float 6s ease-in-out infinite;
            will-change: transform;
            user-select: none;
            pointer-events: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }

          .image1 {
            top: 0%;
            left: 5%;
            animation-delay: 0s;
            animation-duration: 8s;
          }

          .image2 {
            top: 45%;
            left: 70%;
            animation-delay: 2s;
            animation-duration: 10s;
          }

          .image3 {
            top: 60%;
            left: -15%;
            animation-delay: 4s;
            animation-duration: 7s;
          }

          .frosted-glass {
            position: absolute;
            top: 4rem;
            left: 8rem;
            right: 8rem;
            bottom: 4rem;
            
            /* Enhanced Glass Effect */
            border: 1px solid transparent;
            background: 
              linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.05), rgba(255,255,255,0.5)) border-box,
              rgba(255, 255, 255, 0.15) padding-box;
            background-clip: border-box, padding-box;
            backdrop-filter: blur(12px) saturate(150%);
            -webkit-backdrop-filter: blur(12px) saturate(150%);
            
            border-radius: 1.5rem; /* 24px -> 1.5rem */
            box-shadow: 0 0.25rem 1.875rem rgba(0, 0, 0, 0.1); /* 4px 30px */
            overflow-y: auto;
            overflow-x: hidden; /* Prevent horizontal scrolling on mobile */
            display: flex;
            flex-direction: column;
            max-width: 87.5rem; /* 1400px */
            margin: 0 auto;
          }

          /* Mobile responsive styles */
          @media (max-width: 1200px) {
            .frosted-glass {
              left: 4rem !important;
              right: 4rem !important;
            }
          }

          @media (max-width: 768px) {
            .frosted-glass {
              top: 1rem !important;
              left: 1rem !important;
              right: 1rem !important;
              bottom: 1rem !important;
              border-radius: 1rem !important;
            }

            .floating-image {
              width: 31.25rem !important;
              opacity: 0.12 !important;
            }

            .image1 {
              top: -5% !important;
              left: -10% !important;
            }

            .image2 {
              top: 50% !important;
              left: 60% !important;
            }

            .image3 {
              top: 75% !important;
              left: -20% !important;
            }

            /* Add padding to account for navbars */
            .main-content-area {
              padding-top: 3.75rem !important; /* 60px -> 3.75rem. Further reduced to bring content much closer to navbar */
            }
          }

          @media (max-width: 480px) {
            .frosted-glass {
              top: 1rem !important;
              left: 0.5rem !important;
              right: 0.5rem !important;
              bottom: 1rem !important;
              border-radius: 0.75rem !important;
            }

            .floating-image {
              width: 21.875rem !important;
              opacity: 0.1 !important;
            }

            .image1 {
              top: 0% !important;
              left: -15% !important;
            }

            .image2 {
              top: 55% !important;
              left: 50% !important;
            }

            .image3 {
              top: 80% !important;
              left: -25% !important;
            }
          }
        `}</style>

        <FloatingBubblegum className="image1" />
        <FloatingBubblegum className="image2" />
        <FloatingBubblegum className="image3" />

        <div className="frosted-glass">
          <PreviewNavbarContainer onMobileMenuToggle={handleMobileMenuToggle} />
          <PreviewSecondaryNavbar activeView={activeView} onViewChange={handleViewChange} />
          <div className="main-content-area">
            {renderContent()}
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
} 