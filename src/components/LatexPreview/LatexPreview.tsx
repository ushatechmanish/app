import React, { useMemo } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './LatexPreview.css';

interface LatexPreviewProps {
  latexContent: string;
}

export const LatexPreview: React.FC<LatexPreviewProps> = ({ latexContent }) => {
  const renderedContent = useMemo(() => {
    if (!latexContent) {
      return null;
    }

    // Split by $$ to find display math blocks
    const parts = latexContent.split(/(\$\$[^$]*\$\$)/);

    return parts.map((part, index) => {
      if (part.match(/^\$\$.*\$\$/)) {
        // This is a math block
        const mathContent = part.slice(2, -2); // Remove $$ from both ends
        try {
          return (
            <div key={index} className="math-block">
              <BlockMath>{mathContent}</BlockMath>
            </div>
          );
        } catch (error) {
          return (
            <div key={index} className="math-error">
              <p>Invalid LaTeX: {part}</p>
            </div>
          );
        }
      } else if (part.trim()) {
        // Regular text
        return (
          <p key={index} className="preview-text">
            {part}
          </p>
        );
      }
      return null;
    });
  }, [latexContent]);

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h3>LaTeX Preview</h3>
      </div>

      <div className="preview-content">
        {renderedContent ? (
          renderedContent
        ) : (
          <p className="placeholder-text">Enter LaTeX content to see preview here...</p>
        )}
      </div>
    </div>
  );
};
