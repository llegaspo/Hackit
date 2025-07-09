"use client";
import React, { useState } from 'react';
import { Save, X, User, Briefcase, MapPin, Globe, Camera, Palette } from 'lucide-react';

interface EditProfileProps {
  user: {
    name: string;
    businessPosition: string;
    location: string;
    avatarColor: string;
    avatar?: string;
    website?: string;
  };
  onSave: (updatedUser: {
    name: string;
    businessPosition: string;
    location: string;
    avatarColor: string;
    avatar?: string;
    website?: string;
  }) => void;
  onCancel: () => void;
  onSkip?: () => void;
  isFirstVisit?: boolean;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onSave, onCancel, onSkip, isFirstVisit }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    businessPosition: user.businessPosition,
    location: user.location,
    website: user.website || '',
    avatarColor: user.avatarColor,
    avatar: user.avatar || '',
  });

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-defined color palette
  const colorOptions = [
    '#F7C5C5', '#FFB6C1', '#DDA0DD', '#98FB98', 
    '#87CEEB', '#F0E68C', '#FFA07A', '#20B2AA',
    '#FF69B4', '#32CD32', '#FF6347', '#4169E1',
    '#DA70D6', '#FF8C00', '#00CED1', '#9370DB'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }

    // Hide error message when user starts fixing issues
    if (showErrorMessage) {
      setShowErrorMessage(false);
    }
  };

  const handleColorChange = (color: string) => {
    setFormData(prev => ({
      ...prev,
      avatarColor: color
    }));
    setShowColorPicker(false);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          avatar: result
        }));
        setIsUploading(false);
      };
      reader.onerror = () => {
        setIsUploading(false);
        alert('Error uploading image. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setFormData(prev => ({
      ...prev,
      avatar: ''
    }));
  };

  const handleSave = () => {
    // Validate required fields
    const errors = [];
    const newValidationErrors: Record<string, boolean> = {};
    
    if (!formData.name.trim()) {
      errors.push('Full name is required');
      newValidationErrors.name = true;
    }
    if (!formData.businessPosition.trim()) {
      errors.push('Business position is required');
      newValidationErrors.businessPosition = true;
    }
    if (!formData.location.trim()) {
      errors.push('Location is required');
      newValidationErrors.location = true;
    }

    setValidationErrors(newValidationErrors);

    // If there are validation errors, show error message and return early
    if (errors.length > 0) {
      setErrorMessage('Please fill in all required fields: ' + errors.join(', '));
      setShowErrorMessage(true);
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
      
      return;
    }

    // Clear any existing error messages
    setShowErrorMessage(false);
    setErrorMessage('');

    const updatedUser = {
      ...user,
      ...formData,
      website: formData.website.trim() || undefined
    };
    onSave(updatedUser);
  };

  const handleAvatarClick = () => {
    const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '650px', margin: '0 auto' }}>
      <style jsx>{`
        .edit-profile-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1);
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          font-family: 'Britti Sans Trial', Inter, sans-serif;
        }

        .edit-profile-container:hover {
          transform: translateY(-0.25rem);
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15);
          background: rgba(255, 255, 255, 0.95);
        }

        .edit-profile-header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .edit-profile-title {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #E91E63, #9C27B0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 0.5rem 0;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          letter-spacing: -0.02em;
        }

        .edit-profile-subtitle {
          font-size: 1rem;
          color: #666;
          font-weight: 300;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
        }

        .profile-avatar-edit {
          width: 6rem;
          height: 6rem;
          borderRadius: 50%;
          backgroundColor: ${formData.avatarColor};
          margin: 0 auto 1.5rem auto;
          border: 0.25rem solid rgba(255, 255, 255, 0.9);
          boxShadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          position: relative;
          backgroundImage: ${formData.avatar ? `url(${formData.avatar})` : 'none'};
          backgroundSize: cover;
          backgroundPosition: center;
          cursor: pointer;
          display: flex;
          alignItems: center;
          justifyContent: center;
          fontSize: 1.5rem;
          fontWeight: 700;
          color: white;
          textShadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          fontFamily: 'Britti Sans Trial', Inter, sans-serif;
        }

        .profile-avatar-edit:hover {
          transform: scale(1.05);
          boxShadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.2);
        }

        .avatar-preview-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          borderRadius: 50%;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          alignItems: center;
          justifyContent: center;
          opacity: 0;
          transition: all 0.3s ease;
          color: white;
          fontSize: 0.75rem;
          fontWeight: 600;
          textAlign: center;
          padding: 1rem;
        }

        .profile-avatar-edit:hover .avatar-preview-overlay {
          opacity: 1;
        }

        .avatar-controls {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
        }

        .avatar-button {
          padding: 0.5rem 0.75rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
        }

        .upload-button {
          background: linear-gradient(135deg, #4A90E2, #357ABD);
          color: white;
          box-shadow: 0 0.25rem 0.5rem rgba(74, 144, 226, 0.3);
        }

        .upload-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 0.5rem 1rem rgba(74, 144, 226, 0.4);
        }

        .color-button {
          background: rgba(255, 255, 255, 0.8);
          color: #333;
          border: 2px solid rgba(74, 144, 226, 0.3);
        }

        .color-button:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
          border-color: rgba(74, 144, 226, 0.5);
        }

        .remove-button {
          background: rgba(255, 255, 255, 0.8);
          color: #E91E63;
          border: 2px solid rgba(233, 30, 99, 0.3);
        }

        .remove-button:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
          border-color: rgba(233, 30, 99, 0.5);
        }

        .color-picker {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 1rem;
          padding: 1rem;
          box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          z-index: 10;
          margin-top: 0.5rem;
        }

        .color-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          max-width: 200px;
        }

        .color-option {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .color-option:hover {
          transform: scale(1.1);
          box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
        }

        .color-option.selected::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-weight: bold;
          text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          font-size: 1rem;
          font-weight: 300;
          color: #333;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .form-input.error {
          border-color: #E91E63;
          background: rgba(233, 30, 99, 0.05);
          box-shadow: 0 0.25rem 1rem rgba(233, 30, 99, 0.2);
        }

        .error-notification {
          background: rgba(233, 30, 99, 0.1);
          border: 1px solid rgba(233, 30, 99, 0.3);
          border-radius: 0.75rem;
          padding: 1rem;
          margin-bottom: 1.5rem;
          color: #E91E63;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          text-align: center;
          animation: slideDown 0.3s ease-out;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .error-close-btn {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          color: #E91E63;
          cursor: pointer;
          font-size: 1.125rem;
          font-weight: bold;
          padding: 0;
          line-height: 1;
          transition: all 0.2s ease;
        }

        .error-close-btn:hover {
          color: #C2185B;
          transform: scale(1.1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-input:focus {
          outline: none;
          border-color: #F7C5C5;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0.25rem 1rem rgba(247, 197, 197, 0.3);
          transform: translateY(-0.0625rem);
        }

        .form-input::placeholder {
          color: #999;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }

        .action-button {
          padding: 0.875rem 1.5rem;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 0.875rem;
          font-family: 'Britti Sans Trial', Inter, sans-serif;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 120px;
          justify-content: center;
        }

        .save-button {
          background: linear-gradient(135deg, #E91E63, #FF6B9D);
          color: white;
          box-shadow: 0 0.5rem 1rem rgba(233, 30, 99, 0.3);
        }

        .save-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 0.75rem 1.5rem rgba(233, 30, 99, 0.4);
          background: linear-gradient(135deg, #D81B60, #E91E63);
        }

        .cancel-button {
          background: rgba(255, 255, 255, 0.8);
          color: #333;
          border: 2px solid rgba(233, 30, 99, 0.3);
        }

        .cancel-button:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
          border-color: rgba(233, 30, 99, 0.5);
          color: #E91E63;
        }

        @media (max-width: 768px) {
          .edit-profile-container {
            padding: 1rem;
            margin: 0;
            border-radius: 1rem;
            min-height: calc(100vh - 2rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .edit-profile-header {
            margin-bottom: 1.5rem;
          }

          .edit-profile-title {
            font-size: 1.5rem;
            line-height: 1.3;
            margin-bottom: 0.75rem;
          }

          .edit-profile-subtitle {
            font-size: 0.875rem;
            line-height: 1.4;
            padding: 0 0.5rem;
          }

          .profile-avatar-edit {
            width: 4.5rem !important;
            height: 4.5rem !important;
            fontSize: 1.125rem !important;
            margin-bottom: 1rem !important;
          }

          .avatar-controls {
            gap: 0.375rem !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
          }

          .avatar-button {
            font-size: 0.6875rem !important;
            padding: 0.375rem 0.5rem !important;
            border-radius: 0.375rem !important;
          }

          .form-group {
            margin-bottom: 1.25rem;
          }

          .form-input {
            padding: 0.75rem 0.875rem;
            font-size: 0.9375rem;
            border-radius: 0.625rem;
          }

          .form-actions {
            flex-direction: column;
            gap: 0.75rem;
            margin-top: 1.5rem;
          }

          .action-button {
            width: 100%;
            padding: 1rem 1.5rem;
            font-size: 0.9375rem;
          }

          .color-picker {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            margin-top: 0 !important;
            z-index: 1000 !important;
            max-width: 90vw !important;
            padding: 0.75rem !important;
          }

          .color-grid {
            max-width: 180px !important;
            gap: 0.375rem !important;
          }

          .color-option {
            width: 1.75rem !important;
            height: 1.75rem !important;
          }

          .avatar-preview-overlay {
            fontSize: 0.625rem !important;
            padding: 0.5rem !important;
          }
        }

        @media (max-width: 480px) {
          .edit-profile-container {
            padding: 0.75rem;
            border-radius: 0.75rem;
          }

          .edit-profile-title {
            font-size: 1.375rem;
          }

          .edit-profile-subtitle {
            font-size: 0.8125rem;
          }

          .profile-avatar-edit {
            width: 4rem !important;
            height: 4rem !important;
            fontSize: 1rem !important;
          }

          .avatar-button {
            font-size: 0.625rem !important;
            padding: 0.3125rem 0.4375rem !important;
          }

          .form-input {
            padding: 0.6875rem 0.75rem;
            font-size: 0.875rem;
          }

          .action-button {
            padding: 0.875rem 1.25rem;
          }
        }
      `}</style>

      <div className="edit-profile-container">
        <div className="edit-profile-header">
          <div className="profile-avatar-edit" onClick={handleAvatarClick}>
            {!formData.avatar && (
              <span>{formData.name.charAt(0).toUpperCase()}</span>
            )}
            <div className="avatar-preview-overlay">
              {isUploading 
                ? 'Uploading...' 
                : formData.avatar 
                  ? 'Click to change photo' 
                  : 'Click to add photo'
              }
            </div>
          </div>
          <div className="avatar-controls">
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="avatar-upload" className="avatar-button upload-button">
              <Camera size={14} />
              Upload Photo
            </label>
            {isUploading && <span>Uploading...</span>}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="avatar-button color-button"
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                <Palette size={14} />
                Color
              </button>
              {showColorPicker && (
                <div className="color-picker">
                  <div className="color-grid">
                    {colorOptions.map((color) => (
                      <div
                        key={color}
                        className={`color-option ${formData.avatarColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(color)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {formData.avatar && (
              <button
                type="button"
                className="avatar-button remove-button"
                onClick={removeAvatar}
              >
                <X size={14} />
                Remove
              </button>
            )}
          </div>
          <h1 className="edit-profile-title">
            {isFirstVisit ? 'Welcome! Set Up Your Profile' : 'Edit Profile'}
          </h1>
          <p className="edit-profile-subtitle">
            {isFirstVisit 
              ? 'Let\'s get your professional profile ready. You can always update this later!'
              : 'Update your professional information'
            }
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {showErrorMessage && (
            <div className="error-notification">
              {errorMessage}
              <button 
                type="button" 
                className="error-close-btn"
                onClick={() => setShowErrorMessage(false)}
                aria-label="Close error message"
              >
                ×
              </button>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              <User size={16} />
              Full Name
            </label>
            <input
              type="text"
              className={`form-input ${validationErrors.name ? 'error' : ''}`}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
            />
            {validationErrors.name && (
              <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Full name is required
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Briefcase size={16} />
              Business Position
            </label>
            <input
              type="text"
              className={`form-input ${validationErrors.businessPosition ? 'error' : ''}`}
              value={formData.businessPosition}
              onChange={(e) => handleInputChange('businessPosition', e.target.value)}
              placeholder="e.g., C.E.O of TechCorp, Marketing Director of Nike"
              required
            />
            {validationErrors.businessPosition && (
              <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Business position is required
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <MapPin size={16} />
              Location
            </label>
            <input
              type="text"
              className={`form-input ${validationErrors.location ? 'error' : ''}`}
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State, Country"
              required
            />
            {validationErrors.location && (
              <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Location is required
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Globe size={16} />
              Website (Optional)
            </label>
            <input
              type="url"
              className="form-input"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://your-portfolio.com"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="action-button save-button"
              onClick={handleSave}
            >
              <Save size={16} />
              {isFirstVisit ? 'Complete Setup' : 'Save Changes'}
            </button>
            {isFirstVisit && onSkip && (
              <button
                type="button"
                className="action-button cancel-button"
                onClick={onSkip}
              >
                <X size={16} />
                Skip for Now
              </button>
            )}
            {!isFirstVisit && (
              <button
                type="button"
                className="action-button cancel-button"
                onClick={onCancel}
              >
                <X size={16} />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile; 