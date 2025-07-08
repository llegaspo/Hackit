"use client";
import React, { useState, memo } from 'react';
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

  const TRUNCATE_LENGTH = 280;
  const isLongPost = content.length > TRUNCATE_LENGTH;

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
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .post-container:hover {
          transform: translateY(-2px);
          box-shadow: 0 0.75rem 2.5rem rgba(0, 0, 0, 0.15);
        }

        .post-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 1.5rem 1rem 1.5rem;
        }

        .post-content {
          padding: 0 1.5rem 1rem 1.5rem;
          cursor: pointer;
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
          transition: all 0.2s ease;
          padding: 0.5rem;
          border-radius: 0.5rem;
        }

        .action-button:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .like-button {
          color: ${liked ? '#E91E63' : '#666'};
        }

        .comment-button {
          color: #666;
        }

        @media (max-width: 768px) {
          .post-container {
            margin-bottom: 1rem;
            border-radius: 0.75rem;
          }

          .post-header {
            padding: 1rem 1rem 0.75rem 1rem;
            gap: 0.75rem;
          }

          .post-content {
            padding: 0 1rem 0.75rem 1rem;
            font-size: 0.9rem;
            line-height: 1.5;
          }

          .post-images {
            padding: 0 1rem 0.75rem 1rem;
          }

          .post-actions {
            padding: 0.75rem 1rem;
          }

          .action-buttons {
            gap: 1rem;
          }

          .action-button {
            font-size: 0.8rem;
            padding: 0.375rem;
          }
        }

        @media (max-width: 480px) {
          .post-container {
            margin-bottom: 0.75rem;
            border-radius: 0.5rem;
          }

          .post-header {
            padding: 0.75rem 0.75rem 0.5rem 0.75rem;
            gap: 0.5rem;
          }

          .post-content {
            padding: 0 0.75rem 0.5rem 0.75rem;
            font-size: 0.85rem;
            line-height: 1.4;
          }

          .post-images {
            padding: 0 0.75rem 0.5rem 0.75rem;
          }

          .post-actions {
            padding: 0.5rem 0.75rem;
          }

          .action-buttons {
            gap: 0.75rem;
          }

          .action-button {
            font-size: 0.75rem;
            padding: 0.25rem;
            gap: 0.375rem;
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
                {`${content.substring(0, TRUNCATE_LENGTH)}...`}
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
              <Heart size={18} fill={liked ? '#E91E63' : 'none'} strokeWidth={1.5} />
              <span>{likeCount}</span>
            </button>
            <button className="action-button comment-button" onClick={handleComment}>
              <MessageCircle size={18} strokeWidth={1.5} />
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