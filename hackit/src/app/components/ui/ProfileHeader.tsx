"use client";
import React from 'react';
import { MapPin, Edit, Globe } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    name: string;
    businessPosition: string;
    location: string;
    avatarColor: string;
    avatar?: string;
    website?: string;
  };
  onEditClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onEditClick }) => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 248, 248, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    padding: '2rem',
    textAlign: 'center',
    position: 'relative',
    marginTop: '2rem',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 0.5rem 2rem rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  const avatarStyle: React.CSSProperties = {
    width: '8rem',
    height: '8rem',
    borderRadius: '50%',
    backgroundColor: user.avatarColor,
    margin: '-6rem auto 1rem',
    border: '0.5rem solid rgba(255, 255, 255, 0.9)',
    backgroundImage: user.avatar ? `url(${user.avatar})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 0.75rem 2rem rgba(0, 0, 0, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111',
    margin: 0,
    transition: 'all 0.3s ease',
  };

  const businessStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    color: '#555',
    margin: '0.25rem 0 0.75rem',
    fontWeight: 300,
    transition: 'all 0.3s ease',
  };

  const locationStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    color: '#777',
    fontWeight: 300,
    transition: 'all 0.3s ease',
    marginBottom: user.website ? '0.5rem' : '0',
  };

  const websiteStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    color: '#777',
    fontWeight: 300,
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const editButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#333',
    boxShadow: '0 0.25rem 1rem rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  return (
    <>
      <style jsx>{`
        .profile-container:hover {
          transform: translateY(-0.25rem) !important;
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15) !important;
          background-color: rgba(255, 248, 248, 0.95) !important;
        }

        .profile-container:hover .profile-avatar {
          transform: scale(1.05) !important;
          box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.2) !important;
          border-color: rgba(255, 255, 255, 1) !important;
        }

        .profile-container:hover .profile-name {
          color: #E91E63 !important;
          transform: translateY(-0.125rem) !important;
        }

        .profile-container:hover .profile-business {
          color: #444 !important;
        }

        .profile-container:hover .profile-location {
          color: #666 !important;
        }

        .profile-container:hover .profile-website {
          color: #4A90E2 !important;
        }

        .profile-website:hover {
          color: #E91E63 !important;
          transform: translateY(-0.125rem) !important;
        }

        .website-icon {
          transition: all 0.3s ease;
        }

        .profile-container:hover .website-icon {
          transform: scale(1.1);
          color: #4A90E2;
        }

        .profile-website:hover .website-icon {
          color: #E91E63 !important;
        }

        .edit-button:hover {
          background: linear-gradient(135deg, #F7C5C5, #E8A8A8) !important;
          transform: scale(1.1) rotate(5deg) !important;
          box-shadow: 0 0.5rem 1.5rem rgba(247, 197, 197, 0.4) !important;
          color: #222 !important;
        }

        .edit-button:active {
          transform: scale(0.95) !important;
        }

        .location-icon {
          transition: all 0.3s ease;
        }

        .profile-container:hover .location-icon {
          transform: scale(1.1);
          color: #E91E63;
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
          .profile-website, .profile-website span {
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
        <p style={businessStyle} className="profile-business">{user.businessPosition}</p>
        <div style={locationStyle} className="profile-location">
          <MapPin size={18} className="location-icon" />
          <span>{user.location}</span>
        </div>
        {user.website && (
          <a href={user.website} target="_blank" rel="noopener noreferrer" style={websiteStyle} className="profile-website">
            <Globe size={18} className="website-icon" />
            <span>{user.website}</span>
          </a>
        )}
        <button style={editButtonStyle} className="edit-button" onClick={onEditClick}>
          <Edit size={18} />
        </button>
      </div>
    </>
  );
};

export default ProfileHeader; 