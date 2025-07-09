"use client";
import React, { useState } from 'react';
import { FileText, BookOpen, Heart, TrendingUp, Clock, Star } from 'lucide-react';
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
  avatar?: string;
}

interface CurrentUser {
  id: string;
  name: string;
  role: string;
  profileColor: string;
  avatar?: string;
}

interface ProfileContentProps {
  posts: PostData[];
  currentUser: CurrentUser;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ posts, currentUser }) => {
  const [activeTab, setActiveTab] = useState('posts');

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div style={{
            maxWidth: '650px',
            margin: '0 auto',
          }}>
            {posts.map((post) => (
              <Post key={post.id} {...post} currentUser={currentUser} />
            ))}
          </div>
        );
      case 'courses':
        return (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            padding: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Women Business-Oriented Course Cards */}
            {[
              {
                title: "Women Leadership in Tech",
                instructor: "Sarah Williams, CEO",
                duration: "14 hours",
                rating: 4.9,
                students: 3241,
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop&crop=center",
                progress: 65,
                color: "#E91E63"
              },
              {
                title: "Female Entrepreneurship Masterclass",
                instructor: "Maria Rodriguez, Founder",
                duration: "18 hours",
                rating: 4.8,
                students: 2156,
                image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop&crop=center",
                progress: 80,
                color: "#9C27B0"
              },
              {
                title: "Building Your Personal Brand",
                instructor: "Jennifer Chen, CMO",
                duration: "10 hours",
                rating: 4.7,
                students: 1892,
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&crop=center",
                progress: 40,
                color: "#673AB7"
              },
              {
                title: "Women in Finance & Investing",
                instructor: "Lisa Thompson, CFO",
                duration: "16 hours",
                rating: 4.9,
                students: 2734,
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop&crop=center",
                progress: 90,
                color: "#3F51B5"
              },
              {
                title: "Networking for Professional Women",
                instructor: "Amanda Davis, VP",
                duration: "8 hours",
                rating: 4.6,
                students: 1567,
                image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=200&fit=crop&crop=center",
                progress: 25,
                color: "#2196F3"
              },
              {
                title: "Work-Life Balance Strategies",
                instructor: "Rachel Green, Coach",
                duration: "12 hours",
                rating: 4.8,
                students: 3089,
                image: "https://images.unsplash.com/photo-1494790108755-2616c043fe65?w=300&h=200&fit=crop&crop=center",
                progress: 55,
                color: "#009688"
              }
            ].map((course, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 0.5rem 2rem rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0.5rem 2rem rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{
                  height: '12rem',
                  background: `linear-gradient(135deg, ${course.color}22, ${course.color}44)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <BookOpen size={48} color={course.color} />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <Star size={12} fill="#FFD700" color="#FFD700" />
                    {course.rating}
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontFamily: "'Britti Sans Trial', Inter, sans-serif"
                  }}>
                    {course.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#666',
                    marginBottom: '1rem',
                    fontFamily: "'Britti Sans Trial', Inter, sans-serif"
                  }}>
                    by {course.instructor}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    fontSize: '0.75rem',
                    color: '#888'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} />
                      {course.duration}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <TrendingUp size={12} />
                      {course.students.toLocaleString()} students
                    </span>
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#666'
                    }}>
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div style={{
                      height: '0.5rem',
                      background: 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '0.25rem',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${course.progress}%`,
                        background: `linear-gradient(90deg, ${course.color}, ${course.color}CC)`,
                        borderRadius: '0.25rem',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'liked':
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 2rem',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 1rem 3rem rgba(0, 0, 0, 0.1)',
              padding: '3rem 2rem',
              width: '100%'
            }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #E91E63, #F06292)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                animation: 'pulse 2s infinite'
              }}>
                <Heart size={24} fill="white" color="white" />
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#333',
                marginBottom: '1rem',
                fontFamily: "'Britti Sans Trial', Inter, sans-serif"
              }}>
                Liked Posts Coming Soon!
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#666',
                lineHeight: '1.6',
                fontFamily: "'Britti Sans Trial', Inter, sans-serif"
              }}>
                We&apos;re working on bringing you a beautiful collection of your favorite posts. Stay tuned for this exciting feature!
              </p>
            </div>
            <style jsx>{`
              @keyframes pulse {
                0% {
                  transform: scale(1);
                  box-shadow: 0 0 0 0 rgba(233, 30, 99, 0.7);
                }
                70% {
                  transform: scale(1.05);
                  box-shadow: 0 0 0 10px rgba(233, 30, 99, 0);
                }
                100% {
                  transform: scale(1);
                  box-shadow: 0 0 0 0 rgba(233, 30, 99, 0);
                }
              }
            `}</style>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <style jsx>{`
        .modern-tab {
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 2rem !important;
          padding: 0.75rem 1.5rem !important;
          font-size: 1rem !important;
          font-weight: 600 !important;
          color: #666 !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
          margin: 0 !important;
          font-family: 'Britti Sans Trial', Inter, sans-serif !important;
        }

        .modern-tab:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1) !important;
          color: #333 !important;
          background: rgba(255, 255, 255, 0.9) !important;
        }

        .modern-tab.active {
          background: linear-gradient(135deg, #E91E63, #F06292) !important;
          color: white !important;
          box-shadow: 0 0.5rem 2rem rgba(233, 30, 99, 0.3) !important;
          transform: translateY(-2px) !important;
        }

        .modern-tab.active:hover {
          background: linear-gradient(135deg, #C2185B, #E91E63) !important;
          color: white !important;
        }

        .tabs-container {
          display: flex !important;
          justify-content: center !important;
          gap: 1rem !important;
          margin: 2rem 0 !important;
          padding: 1rem !important;
          background: rgba(255, 255, 255, 0.3) !important;
          backdrop-filter: blur(20px) !important;
          border-radius: 3rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          max-width: 600px !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        @media (max-width: 768px) {
          .tabs-container {
            gap: 0.5rem !important;
            margin: 1.5rem auto !important;
            padding: 0.75rem !important;
            max-width: 95% !important;
          }
          
          .modern-tab {
            padding: 0.5rem 1rem !important;
            font-size: 0.875rem !important;
          }
        }

        @media (max-width: 480px) {
          .tabs-container {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
          
          .modern-tab {
            justify-content: center !important;
          }
        }
      `}</style>
      
      <nav className="tabs-container">
        <button 
          className={`modern-tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <FileText size={18} />
          Recent Posts
        </button>
        <button 
          className={`modern-tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          <BookOpen size={18} />
          Recent Courses
        </button>
        <button 
          className={`modern-tab ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          <Heart size={18} />
          Liked Posts
        </button>
      </nav>
      
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfileContent; 