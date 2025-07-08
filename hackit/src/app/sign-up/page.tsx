'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import FloatingBubblegum from '../components/ui/FloatingBubblegum';
import { LoadingWrapper } from '../components/ui/LoadingSpinner';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000); // Simulate loading for 1 second

    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    setErrors({});
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', res.user);
      
      // Save user to database
      await fetch('/api/save-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: res.user.uid,
          email: res.user.email,
          name: email.split('@')[0], // Use email prefix as default name
          role: 'user',
        }),
      });

      sessionStorage.setItem('user', 'true');
      router.push('/'); // Redirect to homepage
    } catch (e: unknown) {
      console.error('Sign up error:', e);
      const error = e as { code?: string; message?: string };
      const newErrors: Record<string, string> = {};
      if (error.code === 'auth/email-already-in-use') {
        newErrors.email = 'An account with this email already exists';
      } else if (error.code === 'auth/weak-password') {
        newErrors.password = 'Password is too weak. Please choose a stronger password';
      } else if (error.code === 'auth/invalid-email') {
        newErrors.email = 'Please enter a valid email address';
      } else {
        newErrors.general = 'Failed to create account. Please try again';
      }
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      delete newErrors.general;
      setErrors(newErrors);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  return (
    <LoadingWrapper loading={initialLoading}>
      <div style={{
        backgroundColor: '#FFF8F8',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Britti Sans Trial', Inter, sans-serif",
        opacity: initialLoading ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out',
      }}>
        <style jsx global>{`
          @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-1.25rem) translateX(1.25rem); }
          100% { transform: translateY(0) translateX(0); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .floating-image {
          position: absolute;
          opacity: 0.15;
          width: 53.125rem;
          height: auto;
          animation: float 6s ease-in-out infinite;
          will-change: transform;
          user-select: none;
          pointer-events: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        .image1 {
          top: 0%;
          left: 5%;
          animation-delay: 0s;
          animation-duration: 8s;
        }

        .image2 {
          top: 45%;
          left: 70%;
          animation-delay: 2s;
          animation-duration: 10s;
        }

        .image3 {
          top: 60%;
          left: -15%;
          animation-delay: 4s;
          animation-duration: 7s;
        }

        .frosted-glass {
          /* Enhanced Glass Effect matching homepage */
          padding: 5rem;
          max-width: 750px;
          min-height: 700px;
          border: 1px solid transparent;
          background: 
            linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.05), rgba(255,255,255,0.4)) border-box,
            rgba(255, 255, 255, 0.1) padding-box;
          background-clip: border-box, padding-box;
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          box-shadow: 0 0.25rem 1.875rem rgba(0, 0, 0, 0.1);
          animation: slideIn 0.8s ease-out;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .frosted-glass:hover {
          transform: translateY(-5px) scale(1.005);
          box-shadow: 0 0.5rem 2.5rem rgba(0, 0, 0, 0.15);
        }

        .input-field {
          background: rgba(245, 239, 240, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.05);
        }

        .input-field:hover {
          background-color: rgba(255, 255, 255, 0.85);
          border-color: rgba(247, 197, 197, 0.5);
          transform: translateY(-0.0625rem);
          box-shadow: 0 0.25rem 1rem rgba(247, 197, 197, 0.2);
        }

        .input-field:focus {
          background-color: rgba(255, 255, 255, 0.9);
          border-color: #F7C5C5;
          outline: none;
          box-shadow: 0 0.25rem 1rem rgba(247, 197, 197, 0.3);
          transform: scale(1.02);
        }

        .input-error {
          border-color: #EF4444 !important;
          box-shadow: 0 0 0 1px #EF4444, 0 0.25rem 1rem rgba(239, 68, 68, 0.2) !important;
        }
        
        .error-text {
          color: #DC2626;
          font-size: 0.9rem;
          font-weight: 300;
          margin-top: 0.5rem;
          font-family: "'Britti Sans Trial', Inter, sans-serif";
          animation: slideIn 0.3s ease-out;
        }

        .label {
          transition: all 0.3s ease;
        }

        .label:hover {
          color: #E91E63;
          transform: translateX(2px);
        }

        .sign-up-button {
          background: #E91E63;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 0.25rem 0.75rem rgba(233, 30, 99, 0.3);
          position: relative;
          overflow: hidden;
        }

        .sign-up-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .sign-up-button:hover {
          background-color: #C2185B;
          transform: translateY(-0.125rem);
          box-shadow: 0 0.375rem 1.25rem rgba(233, 30, 99, 0.4);
        }

        .sign-up-button:hover::before {
          left: 100%;
        }

        .sign-up-button:active {
          transform: translateY(-0.0625rem) scale(0.98);
        }

        .sign-up-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          background: #9CA3AF;
        }

        .password-toggle {
          transition: all 0.3s ease;
        }

        .password-toggle:hover {
          color: #E91E63;
          transform: scale(1.1);
        }

        .error-box {
          animation: slideIn 0.3s ease-out;
        }

        .app-logo {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .app-logo:hover {
          transform: translateY(-0.125rem) scale(1.02);
          box-shadow: 0 0.5rem 1.5rem rgba(247, 197, 197, 0.5);
        }

        .login-link {
          transition: all 0.3s ease;
        }

        .login-link:hover {
          color: #E91E63 !important;
          transform: translateX(2px);
        }

        /* Mobile responsive styles */
        @media (max-width: 1200px) {
          .main-container {
            left: 4rem !important;
            right: 4rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .floating-image {
            width: 31.25rem !important;
            opacity: 0.12 !important;
          }

          .image1 {
            top: -5% !important;
            left: -10% !important;
          }

          .image2 {
            top: 50% !important;
            left: 60% !important;
          }

          .image3 {
            top: 75% !important;
            left: -20% !important;
          }
          .main-container {
            top: 1rem !important;
            left: 1rem !important;
            right: 1rem !important;
            bottom: 1rem !important;
          }
          .frosted-glass {
            padding: 4rem;
            min-height: auto;
          }
          .main-title {
            font-size: 2.25rem !important;
          }
          .sub-title {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          .input-container {
            margin-bottom: 1.25rem !important;
          }
          .sign-up-button {
            padding: 1rem !important;
            font-size: 1.1rem !important;
          }
          .login-link-container {
            margin-top: 1.5rem !important;
          }
        }

        @media (max-width: 480px) {
          .floating-image {
            width: 21.875rem !important;
            opacity: 0.1 !important;
          }

          .image1 {
            top: 0% !important;
            left: -15% !important;
          }

          .image2 {
            top: 55% !important;
            left: 50% !important;
          }

          .image3 {
            top: 80% !important;
            left: -25% !important;
          }
          .main-container {
            top: 1rem !important;
            left: 0.5rem !important;
            right: 0.5rem !important;
            bottom: 1rem !important;
          }
          .frosted-glass {
            padding: 2.5rem 2rem;
            min-height: auto;
          }
          .main-title {
            font-size: 2.25rem !important;
          }
          .sub-title {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          .input-container {
            margin-bottom: 1.25rem !important;
          }
          .sign-up-button {
            padding: 1rem !important;
            font-size: 1.1rem !important;
          }
          .login-link-container {
            margin-top: 1.5rem !important;
          }
        }
      `}</style>

        {/* Floating Bubblegum elements from homepage */}
        <FloatingBubblegum className="image1" />
        <FloatingBubblegum className="image2" />
        <FloatingBubblegum className="image3" />

        {/* Main container with frosted glass */}
        <div style={{
          position: 'absolute',
          top: '4rem',
          left: '8rem',
          right: '8rem',
          bottom: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '87.5rem',
          margin: '0 auto',
        }} className="main-container">
          {/* Frosted glass card */}
          <div className="frosted-glass" style={{
            borderRadius: '1.5rem',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            {/* App logo and name inside glass */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem',
            }}>
              <div 
                className="app-logo"
                style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F7C5C5, #E8A8A8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0.25rem 0.75rem rgba(247, 197, 197, 0.3)',
                }} 
              />
              <span style={{
                color: '#333',
                fontWeight: 700,
                fontSize: '1.5rem',
                fontFamily: "'Britti Sans Trial', Inter, sans-serif",
              }}>appname</span>
            </div>

            <h1 className="main-title" style={{
              fontSize: '3rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #E91E63, #9C27B0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.75rem',
              letterSpacing: '-0.02em',
              fontFamily: "'Britti Sans Trial', Inter, sans-serif",
            }}>
              Create your Account
            </h1>
            
            <p className="sub-title" style={{
              color: '#666',
              marginBottom: '3rem',
              fontSize: '1.1rem',
              fontWeight: 300,
              fontFamily: "'Britti Sans Trial', Inter, sans-serif",
            }}>
              Start writing your own herstory
            </p>

            {/* Email Field */}
            <div className="input-container" style={{ marginBottom: '2rem', textAlign: 'left' }}>
              <label 
                className="label"
                style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  color: '#333',
                  fontWeight: 600,
                  fontSize: '1rem',
                  fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                }}
              >
                Email Address
              </label>
        <input 
          type="email" 
          value={email} 
                onChange={handleInputChange(setEmail, 'email')}
                onKeyPress={handleKeyPress}
                className={`input-field ${errors.email ? 'input-error' : ''}`}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  borderRadius: '1.25rem',
                  fontSize: '1rem',
                  color: '#333',
                  fontWeight: 300,
                  fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                }}
                placeholder="Enter your email"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="input-container" style={{ marginBottom: '2rem', textAlign: 'left' }}>
              <label 
                className="label"
                style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  color: '#333',
                  fontWeight: 600,
                  fontSize: '1rem',
                  fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
        <input 
                  type={showPassword ? 'text' : 'password'}
          value={password} 
                  onChange={handleInputChange(setPassword, 'password')}
                  onKeyPress={handleKeyPress}
                  className={`input-field ${errors.password ? 'input-error' : ''}`}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    paddingRight: '4.5rem',
                    borderRadius: '1.25rem',
                    fontSize: '1rem',
                    color: '#333',
                    fontWeight: 300,
                    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  style={{
                    position: 'absolute',
                    right: '1.25rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666',
                  }}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="input-container" style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
              <label 
                className="label"
                style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  color: '#333',
                  fontWeight: 600,
                  fontSize: '1rem',
                  fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                }}
              >
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleInputChange(setConfirmPassword, 'confirmPassword')}
                  onKeyPress={handleKeyPress}
                  className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    paddingRight: '4.5rem',
                    borderRadius: '1.25rem',
                    fontSize: '1rem',
                    color: '#333',
                    fontWeight: 300,
                    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                  }}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                  style={{
                    position: 'absolute',
                    right: '1.25rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666',
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>

            {/* Error Message */}
            {errors.general && (
              <div 
                className="error-box"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '1rem',
                  padding: '1rem',
                  marginBottom: '2rem',
                  color: '#DC2626',
                  fontSize: '0.95rem',
                  fontWeight: 300,
                  fontFamily: "'Britti Sans Trial', Inter, sans-serif",
                }}
              >
                {errors.general}
              </div>
            )}

            {/* Sign Up Button */}
        <button 
          onClick={handleSignUp}
              disabled={loading}
              className="sign-up-button"
              style={{
                width: '100%',
                padding: '1.25rem',
                borderRadius: '1.25rem',
                border: 'none',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Britti Sans Trial', Inter, sans-serif",
              }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

            {/* Login Link */}
            <div className="login-link-container" style={{
              marginTop: '2.5rem',
              color: '#666',
              fontSize: '1rem',
              fontFamily: "'Britti Sans Trial', Inter, sans-serif",
            }}>
              Already have an account?{' '}
              <Link 
                href="/sign-in"
                className="login-link"
                style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default SignUp;