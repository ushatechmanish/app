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

    // Match:
    // $$...$$ -> block math
    // $...$   -> inline math
    const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;

    const parts = latexContent.split(regex);

    return parts.map((part, index) => {
      // Block math
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const mathContent = part.slice(2, -2);

        try {
          return (
            <div key={index} className="math-block">
              <BlockMath math={mathContent} />
            </div>
          );
        } catch (error) {
          return (
            <div key={index} className="math-error">
              <p>Invalid LaTeX Block: {part}</p>
            </div>
          );
        }
      }

      // Inline math
      if (part.startsWith('$') && part.endsWith('$')) {
        const mathContent = part.slice(1, -1);

        try {
          return (
            <InlineMath
              key={index}
              math={mathContent}
            />
          );
        } catch (error) {
          return (
            <span key={index} className="math-error">
              Invalid Inline LaTeX: {part}
            </span>
          );
        }
      }

      // Regular text
      if (part.trim()) {
        return (
          <span key={index} className="preview-text">
            {part}
          </span>
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
          <p className="placeholder-text">
            Enter LaTeX content to see preview here...
          </p>
        )}
      </div>
    </div>
  );
};
