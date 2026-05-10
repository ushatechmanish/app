export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface LatexAnswer {
  id: string;
  latexContent: string;
  imageUrl?: string;
  feedback?: string;
  createdAt: Date;
}

export interface FeedbackResponse {
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface GoogleAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}
