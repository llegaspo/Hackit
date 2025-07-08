"use client";
import React, { useState, memo } from 'react';
import Image from 'next/image';
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

  const containerStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginBottom: '1rem',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 0.5rem 2rem rgba(0, 0, 0, 0.1)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1rem',
  };

  const profileCircleStyle: React.CSSProperties = {
    width: '3.125rem',
    height: '3.125rem',
    backgroundColor: profileColor,
    borderRadius: '50%',
    flexShrink: 0,
  };

  const userInfoStyle: React.CSSProperties = {
    flex: 1,
  };

  const nameStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#333',
    marginBottom: '0.25rem',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 300,
    color: '#666',
    marginBottom: '0.25rem',
  };

  const timeStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 300,
    color: '#999',
    textAlign: 'right' as const,
  };

  const contentStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 300,
    color: '#333',
    lineHeight: '1.5',
    marginBottom: images.length > 0 ? '1rem' : '1rem',
    whiteSpace: 'pre-wrap',
    cursor: 'pointer',
  };

  const imageWrapperStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    display: 'block',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    cursor: 'pointer',
  };

  const multiImageGridStyle: React.CSSProperties = {
    display: 'grid',
    gap: '2px',
    gridTemplateColumns: images.length === 2 ? '1fr 1fr' : 
                        images.length === 3 ? '2fr 1fr' : 
                        images.length >= 4 ? '1fr 1fr' : '1fr',
    gridAutoRows: '12.5rem',
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  };

  const actionButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 600, // Bolder for visibility
    color: liked ? '#E91E63' : '#555', // Vibrant pink when liked, darker grey when not
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    transition: 'all 0.2s ease',
  };

  const commentButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 300,
    color: '#666',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    transition: 'all 0.2s ease',
  };

  const renderImages = () => {
    if (images.length === 0) return null;
    
    if (images.length === 1) {
      return (
        <div 
          style={{...imageWrapperStyle, height: '25rem', marginBottom: '1rem' }}
          onClick={handleImageClick}
        >
          <Image 
            src={images[0]} 
            alt="Post image" 
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      );
    }
    
    // Multiple images in grid layout
    return (
      <div style={{...multiImageGridStyle, marginBottom: '1rem'}}>
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            style={{
              ...imageWrapperStyle,
              gridColumn: images.length === 3 && index === 0 ? 'span 1' : 'auto',
              gridRow: images.length === 3 && index === 0 ? 'span 2' : 'auto',
            }}
            onClick={handleImageClick}
          >
            <Image
              src={image}
              alt={`Post image ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 50vw, 33vw"
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
    <>
      <style jsx>{`
        .comment-button:hover, .like-button:not(.liked):hover {
          color: #E91E63 !important;
          transform: scale(1.05);
        }

        .like-button.liked:hover {
          color: #C2185B !important;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .post-container {
            padding: 1rem !important;
          }

          .post-profile-circle {
            width: 2.5rem !important;
            height: 2.5rem !important;
          }

          .post-name {
            font-size: 0.875rem !important;
          }

          .post-title {
            font-size: 0.75rem !important;
          }

          .post-content {
            font-size: 0.8125rem !important;
          }

          .action-button {
            font-size: 0.75rem !important;
          }

          .post-images img {
            max-height: 18.75rem !important;
          }

          .post-grid-image {
            height: 9.375rem !important;
          }
        }
      `}</style>

      <div style={containerStyle} className="post-container">
        <div style={headerStyle}>
          <div style={profileCircleStyle} className="post-profile-circle"></div>
          <div style={userInfoStyle}>
            <div style={nameStyle} className="post-name">{authorName}</div>
            <div style={titleStyle} className="post-title">{authorTitle}</div>
          </div>
          <div style={timeStyle}>{timeAgo}</div>
        </div>
        
        <div style={contentStyle} className="post-content" onClick={handleContentClick}>
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
        
        {renderImages()}
        
        <div style={actionsStyle}>
          <button
            style={actionButtonStyle}
            className={`like-button action-button ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <Heart size={20} fill={liked ? '#E91E63' : 'none'} strokeWidth={1.5} />
            <span>{likeCount}</span>
          </button>
          <button
            style={commentButtonStyle}
            className="comment-button action-button"
            onClick={handleComment}
          >
            <MessageCircle size={20} strokeWidth={1.5} />
            <span>{comments}</span>
          </button>
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
        onLike={onLike}
        onComment={onComment}
      />
    </>
  );
};

export default memo(Post);