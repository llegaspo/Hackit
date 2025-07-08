"use client";
import React, { useState, useRef, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import { Heart, MessageCircle, X, Send } from 'lucide-react';

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
  };
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  post,
  onLike,
  onComment
}) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentText, setCommentText] = useState('');
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      authorName: "Sarah Johnson",
      content: "This is such valuable insight! Thanks for sharing your experience with micro-influencer collaborations.",
      timeAgo: "1h ago",
      profileColor: "#C8E6C9",
      likes: 12,
      isLiked: false
    },
    {
      id: "2", 
      authorName: "Mike Chen",
      content: "Really appreciate the transparency about your analytics. The 150% engagement increase is impressive!",
      timeAgo: "45m ago",
      profileColor: "#FFE0B2",
      likes: 8,
      isLiked: true
    },
    {
      id: "3",
      authorName: "Emily Rodriguez",
      content: "Would love to hear more about your selection process for micro-influencers. Any specific criteria you look for?",
      timeAgo: "30m ago",
      profileColor: "#F8BBD9",
      likes: 5,
      isLiked: false
    }
  ]);

  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
    
    if (onLike) {
      onLike(post.id);
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        authorName: "You",
        content: commentText.trim(),
        timeAgo: "now",
        profileColor: "#F7C5C5",
        likes: 0,
        isLiked: false
      };
      
      setComments(prev => [...prev, newComment]);
      setCommentText('');
      
      if (onComment) {
        onComment(post.id, commentText.trim());
      }
    }
  };

  const handleCommentTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
    if (commentInputRef.current) {
      commentInputRef.current.style.height = 'auto';
      commentInputRef.current.style.height = `${commentInputRef.current.scrollHeight}px`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const nextImage = () => {
    if (post.images && post.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === post.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (post.images && post.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? post.images!.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!isOpen || !mounted) return null;

  const renderImages = () => {
    if (!post.images || post.images.length === 0) return null;
    
    if (post.images.length === 1) {
      return (
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          marginBottom: '1rem',
          borderRadius: '0.75rem',
          overflow: 'hidden',
        }}>
          <img 
            src={post.images[0]} 
            alt="Post image" 
            style={{ 
              width: '100%', 
              height: 'auto',
              maxHeight: '60vh',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
      );
    }
    
    // Image carousel for multiple images
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        marginBottom: '1rem',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        backgroundColor: '#f8f9fa'
      }}>
        {/* Main Image Display */}
        <div style={{ position: 'relative' }}>
          <img
            src={post.images[currentImageIndex]}
            alt={`Post image ${currentImageIndex + 1}`}
            style={{ 
              width: '100%', 
              height: 'auto',
              maxHeight: '60vh',
              objectFit: 'contain',
              display: 'block'
            }}
          />
          
          {/* Navigation Buttons */}
          {post.images.length > 1 && (
            <>
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
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ‹
              </button>
              
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
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Dot Indicators */}
        {post.images.length > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
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
                  background: index === currentImageIndex ? '#E91E63' : 'rgba(0, 0, 0, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: index === currentImageIndex ? 'scale(1.2)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentImageIndex) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentImageIndex) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              />
            ))}
            
            {/* Image Counter */}
            <span style={{
              marginLeft: '1rem',
              fontSize: '0.875rem',
              color: '#666',
              fontFamily: "'Britti Sans Trial', Inter, sans-serif",
              fontWeight: 500
            }}>
              {currentImageIndex + 1} / {post.images.length}
            </span>
          </div>
        )}
      </div>
    );
  };

  const modalContent = (
    <>
      <style jsx global>{`
        .post-modal-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.1);
          z-index: 9999 !important;
          padding: 3rem 1rem;
          animation: fadeIn 0.3s ease-out;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          box-sizing: border-box;
        }

        .post-modal-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          width: 100%;
          max-width: 56rem;
          height: calc(100vh - 6rem);
          max-height: calc(100vh - 6rem);
          min-height: auto;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s ease-out;
          margin: 0;
          position: relative;
        }

        @media (min-width: 1200px) {
          .post-modal-content {
            max-width: 64rem !important;
          }
        }

        @media (min-width: 1440px) {
          .post-modal-content {
            max-width: 72rem !important;
          }
        }

        .post-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1.5rem 1rem 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          flex-shrink: 0;
        }

        .post-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.5rem;
          min-height: 0;
        }

        .post-modal-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          flex-shrink: 0;
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

        .post-modal-comment-input-container {
          display: flex;
          gap: 0.75rem;
          align-items: flex-end;
        }

        .post-modal-comment-input {
          flex: 1;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 1.25rem;
          padding: 0.75rem 1rem;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          font-size: 0.875rem;
          resize: none;
          max-height: 6rem;
          background: rgba(255, 255, 255, 0.8);
          outline: none;
          transition: all 0.2s ease;
        }

        .post-modal-comment-input:focus {
          border-color: #F7C5C5;
          background: rgba(255, 255, 255, 0.95);
        }

        .post-modal-send-button {
          background: #E91E63;
          border: none;
          border-radius: 50%;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: white;
          flex-shrink: 0;
        }

        .post-modal-send-button:hover {
          background: #C2185B;
          transform: scale(1.05);
        }

        .post-modal-send-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        .post-modal-comment-item {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 0.75rem;
          transition: all 0.2s ease;
        }

        .post-modal-comment-item:hover {
          background: rgba(255, 255, 255, 0.7);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(2rem) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 768px) {
          .post-modal-overlay {
            padding: 1rem 0.5rem !important;
          }

          .post-modal-content {
            height: calc(100vh - 2rem) !important;
            max-height: calc(100vh - 2rem) !important;
            border-radius: 1rem !important;
            margin: 0 !important;
          }

          .post-modal-header, .post-modal-body, .post-modal-footer {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          .post-modal-header {
            padding-top: 1rem !important;
            padding-bottom: 0.75rem !important;
          }

          .post-modal-body {
            padding-top: 0.75rem !important;
            padding-bottom: 0.75rem !important;
          }

          .post-modal-footer {
            padding-top: 0.75rem !important;
            padding-bottom: 1rem !important;
          }

          .post-modal-comment-input-container {
            gap: 0.5rem !important;
          }

          .post-modal-send-button {
            width: 2.25rem !important;
            height: 2.25rem !important;
          }

          .post-modal-comment-item {
            padding: 0.5rem !important;
            margin-bottom: 0.75rem !important;
          }
        }

        @media (max-width: 480px) {
          .post-modal-overlay {
            padding: 0.5rem 0.25rem !important;
          }

          .post-modal-content {
            height: calc(100vh - 1rem) !important;
            max-height: calc(100vh - 1rem) !important;
            border-radius: 0.75rem !important;
            margin: 0 !important;
          }

          .post-modal-header, .post-modal-body, .post-modal-footer {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }

          .post-modal-header {
            padding-top: 0.75rem !important;
            padding-bottom: 0.5rem !important;
          }

          .post-modal-body {
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
          }

          .post-modal-footer {
            padding-top: 0.5rem !important;
            padding-bottom: 0.75rem !important;
          }

          .post-modal-comment-input {
            font-size: 1rem !important;
            padding: 0.625rem 0.75rem !important;
          }

          .post-modal-send-button {
            width: 2rem !important;
            height: 2rem !important;
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
              }} />
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

          {/* Footer - Comment input */}
          <div className="post-modal-footer">
            <div className="post-modal-comment-input-container">
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: '#F7C5C5',
                borderRadius: '50%',
                flexShrink: 0,
              }} />
              <textarea
                ref={commentInputRef}
                className="post-modal-comment-input"
                placeholder="Write a comment..."
                value={commentText}
                onChange={handleCommentTextChange}
                onKeyPress={handleKeyPress}
                rows={1}
              />
              <button
                className="post-modal-send-button"
                onClick={handleCommentSubmit}
                disabled={!commentText.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Use portal to render outside the frosted glass container
  return createPortal(modalContent, document.body);
};

export default memo(PostModal); 