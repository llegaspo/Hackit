"use client";

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import LoadingWrapper from './components/ui/LoadingWrapper';
import FloatingBubblegum from './components/ui/FloatingBubblegum';
import NavbarContainer from './components/ui/NavbarContainer';
import SecondaryNavbar from './components/ui/SecondaryNavbar';

// Dynamically import components that aren't needed for the initial render
const MobileMenu = dynamic(() => import('./components/ui/MobileMenu'));
const MainFeed = dynamic(() => import('./components/ui/MainFeed'));
const ProfileHeader = dynamic(() => import('./components/ui/ProfileHeader'));
const ProfileContent = dynamic(() => import('./components/ui/ProfileContent'));
const EditProfile = dynamic(() => import('./components/ui/EditProfile'));

// Define user profile interface for consistency
interface UserProfile {
  name: string;
  businessPosition: string;
  location: string;
  avatarColor: string;
  avatar?: string;
  website?: string;
}

const userProfile: UserProfile = {
  name: 'Placeholder Name',
  businessPosition: 'C.E.O of TechCorp Solutions',
  location: 'Mandaue City, Cebu, Central Visayas, Philippines',
  avatarColor: '#F7C5C5',
  // avatar: 'https://picsum.photos/150/150?random=1', // Removed random avatar
  website: 'https://portfolio.example.com', // Can be empty string '' if no website to hide this section
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState('forHer');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile>(userProfile);
  const [isFirstVisit, setIsFirstVisit] = useState(true); // Simulate first visit after signup

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  const handleEditProfile = useCallback(() => {
    setIsEditingProfile(true);
  }, []);

  const handleSaveProfile = useCallback((updatedUser: UserProfile) => {
    setCurrentUserProfile(updatedUser);
    setIsEditingProfile(false);
    setIsFirstVisit(false); // Mark as no longer first visit after saving profile
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditingProfile(false);
    if (isFirstVisit) {
      // If canceling on first visit, still mark as no longer first visit
      setIsFirstVisit(false);
    }
  }, [isFirstVisit]);

  const handleSkipProfile = useCallback(() => {
    setIsFirstVisit(false);
    setIsEditingProfile(false);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'forHer':
        return <MainFeed currentUser={{
          id: "current-user",
          name: currentUserProfile.name,
          role: currentUserProfile.businessPosition,
          profileColor: currentUserProfile.avatarColor,
          avatar: currentUserProfile.avatar
        }} />;
      case 'profile':
        return (
          <div className="profile-view-container">
            <ProfileHeader user={currentUserProfile} onEditClick={handleEditProfile} />
            <ProfileContent posts={userPosts} currentUser={{
              id: "current-user",
              name: currentUserProfile.name,
              role: currentUserProfile.businessPosition,
              profileColor: currentUserProfile.avatarColor,
              avatar: currentUserProfile.avatar
            }} />
          </div>
        );
      default:
        // By default, or if notifications is clicked, show the main feed
        return <MainFeed currentUser={{
          id: "current-user",
          name: currentUserProfile.name,
          role: currentUserProfile.businessPosition,
          profileColor: currentUserProfile.avatarColor,
          avatar: currentUserProfile.avatar
        }} />;
    }
  };

  const userPosts = [
    {
      id: "1",
      authorName: currentUserProfile.name,
      authorTitle: currentUserProfile.businessPosition,
      timeAgo: '2h ago',
      content: 'Just wrapped up a deep dive into our Q3 analytics. The data confirms that shifting our ad spend from broad-stroke campaigns to hyper-targeted micro-influencer collaborations has yielded a 150% increase in engagement. For fellow B2C founders, don\'t underestimate the power of a niche audience. Authenticity is our most valuable currency!',
      likes: 102,
      comments: 23,
      profileColor: currentUserProfile.avatarColor,
      isLiked: false,
      images: ['/images/placeholder.jpg'],
      avatar: currentUserProfile.avatar,
    },
    {
      id: "2",
      authorName: currentUserProfile.name,
      authorTitle: currentUserProfile.businessPosition,
      timeAgo: '8h ago',
      content: 'Scaling a startup is a marathon, not a sprint. This week, we focused on refining our operational workflows to eliminate bottlenecks before our next growth phase. We implemented a new project management system that integrates directly with our CRM. The goal? To ensure our client-facing teams have real-time data access, reducing response times by an anticipated 30%. Remember, a strong internal foundation is what makes external growth sustainable. We\'re building a skyscraper, not a house of cards.',
      likes: 256,
      comments: 41,
      profileColor: currentUserProfile.avatarColor,
      isLiked: true,
      avatar: currentUserProfile.avatar,
    },
  ];

  return (
    <LoadingWrapper>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMobileMenuToggle} />
      <div style={{ 
        backgroundColor: '#FFF8F8', 
        minHeight: '100vh', 
        width: '100%', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <style jsx global>{`
          .profile-view-container {
            padding: 2rem;
          }

          @media (max-width: 1024px) {
            .profile-view-container {
              padding: 1.5rem;
            }
          }

          @media (max-width: 768px) {
            .profile-view-container {
              padding: 1rem;
            }
          }

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
              padding-top: 2rem !important; /* Reduced from 3.75rem to bring content closer to navbar */
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
          <NavbarContainer onMobileMenuToggle={handleMobileMenuToggle} />
          <SecondaryNavbar activeView={activeView} onViewChange={handleViewChange} />
          <div className="main-content-area">
            {(isEditingProfile || isFirstVisit) ? (
              <EditProfile 
                user={currentUserProfile}
                onSave={handleSaveProfile}
                onCancel={handleCancelEdit}
                onSkip={isFirstVisit ? handleSkipProfile : undefined}
                isFirstVisit={isFirstVisit}
              />
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
}
