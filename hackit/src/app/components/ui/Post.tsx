"use client";
import React, { useState, memo, useEffect } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import PostModal from './PostModal';

interface PostProps {
  id: string; // Add ID for real data integration
  authorName: string;
  authorTitle: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  profileColor: string;
  isLiked?: boolean; // Add liked state
  onLike?: (postId: string) => void; // Callback for real data integration
  onComment?: (postId: string) => void; // Callback for real data integration
  images?: string[]; // Add support for multiple images
}

const Post: React.FC<PostProps> = ({
  id,
  authorName,
  authorTitle,
  timeAgo,
  content,
  likes,
  comments,
  profileColor,
  isLiked = false,
  onLike,
  onComment,
  images = []
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive truncation lengths
  const DESKTOP_TRUNCATE_LENGTH = 280;
  const MOBILE_TRUNCATE_LENGTH = 150; // Much shorter for mobile
  const truncateLength = isMobile ? MOBILE_TRUNCATE_LENGTH : DESKTOP_TRUNCATE_LENGTH;
  const isLongPost = content.length > truncateLength;

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    
    // Call the callback for real data integration
    if (onLike) {
      onLike(id);
    }
  };

  const handleModalLike = (postId: string) => {
    // Update the main post state when liked from modal
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    
    // Call the callback for real data integration
    if (onLike) {
      onLike(postId);
    }
  };

  const handleComment = () => {
    setIsModalOpen(true);
  };

  const handleContentClick = () => {
    if (isLongPost && !isExpanded) {
      setIsExpanded(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const readMoreButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#888',
    fontWeight: 700,
    cursor: 'pointer',
    padding: '0',
    marginLeft: '0.25rem',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    fontSize: '1rem',
  };

  const renderImages = () => {
    if (images.length === 0) return null;
    
    if (images.length === 1) {
      return (
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '25rem', 
          borderRadius: '0.75rem', 
          overflow: 'hidden',
          marginBottom: '1rem'
        }}>
          <img 
            src={images[0]} 
            alt="Post image" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
        </div>
      );
    }
    
    // Multiple images in grid layout
    return (
      <div style={{
        display: 'grid',
        gap: '2px',
        gridTemplateColumns: images.length === 2 ? '1fr 1fr' : 
                            images.length === 3 ? '2fr 1fr' : 
                            images.length >= 4 ? '1fr 1fr' : '1fr',
        gridAutoRows: '12.5rem',
        marginBottom: '1rem'
      }}>
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              gridColumn: images.length === 3 && index === 0 ? 'span 1' : 'auto',
              gridRow: images.length === 3 && index === 0 ? 'span 2' : 'auto',
            }}
          >
            <img
              src={image}
              alt={`Post image ${index + 1}`}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
            />
            {images.length > 4 && index === 3 && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.125rem',
                fontWeight: 600,
              }}>
                +{images.length - 4}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <style jsx>{`
        .post-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
          position: relative;
        }

        .post-container::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, transparent, rgba(247, 197, 197, 0.3), transparent);
          border-radius: 1.25rem;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .post-container:hover {
          transform: translateY(-0.375rem) scale(1.01);
          box-shadow: 0 1.25rem 3rem rgba(0, 0, 0, 0.2);
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(247, 197, 197, 0.2);
        }

        .post-container:hover::before {
          opacity: 1;
        }

        .post-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 1.5rem 1rem 1.5rem;
          transition: all 0.3s ease;
        }

        .post-container:hover .post-header {
          padding-top: 1.75rem;
        }

        .profile-avatar {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .post-container:hover .profile-avatar {
          transform: scale(1.1);
          box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
        }

        .author-name {
          transition: all 0.3s ease;
        }

        .post-container:hover .author-name {
          color: #E91E63;
        }

        .post-content {
          padding: 0 1.5rem 1rem 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .post-container:hover .post-content {
          color: #222;
        }

        .post-images {
          padding: 0 1.5rem 1rem 1.5rem;
          cursor: pointer;
        }

        .post-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .post-container:hover .post-actions {
          background: rgba(247, 197, 197, 0.1);
          border-top-color: rgba(247, 197, 197, 0.2);
        }

        .action-buttons {
          display: flex;
          gap: 1.5rem;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          padding: 0.625rem 1rem;
          border-radius: 0.75rem;
          position: relative;
          overflow: hidden;
        }

        .action-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(247, 197, 197, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .action-button:hover::before {
          left: 100%;
        }

        .action-button:hover {
          background: rgba(247, 197, 197, 0.15);
          transform: translateY(-0.125rem) scale(1.05);
          box-shadow: 0 0.375rem 1rem rgba(247, 197, 197, 0.3);
          border: 1px solid rgba(247, 197, 197, 0.3);
        }

        .action-button:active {
          transform: translateY(0) scale(0.95);
        }

        .like-button {
          color: ${liked ? '#E91E63' : '#666'};
        }

        .like-button:hover {
          color: #E91E63 !important;
        }

        .like-button.liked {
          color: #E91E63;
          background: rgba(233, 30, 99, 0.1);
        }

        .like-button.liked:hover {
          background: rgba(233, 30, 99, 0.2);
          transform: translateY(-0.125rem) scale(1.1);
        }

        .comment-button:hover {
          color: #7C3AED;
        }

        .like-count {
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .post-container:hover .like-count {
          color: #E91E63;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .post-container {
            margin-bottom: 1rem;
            border-radius: 1rem;
          }

          .post-container:hover {
            transform: translateY(-0.25rem) scale(1.005);
          }

          .post-header,
          .post-content,
          .post-images,
          .post-actions {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          .post-content {
            font-size: 0.875rem !important;
          }

          .action-button {
            padding: 0.5rem 0.75rem !important;
            font-size: 0.75rem !important;
          }

          .action-button:hover {
            transform: translateY(-0.0625rem) scale(1.02) !important;
          }
        }
      `}</style>

      <div className="post-container">
        {/* Header */}
        <div className="post-header">
          <div style={{
            width: '3rem',
            height: '3rem',
            backgroundColor: profileColor,
            borderRadius: '50%',
          }} />
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: '#333',
              fontFamily: "'Britti Sans Trial', Inter, sans-serif",
            }}>
              {authorName}
            </div>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: 300,
              color: '#666',
              fontFamily: "'Britti Sans Trial', Inter, sans-serif",
            }}>
              {authorTitle} • {timeAgo}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="post-content" onClick={handleContentClick}>
          <div style={{
            fontSize: '1rem',
            fontWeight: 300,
            color: '#333',
            lineHeight: '1.6',
            fontFamily: "'Britti Sans Trial', Inter, sans-serif",
            whiteSpace: 'pre-wrap',
          }}>
            {isLongPost && !isExpanded ? (
              <>
                {`${content.substring(0, truncateLength)}...`}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(true);
                  }} 
                  style={readMoreButtonStyle} 
                  className="read-more-button"
                >
                  more
                </button>
              </>
            ) : (
              <>
                {content}
                {isLongPost && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                    }} 
                    style={readMoreButtonStyle} 
                    className="read-more-button"
                  >
                    less
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Images */}
        {images && images.length > 0 && (
          <div className="post-images" onClick={handleImageClick}>
            {renderImages()}
          </div>
        )}

        {/* Actions */}
        <div className="post-actions">
          <div className="action-buttons">
            <button className="action-button like-button" onClick={handleLike}>
              <Heart size={isMobile ? 24 : 18} fill={liked ? '#E91E63' : 'none'} strokeWidth={1.5} />
              <span>{likeCount}</span>
            </button>
            <button className="action-button comment-button" onClick={handleComment}>
              <MessageCircle size={isMobile ? 24 : 18} strokeWidth={1.5} />
              <span>{comments}</span>
            </button>
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#999',
            fontFamily: "'Britti Sans Trial', Inter, sans-serif",
          }}>
            {timeAgo}
          </div>
        </div>
      </div>

      <PostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={{
          id,
          authorName,
          authorTitle,
          timeAgo,
          content,
          likes: likeCount,
          comments,
          profileColor,
          isLiked: liked,
          images
        }}
        onLike={handleModalLike}
        onComment={onComment}
      />
    </div>
  );
};

export default memo(Post);