"use client";
import React, { useState, useRef, memo } from 'react';
import { Upload } from 'lucide-react';

interface CreatePostProps {
  user?: {
    profileColor: string;
    avatar?: string; // For future profile image integration
  };
  onPost?: (content: string, files: File[]) => void; // Callback for real data integration
  placeholder?: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ 
  user = {
    profileColor: "#F7C5C5"
  },
  onPost,
  placeholder = "Write a Post"
}) => {
  const [postText, setPostText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handlePost = () => {
    if (postText.trim() || selectedFiles.length > 0) {
      if (onPost) {
        onPost(postText, selectedFiles);
      }
      // Reset form after posting
      setPostText('');
      setSelectedFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height after posting
      }
    }
  };

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*,video/*,.pdf,.doc,.docx';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      setSelectedFiles(prev => [...prev, ...files]);
    };
    input.click();
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
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  };

  const profileCircleStyle: React.CSSProperties = {
    width: '3.125rem',
    height: '3.125rem',
    backgroundColor: user.profileColor,
    borderRadius: '50%',
    flexShrink: 0,
    backgroundImage: user.avatar ? `url(${user.avatar})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    border: 'none',
    background: 'transparent',
    fontSize: '1.125rem',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    fontWeight: 300,
    color: '#333',
    outline: 'none',
    resize: 'none', // Disable manual resizing
    overflowY: 'hidden', // Hide scrollbar
    minHeight: '1.5rem', // Match line-height
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  };

  const uploadButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    fontWeight: 300,
    fontSize: '1rem',
    color: '#666',
    transition: 'all 0.3s ease',
  };

  const postButtonStyle: React.CSSProperties = {
    backgroundColor: '#E91E63',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
    color: '#fff',
    transition: 'all 0.3s ease',
    opacity: (postText.trim() || selectedFiles.length > 0) ? 1 : 0.7,
    boxShadow: '0 0.25rem 0.75rem rgba(233, 30, 99, 0.3)',
  };

  const filePreviewStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
  };

  const fileTagStyle: React.CSSProperties = {
    backgroundColor: 'rgba(247, 197, 197, 0.2)',
    borderRadius: '0.375rem',
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    color: '#666',
  };

  return (
    <>
      <style jsx>{`
        .upload-button:hover {
          background-color: rgba(0, 0, 0, 0.1) !important;
          transform: translateY(-0.0625rem);
        }

        .post-button:hover {
          background-color: #C2185B !important;
          transform: translateY(-0.125rem);
          box-shadow: 0 0.375rem 1.25rem rgba(233, 30, 99, 0.4) !important;
        }

        .create-post-input::placeholder {
          color: #999;
        }

        @media (max-width: 768px) {
          .create-post-container {
            padding: 1rem !important;
            margin-top: -2rem !important;
            margin-bottom: 0.5rem !important;
          }

          .create-post-input {
            font-size: 0.875rem !important;
          }

          .upload-button, .post-button {
            padding: 0.5rem 0.75rem !important;
            font-size: 0.75rem !important;
          }

          .profile-circle {
            width: 2.5rem !important;
            height: 2.5rem !important;
          }
        }
      `}</style>

      <div style={containerStyle} className="create-post-container">
        <div style={headerStyle}>
          <div style={profileCircleStyle} className="profile-circle"></div>
          <textarea
            ref={textareaRef}
            placeholder={placeholder}
            value={postText}
            onChange={handleTextChange}
            style={inputStyle}
            className="create-post-input"
            rows={1}
          />
        </div>
        
        {selectedFiles.length > 0 && (
          <div style={filePreviewStyle}>
            {selectedFiles.map((file, index) => (
              <div key={index} style={fileTagStyle}>
                {file.name}
              </div>
            ))}
          </div>
        )}
        
        <div style={actionsStyle} className="actions-container">
          <button 
            style={uploadButtonStyle} 
            className="upload-button"
            onClick={handleFileSelect}
          >
            <Upload size={16} />
            <span>Upload Files</span>
            {selectedFiles.length > 0 && ` (${selectedFiles.length})`}
          </button>
          
          <button 
            style={postButtonStyle} 
            className="post-button"
            onClick={handlePost}
            disabled={!postText.trim() && selectedFiles.length === 0}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(CreatePost);