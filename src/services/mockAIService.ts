import { FeedbackResponse } from '../types/index';

// Mock AI feedback responses
const mockFeedbackDatabase = [
  {
    pattern: /quadratic|ax.*2.*bx.*c/i,
    response: {
      score: 85,
      feedback: 'Good use of quadratic form. Consider simplifying further.',
      suggestions: [
        'Check if the equation can be factored',
        'Verify your coefficients are correct',
        'Consider using the quadratic formula for verification',
      ],
    },
  },
  {
    pattern: /integral|∫/,
    response: {
      score: 80,
      feedback: 'Integral setup is correct. Check your limits of integration.',
      suggestions: [
        'Verify upper and lower bounds',
        'Double-check your antiderivative',
        'Apply the fundamental theorem of calculus correctly',
      ],
    },
  },
  {
    pattern: /derivative|d\/dx|d\/dt/i,
    response: {
      score: 75,
      feedback: 'Derivative calculation shows understanding. Review the chain rule application.',
      suggestions: [
        'Apply chain rule for composite functions',
        'Simplify your final answer',
        'Check your power rule usage',
      ],
    },
  },
  {
    pattern: /matrix|determinant/i,
    response: {
      score: 82,
      feedback: 'Matrix operations are properly set up. Verify your calculations.',
      suggestions: [
        'Double-check row operations',
        'Verify determinant calculation',
        'Check for computational errors',
      ],
    },
  },
];

// Default feedback for unmatched patterns
const defaultFeedback: FeedbackResponse = {
  score: 70,
  feedback: 'Your answer demonstrates mathematical understanding. Review the steps carefully.',
  suggestions: [
    'Show all intermediate steps',
    'Verify your final answer',
    'Consider alternative solution methods',
  ],
};

const checkBalancedParentheses = (content: string): boolean => {
  const stack: string[] = [];
  const pairs: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  for (const char of content) {
    if (pairs[char]) {
      stack.push(char);
    } else if (Object.values(pairs).includes(char)) {
      const last = stack.pop();
      if (!last || pairs[last] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

const checkValidOperators = (content: string): boolean => {
  // Check for invalid operator sequences
  const invalidPatterns = [
    /\+\s*\+/, // ++
    /--(?!>)/, // -- (not arrow)
    /\*\*\*/, // ***
    /\s\/\s\//, // / /
  ];

  return !invalidPatterns.some((pattern) => pattern.test(content));
};

export const mockAIService = {
  async analyzeLaTeX(latexContent: string): Promise<FeedbackResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find matching feedback based on content
    for (const entry of mockFeedbackDatabase) {
      if (entry.pattern.test(latexContent)) {
        return entry.response;
      }
    }

    return defaultFeedback;
  },

  async analyzeImage(imageUrl: string, latexContent: string): Promise<FeedbackResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock analysis - in real app, this would call the Spring AI backend
    const hasImage = !!imageUrl;
    const hasLatex = latexContent.length > 0;

    let score = 70;
    let feedback = '';
    const suggestions: string[] = [];

    if (hasImage && hasLatex) {
      score = 88;
      feedback = 'Excellent! Your image matches the LaTeX notation well. Your solution is clear and complete.';
      suggestions.push(
        'Consider adding more detailed steps',
        'Your handwriting is legible',
        'Good organization of work'
      );
    } else if (hasImage) {
      score = 65;
      feedback =
        'Image received but no LaTeX notation provided. Please add the LaTeX representation for better feedback.';
      suggestions.push(
        'Convert your handwritten solution to LaTeX',
        'Use standard mathematical notation',
        'Provide both image and LaTeX for comprehensive feedback'
      );
    } else if (hasLatex) {
      score = 75;
      feedback = 'LaTeX notation is clear. Consider uploading an image of your work for visual verification.';
      suggestions.push(
        'Upload an image of your written solution',
        'Ensure the image is clear and legible',
        'This helps verify the complete solution'
      );
    } else {
      score = 30;
      feedback = 'Please provide either a LaTeX solution or an image of your work.';
      suggestions.push(
        'Enter LaTeX notation for your answer',
        'Upload an image of your handwritten solution',
        'Provide both for best results'
      );
    }

    return {
      score,
      feedback,
      suggestions,
    };
  },

  async verifyMathematicalCorrectness(latexContent: string): Promise<{
    isCorrect: boolean;
    confidence: number;
    issues: string[];
  }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock verification
    const hasBalancedParentheses = checkBalancedParentheses(latexContent);
    const hasValidOperators = checkValidOperators(latexContent);

    const issues: string[] = [];
    if (!hasBalancedParentheses) {
      issues.push('Unbalanced parentheses or brackets detected');
    }
    if (!hasValidOperators) {
      issues.push('Invalid mathematical operators detected');
    }

    return {
      isCorrect: issues.length === 0,
      confidence: 0.85,
      issues,
    };
  },
};
