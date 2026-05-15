import React from 'react';
import './QuestionImage.css';

interface QuestionImageProps {
  image: string | null;
}

const QuestionImage: React.FC<QuestionImageProps> = ({ image }) => {
  if (!image) {
    return (
      <div className="question-image-placeholder">
        <p>No question image uploaded</p>
      </div>
    );
  }

  return (
    <div className="question-image">
      <img src={image} alt="Question" />
    </div>
  );
};

export default QuestionImage;