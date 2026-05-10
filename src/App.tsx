import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Auth } from './components/Auth/Auth';
import { Editor } from './components/Editor/Editor';
import { LatexPreview } from './components/LatexPreview/LatexPreview';
import { ImageUpload } from './components/ImageUpload/ImageUpload';
import { Feedback } from './components/Feedback/Feedback';
import { User, FeedbackResponse } from './types/index';
import { authService } from './services/authService';
import { mockAIService } from './services/mockAIService';
import './App.css';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
const IS_DEV_MODE = 
  process.env.NODE_ENV === 'development' && 
  (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID' || GOOGLE_CLIENT_ID.includes('your'));

// Mock user for development testing
const DEV_USER: User = {
  id: 'dev-user-123',
  email: 'developer@test.com',
  name: 'Test Developer',
  picture: 'https://ui-avatars.com/api/?name=Test+Developer&background=667eea&color=fff',
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [latexContent, setLatexContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  // Load user on mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else if (IS_DEV_MODE) {
      // Auto-login in development mode
      setUser(DEV_USER);
      localStorage.setItem('user', JSON.stringify(DEV_USER));
      localStorage.setItem('authToken', 'dev-token-for-testing');
    }
  }, []);

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const response = await authService.handleGoogleLogin(credentialResponse.credential);
        setUser(response.user);
        setFeedbackError(null);
      }
    } catch (error) {
      setFeedbackError('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleGoogleError = () => {
    setFeedbackError('Google login failed');
  };

  const handleLogout = () => {
    setUser(null);
    setLatexContent('');
    setUploadedImage(null);
    setFeedback(null);
  };

  const handleRequestFeedback = async () => {
    if (!latexContent && !uploadedImage) {
      setFeedbackError('Please enter LaTeX content or upload an image');
      return;
    }

    setIsLoadingFeedback(true);
    setFeedbackError(null);

    try {
      const response = await mockAIService.analyzeImage(uploadedImage || '', latexContent);
      setFeedback(response);
    } catch (error) {
      setFeedbackError('Failed to get feedback. Please try again.');
      console.error('Feedback error:', error);
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  if (!user) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div className="app-container auth-page">
          <div className="app-header">
            <h1>📐 Math Answer Platform</h1>
            <p>Write, visualize, and get feedback on your mathematical solutions</p>
          </div>

          <div className="login-container">
            <div className="login-box">
              <h2>Welcome</h2>
              <p>Sign in with your Google account to get started</p>
              {IS_DEV_MODE ? (
                <div className="dev-mode-notice">
                  <p style={{ color: '#667eea', fontWeight: 'bold' }}>
                    🔧 Development Mode: Auto-authenticated as Test Developer
                  </p>
                  <p>Please refresh the page or clear localStorage to reset.</p>
                </div>
              ) : (
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
              )}
            </div>
          </div>

          {feedbackError && <div className="error-banner">{feedbackError}</div>}
        </div>
      </GoogleOAuthProvider>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="app-container">
        <div className="app-header">
          <div className="header-left">
            <h1>📐 Math Answer Platform</h1>
          </div>
          <Auth user={user} onLogin={setUser} onLogout={handleLogout} />
        </div>

        <main className="app-main">
          <div className="content-grid">
            <div className="editor-section">
              <Editor latexContent={latexContent} onChange={setLatexContent} />
              <ImageUpload onImageUpload={setUploadedImage} currentImage={uploadedImage} />
            </div>

            <div className="preview-section">
              <LatexPreview latexContent={latexContent} />
            </div>

            <div className="feedback-section">
              <Feedback
                feedback={feedback}
                isLoading={isLoadingFeedback}
                error={feedbackError}
                onRequestFeedback={handleRequestFeedback}
              />
            </div>
          </div>
        </main>

        <footer className="app-footer">
          <p>© 2024 Math Answer Platform | Powered by React + LaTeX Rendering</p>
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
