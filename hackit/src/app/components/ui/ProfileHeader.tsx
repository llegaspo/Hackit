"use client";
import React from 'react';
import { MapPin, Edit } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    name: string;
    businessName: string;
    location: string;
    avatarColor: string;
    avatar?: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 248, 248, 0.7)',
    borderRadius: '1.5rem',
    padding: '2rem',
    textAlign: 'center',
    position: 'relative',
    marginTop: '2rem', // Added for extra spacing from the navbar
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
  };

  const avatarStyle: React.CSSProperties = {
    width: '8rem',
    height: '8rem',
    borderRadius: '50%',
    backgroundColor: user.avatarColor,
    margin: '-6rem auto 1rem',
    border: '0.5rem solid #FFF8F8',
    backgroundImage: user.avatar ? `url(${user.avatar})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111',
    margin: 0,
  };

  const businessStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    color: '#555',
    margin: '0.25rem 0 0.75rem',
    fontWeight: 300,
  };

  const locationStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    color: '#777',
    fontWeight: 300,
  };

  const editButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    background: 'rgba(0,0,0,0.05)',
    border: 'none',
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#333',
    transition: 'all 0.2s ease',
  };

  return (
    <>
      <style jsx>{`
        .edit-button:hover {
          background-color: rgba(0,0,0,0.1) !important;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .profile-container {
            padding: 1.5rem !important;
          }
          .profile-avatar {
            width: 6rem !important;
            height: 6rem !important;
            margin-top: -5rem !important;
            border-width: 0.4rem !important;
          }
          .profile-name {
            font-size: 1.5rem !important;
          }
          .profile-business {
            font-size: 1rem !important;
          }
          .profile-location, .profile-location span {
            font-size: 0.875rem !important;
          }
          .edit-button {
            width: 2.5rem !important;
            height: 2.5rem !important;
            top: 1rem !important;
            right: 1rem !important;
          }
        }
      `}</style>
      <div style={containerStyle} className="profile-container">
        <div style={avatarStyle} className="profile-avatar"></div>
        <h1 style={nameStyle} className="profile-name">{user.name}</h1>
        <p style={businessStyle} className="profile-business">{user.businessName}</p>
        <div style={locationStyle} className="profile-location">
          <MapPin size={18} />
          <span>{user.location}</span>
        </div>
        <button style={editButtonStyle} className="edit-button">
          <Edit size={18} />
        </button>
      </div>
    </>
  );
};

export default ProfileHeader; 