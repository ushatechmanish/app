import React from 'react';
import { FeedbackResponse } from '../../types/index';
import './Feedback.css';

interface FeedbackProps {
  feedback: FeedbackResponse | null;
  isLoading: boolean;
  error: string | null;
  onRequestFeedback: () => void;
}

export const Feedback: React.FC<FeedbackProps> = ({ feedback, isLoading, error, onRequestFeedback }) => {
  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h3>AI Feedback</h3>
        <button className="request-feedback-btn" onClick={onRequestFeedback} disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Get Feedback'}
        </button>
      </div>

      {error && <div className="feedback-error">{error}</div>}

      {isLoading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Analyzing your answer...</p>
        </div>
      )}

      {feedback && !isLoading && (
        <div className="feedback-content">
          <div className="score-section">
            <div className={`score-badge score-${feedback.score >= 80 ? 'high' : feedback.score >= 60 ? 'medium' : 'low'}`}>
              <span className="score-number">{feedback.score}</span>
              <span className="score-label">%</span>
            </div>
          </div>

          <div className="feedback-text-section">
            <h4>Feedback</h4>
            <p>{feedback.feedback}</p>
          </div>

          {feedback.suggestions && feedback.suggestions.length > 0 && (
            <div className="suggestions-section">
              <h4>Suggestions for Improvement</h4>
              <ul className="suggestions-list">
                {feedback.suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <span className="suggestion-number">{index + 1}</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!feedback && !isLoading && !error && (
        <div className="empty-state">
          <p>Submit your LaTeX answer and upload an image to receive AI feedback on your solution.</p>
        </div>
      )}
    </div>
  );
};
