"use client";
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Monitor, User, Bell } from 'lucide-react';
import { NotificationType } from './NotificationsMenu';

// Dynamically import the menu to reduce initial bundle size
const NotificationsMenu = dynamic(() => import('./NotificationsMenu'));

const sampleNotifications: NotificationType[] = [
  {
    id: '1',
    authorName: 'Clair M. Obscur',
    authorAvatarColor: '#FF4444',
    action: 'commented on your post',
    postTitle: 'Verso parry it...',
    timeAgo: '1h ago',
    isRead: false,
  },
  {
    id: '2',
    authorName: 'Jane Doe',
    authorAvatarColor: '#ADFF2F',
    action: 'commented on your post',
    postTitle: 'Very insightful post, Placehold...',
    timeAgo: '2h ago',
    isRead: false,
  },
  {
    id: '3',
    authorName: 'Supa Maria',
    authorAvatarColor: '#F7C5C5',
    action: 'liked your post',
    postTitle: 'Lorem ipsum dolor sit amet....',
    timeAgo: '2d ago',
    isRead: true,
  },
  {
    id: '4',
    authorName: 'Supa Maria',
    authorAvatarColor: '#F7C5C5',
    action: 'liked your post',
    postTitle: 'Lorem ipsum dolor sit amet....',
    timeAgo: '2d ago',
    isRead: true,
  },
];

interface SecondaryNavbarProps {
  activeView: string;
  onViewChange: (viewName: string) => void;
}

const SecondaryNavbar: React.FC<SecondaryNavbarProps> = ({ activeView, onViewChange }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen]);

  const handleNotificationClick = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };
  
  const handleTabClick = (tabName: string) => {
    if (tabName === 'notifications') {
      setIsNotificationsOpen(prev => !prev);
    } else {
      // If we're switching to a main view, always close the notifications
      setIsNotificationsOpen(false);
      onViewChange(tabName);
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    backgroundColor: 'white',
    padding: '1rem 2rem',
    gap: '0',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    position: 'relative',
    zIndex: 10,
  };

  const sectionStyle: React.CSSProperties = {
    flex: 1,
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
  };

  const getSectionStyle = (tabName: string): React.CSSProperties => {
    const isActive = activeView === tabName || (tabName === 'notifications' && isNotificationsOpen);

    return {
      ...sectionStyle,
      backgroundColor: isActive ? 'white' : '#F8F8F8',
      boxShadow: isActive ? '0 0.125rem 0.5rem rgba(0, 0, 0, 0.1)' : 'none',
      fontWeight: isActive ? 700 : 300,
    };
  };

  const iconStyle: React.CSSProperties = {
    color: '#333',
  };

  return (
    <>
      <style jsx>{`
        .secondary-nav-section:hover {
          background-color: #F0F0F0 !important;
          transform: translateY(-0.0625rem);
        }

        .secondary-nav-section.active:hover {
          background-color: #FAFAFA !important;
        }

        .nav-text {
          display: inline;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .secondary-navbar-container {
            padding: 1rem 1rem !important;
          }

          .secondary-nav-section {
            margin: 0 0.3rem !important;
            padding: 1rem !important;
            min-height: 3.5rem;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          .nav-text {
            display: none !important;
          }

          .nav-icon {
            margin: 0 !important;
          }
        }

        @media (max-width: 480px) {
          .secondary-navbar-container {
            padding: 0.75rem 0.75rem !important;
          }

          .secondary-nav-section {
            margin: 0 0.2rem !important;
            padding: 0.75rem !important;
            min-height: 3rem;
          }
        }
      `}</style>

      <div style={containerStyle} className="secondary-navbar-container">
        <div 
          style={getSectionStyle('forHer')} 
          className="secondary-nav-section"
          onClick={() => handleTabClick('forHer')}
        >
          <Monitor size={22} style={iconStyle} className="nav-icon" />
          <span className="nav-text">For Her Page</span>
        </div>
        
        <div 
          style={getSectionStyle('profile')} 
          className="secondary-nav-section"
          onClick={() => handleTabClick('profile')}
        >
          <User size={22} style={iconStyle} className="nav-icon" />
          <span className="nav-text">Profile Page</span>
        </div>
        
        <div 
          style={getSectionStyle('notifications')} 
          className="secondary-nav-section"
          onClick={() => handleTabClick('notifications')}
          ref={notificationsRef}
        >
          <Bell size={22} style={iconStyle} className="nav-icon" />
          <span className="nav-text">Notifications</span>
          {isNotificationsOpen && (
            <NotificationsMenu 
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SecondaryNavbar; 