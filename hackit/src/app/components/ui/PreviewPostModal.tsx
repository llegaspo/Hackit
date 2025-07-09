"use client";
import React, { useState, useRef, useEffect, memo } from 'react';
import { X, Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface Comment {
  id: string;
  authorName: string;
  content: string;
  timeAgo: string;
  profileColor: string;
  likes: number;
  isLiked: boolean;
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
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
  };
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
}

const PreviewPostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  post
}) => {
  const [liked] = useState(post.isLiked || false);
  const [likeCount] = useState(post.likes);
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      authorName: 'Sarah Johnson',
      content: 'This is such great content! Thanks for sharing.',
      timeAgo: '2h',
      profileColor: '#FFB6C1',
      likes: 5,
      isLiked: false,
    },
    {
      id: '2',
      authorName: 'Emma Wilson',
      content: 'I love this perspective! Very insightful.',
      timeAgo: '4h',
      profileColor: '#87CEEB',
      likes: 3,
      isLiked: true,
    },
    {
      id: '3',
      authorName: 'Chloe Martinez',
      content: 'Amazing work! Keep it up!',
      timeAgo: '6h',
      profileColor: '#DDA0DD',
      likes: 8,
      isLiked: false,
    },
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLike = () => {
    // Disabled in preview mode - do nothing
    return;
  };

  const nextImage = () => {
    if (post.images && currentImageIndex < post.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const renderImages = () => {
    if (!post.images || post.images.length === 0) return null;

    if (post.images.length === 1) {
      return (
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxHeight: '30rem', 
          borderRadius: '0.75rem', 
          overflow: 'hidden',
          marginBottom: '1rem'
        }}>
          <Image 
            src={post.images[0]} 
            alt="Post image" 
            width={800}
            height={480}
            style={{ 
              width: '100%', 
              height: 'auto',
              maxHeight: '30rem',
              objectFit: 'cover' 
            }}
          />
        </div>
      );
    }

    return (
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        maxHeight: '30rem', 
        borderRadius: '0.75rem', 
        overflow: 'hidden',
        marginBottom: '1rem',
        backgroundColor: '#f0f0f0'
      }}>
        <Image 
          src={post.images[currentImageIndex]} 
          alt={`Post image ${currentImageIndex + 1}`} 
          width={800}
          height={480}
          style={{ 
            width: '100%', 
            height: 'auto',
            maxHeight: '30rem',
            objectFit: 'cover' 
          }}
        />
        
        {/* Navigation arrows */}
        {currentImageIndex > 0 && (
          <button
            onClick={prevImage}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              transition: 'all 0.2s ease',
            }}
          >
            <ChevronLeft size={20} />
          </button>
        )}
        
        {currentImageIndex < post.images.length - 1 && (
          <button
            onClick={nextImage}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              transition: 'all 0.2s ease',
            }}
          >
            <ChevronRight size={20} />
          </button>
        )}
        
        {/* Image indicators */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem',
        }}>
          {post.images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              style={{
                width: '0.75rem',
                height: '0.75rem',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const modalContent = (
    <>
      <style jsx>{`
        .post-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
        }

        .post-modal-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 42rem;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          position: relative;
          animation: modalAppear 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(2rem);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .post-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1.5rem 1rem 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .post-modal-close-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          color: #666;
        }

        .post-modal-close-button:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #333;
        }

        .post-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 0 1.5rem;
          max-height: 60vh;
        }

        .post-modal-comment-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .post-modal-footer {
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
        }

        .preview-comment-restriction {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(255, 105, 180, 0.1));
          border: 2px solid rgba(233, 30, 99, 0.2);
          border-radius: 1rem;
          padding: 1rem 1.5rem;
          text-align: center;
        }

        .restriction-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .restriction-text {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          margin: 0;
        }

        .restriction-subtext {
          font-size: 0.875rem;
          color: #666;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          margin: 0;
        }

        .restriction-buttons {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .restriction-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
          white-space: nowrap;
        }

        .sign-up-button {
          background: linear-gradient(135deg, #E91E63, #FF6B9D);
          color: white;
          box-shadow: 0 0.25rem 0.75rem rgba(233, 30, 99, 0.3);
        }

        .sign-up-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 0.5rem 1rem rgba(233, 30, 99, 0.4);
        }

        .log-in-button {
          background: rgba(255, 255, 255, 0.8);
          color: #333;
          border: 1px solid rgba(233, 30, 99, 0.3);
        }

        .log-in-button:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-1px);
          box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .post-modal-content {
            margin: 0.5rem;
            max-width: none;
            max-height: 95vh;
            border-radius: 1rem;
          }

          .post-modal-header {
            padding: 1rem 1rem 0.75rem 1rem;
          }

          .post-modal-body {
            padding: 0 1rem;
            max-height: 70vh;
          }

          .post-modal-footer {
            padding: 1rem;
          }

          .post-modal-comment-item {
            padding: 0.75rem;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
          }

          .restriction-buttons {
            flex-direction: row;
            gap: 0.5rem;
          }

          .restriction-button {
            flex: 1;
            padding: 0.75rem 1rem;
            font-size: 0.8rem;
            white-space: nowrap;
          }
        }
      `}</style>

      <div className="post-modal-overlay" onClick={onClose}>
        <div 
          className="post-modal-content" 
          ref={modalContentRef}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="post-modal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: post.profileColor,
                borderRadius: '50%',
                backgroundImage: post.avatar ? `url(${post.avatar})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: "'Britti Sans Trial', Inter, sans-serif",
              }}>
                {!post.avatar && post.authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#333',
                  fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                }}>
                  {post.authorName}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 300,
                  color: '#666',
                  fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                }}>
                  {post.authorTitle}
                </div>
              </div>
            </div>
            <button className="post-modal-close-button" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="post-modal-body">
            {/* Post content */}
            <div style={{
              fontSize: '1rem',
              fontWeight: 300,
              color: '#333',
              lineHeight: '1.6',
              marginBottom: '1rem',
              fontFamily: "'Britti Sans Trial', Inter, sans-serif",
              whiteSpace: 'pre-wrap',
            }}>
              {post.content}
            </div>

            {/* Images */}
            {renderImages()}

            {/* Post actions */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              paddingBottom: '1rem',
              marginBottom: '1rem',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            }}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: liked ? '#E91E63' : '#666',
                  fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                  transition: 'all 0.2s ease',
                }}
                onClick={handleLike}
              >
                <Heart size={18} fill={liked ? '#E91E63' : 'none'} strokeWidth={1.5} />
                <span>{likeCount}</span>
              </button>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 300,
                color: '#666',
                fontFamily: "'Britti Sans Trial', Inter, sans-serif",
              }}>
                <MessageCircle size={18} strokeWidth={1.5} />
                <span>{comments.length}</span>
              </div>
            </div>

            {/* Comments */}
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#333',
                marginBottom: '1rem',
                fontFamily: "'Britti Sans Trial', Inter, sans-serif",
              }}>
                Comments
              </h4>
              
              {comments.map((comment) => (
                <div key={comment.id} className="post-modal-comment-item">
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundColor: comment.profileColor,
                    borderRadius: '50%',
                    flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.25rem',
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#333',
                        fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                      }}>
                        {comment.authorName}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#999',
                        fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                      }}>
                        {comment.timeAgo}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: '#555',
                      lineHeight: '1.4',
                      fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                    }}>
                      {comment.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer - Comment restriction */}
          <div className="post-modal-footer">
            <div className="preview-comment-restriction">
              <div className="restriction-message">
                <p className="restriction-text">You need an account to comment</p>
                <p className="restriction-subtext">Join the community to share your thoughts!</p>
                <div className="restriction-buttons">
                  <a href="/sign-up" className="restriction-button sign-up-button">
                    Sign Up
                  </a>
                  <a href="/sign-in" className="restriction-button log-in-button">
                    Log In
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Use portal to render outside the frosted glass container
  return createPortal(modalContent, document.body);
};

export default memo(PreviewPostModal); 