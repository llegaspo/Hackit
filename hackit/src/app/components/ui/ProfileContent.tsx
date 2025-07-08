"use client";
import React, { useState } from 'react';
import Post from './Post';

// Define the types directly in the file
interface PostData {
  id: string;
  authorName: string;
  authorTitle: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  profileColor: string;
  isLiked?: boolean;
  images?: string[];
}

interface ProfileContentProps {
  posts: PostData[];
}

const ProfileContent: React.FC<ProfileContentProps> = ({ posts }) => {
  const [activeTab, setActiveTab] = useState('posts');

  const tabsContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    margin: '2rem 0',
    paddingBottom: '1rem',
    borderBottom: '1px solid #E5E7EB',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
  };

  const getTabStyle = (tabName: string): React.CSSProperties => ({
    background: 'none',
    border: 'none',
    padding: '0.5rem 1rem',
    fontSize: '1.25rem',
    fontWeight: activeTab === tabName ? 700 : 300,
    color: activeTab === tabName ? '#111' : '#666',
    cursor: 'pointer',
    position: 'relative',
    transition: 'color 0.2s ease',
  });

  const activeTabIndicatorStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-17px',
    left: '0',
    right: '0',
    height: '3px',
    backgroundColor: '#333',
    borderRadius: '2px',
  };

  const postsContainerStyle: React.CSSProperties = {
    maxWidth: '650px',
    margin: '0 auto',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div style={postsContainerStyle}>
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        );
      case 'courses':
        return <div style={{textAlign: 'center', padding: '4rem', color: '#888'}}>Recent Courses Content - Coming Soon!</div>;
      case 'liked':
        return <div style={{textAlign: 'center', padding: '4rem', color: '#888'}}>Liked Posts Content - Coming Soon!</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <style jsx>{`
        .profile-tab:hover {
          color: #111 !important;
        }

        @media (max-width: 768px) {
          .tabs-container {
            gap: 1rem !important;
            margin: 1.5rem 0 !important;
          }
          .profile-tab {
            font-size: 1rem !important;
            padding: 0.5rem !important;
          }
        }
      `}</style>
      <nav style={tabsContainerStyle} className="tabs-container">
        <button style={getTabStyle('posts')} className="profile-tab" onClick={() => setActiveTab('posts')}>
          Recent Posts
          {activeTab === 'posts' && <div style={activeTabIndicatorStyle} />}
        </button>
        <button style={getTabStyle('courses')} className="profile-tab" onClick={() => setActiveTab('courses')}>
          Recent Courses
          {activeTab === 'courses' && <div style={activeTabIndicatorStyle} />}
        </button>
        <button style={getTabStyle('liked')} className="profile-tab" onClick={() => setActiveTab('liked')}>
          Liked Posts
          {activeTab === 'liked' && <div style={activeTabIndicatorStyle} />}
        </button>
      </nav>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfileContent; 