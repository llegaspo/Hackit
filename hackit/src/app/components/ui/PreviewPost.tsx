"use client";
import React, { useState, memo, useEffect } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const PreviewPostModal = dynamic(() => import('./PreviewPostModal'), {
  ssr: false
});

interface PostProps {
  id: string;
  authorName: string;
  authorTitle: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  profileColor: string;
  isLiked?: boolean;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  images?: string[];
  avatar?: string;
}

const PreviewPost: React.FC<PostProps> = ({
  id,
  authorName,
  authorTitle,
  timeAgo,
  content,
  likes,
  comments,
  profileColor,
  isLiked = false,
  onComment,
  images = [],
  avatar
}) => {
  const [liked] = useState(isLiked);
  const [likeCount] = useState(likes);
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
  const MOBILE_TRUNCATE_LENGTH = 150;
  const truncateLength = isMobile ? MOBILE_TRUNCATE_LENGTH : DESKTOP_TRUNCATE_LENGTH;
  const isLongPost = content.length > truncateLength;

  const handleLike = () => {
    // Disabled in preview mode - do nothing
    return;
  };

  const handleModalLike = () => {
    // Disabled in preview mode - do nothing
    return;
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
          <Image 
            src={images[0]} 
            alt="Post image" 
            fill
            style={{ 
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
            <Image
              src={image}
              alt={`Post image ${index + 1}`}
              fill
              style={{ 
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
          align-items: center;
          gap: 1.5rem;
          padding: 0 1.5rem 1.5rem 1.5rem;
          transition: all 0.3s ease;
        }

        .post-container:hover .post-actions {
          padding-bottom: 1.75rem;
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
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          padding: 0.5rem 0.75rem;
          border-radius: 0.75rem;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
        }

        .like-button {
          color: ${liked ? '#E91E63' : '#666'};
          opacity: 0.6;
          cursor: not-allowed;
        }

        .like-button:hover {
          color: ${liked ? '#E91E63' : '#666'};
          background: none;
          transform: none;
        }

        .comment-button {
          color: #666;
        }

        .comment-button:hover {
          color: #4A90E2;
          background: rgba(74, 144, 226, 0.05);
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .post-container {
            margin-bottom: 1rem;
            border-radius: 1rem;
          }

          .post-header {
            padding: 1rem 1rem 0.75rem 1rem;
          }

          .post-content {
            padding: 0 1rem 0.75rem 1rem;
          }

          .post-images {
            padding: 0 1rem 0.75rem 1rem;
          }

          .post-actions {
            padding: 0 1rem 1rem 1rem;
            gap: 1rem;
          }

          .action-button {
            font-size: 0.8rem;
            padding: 0.4rem 0.6rem;
          }
        }
      `}</style>

      <div className="post-container">
        {/* Header */}
        <div className="post-header">
          <div 
            className="profile-avatar"
            style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: profileColor,
              borderRadius: '50%',
              flexShrink: 0,
              backgroundImage: avatar ? `url(${avatar})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: "'Britti Sans Trial', Inter, sans-serif",
            }} 
          >
            {!avatar && authorName.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div 
              className="author-name"
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#333',
                fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                lineHeight: '1.3',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {authorName}
            </div>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: 300,
              color: '#666',
              fontFamily: "'Britti Sans Trial', Inter, sans-serif",
              lineHeight: '1.2',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
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
            {isExpanded || !isLongPost 
              ? content 
              : `${content.slice(0, truncateLength)}...`}
            {isLongPost && !isExpanded && (
              <button 
                style={readMoreButtonStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
              >
                read more
              </button>
            )}
          </div>
        </div>

        {/* Images */}
        {images.length > 0 && (
          <div className="post-images" onClick={handleImageClick}>
            {renderImages()}
          </div>
        )}

        {/* Actions */}
        <div className="post-actions">
          <button className="action-button like-button" onClick={handleLike}>
            <Heart size={18} fill={liked ? '#E91E63' : 'none'} strokeWidth={1.5} />
            <span>{likeCount}</span>
          </button>
          <button className="action-button comment-button" onClick={handleComment}>
            <MessageCircle size={18} strokeWidth={1.5} />
            <span>{comments}</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <PreviewPostModal
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
            images,
            avatar,
          }}
          onLike={handleModalLike}
          onComment={onComment}
        />
      )}
    </div>
  );
};

export default memo(PreviewPost); 