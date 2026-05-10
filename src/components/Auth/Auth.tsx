import React from 'react';
import { User } from '../../types/index';
import { authService } from '../../services/authService';
import './Auth.css';

interface AuthProps {
  user: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
}

export const Auth: React.FC<AuthProps> = ({ user, onLogin, onLogout }) => {
  const handleLogout = async () => {
    await authService.logout();
    onLogout();
  };

  if (user) {
    return (
      <div className="auth-container">
        <div className="user-info">
          {user.picture && <img src={user.picture} alt={user.name} className="user-avatar" />}
          <div>
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="login-placeholder">
        <h2>Login with Google OAuth</h2>
        <p>Use the Google Sign-In button below to authenticate</p>
        {/* Google Sign-In button will be rendered here by the GoogleOAuthProvider */}
      </div>
    </div>
  );
};
