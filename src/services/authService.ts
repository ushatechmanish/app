import { User } from '../types/index';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';

export interface AuthResponse {
  user: User;
  token: string;
  isAuthenticated: boolean;
}

export const authService = {
  async handleGoogleLogin(credential: string): Promise<AuthResponse> {
    try {
      // Decode JWT from Google
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decodedToken = JSON.parse(jsonPayload);

      const user: User = {
        id: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
      };

      // Store token in localStorage
      localStorage.setItem('authToken', credential);
      localStorage.setItem('user', JSON.stringify(user));

      return {
        user,
        token: credential,
        isAuthenticated: true,
      };
    } catch (error) {
      console.error('Auth error:', error);
      throw new Error('Authentication failed');
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },
};
