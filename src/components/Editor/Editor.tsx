import React, { useState } from 'react';
import './Editor.css';

interface EditorProps {
  latexContent: string;
  onChange: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ latexContent, onChange }) => {
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChange(value);
    setCharacterCount(value.length);
  };

  const insertTemplate = (template: string) => {
    const newContent = latexContent + template;
    onChange(newContent);
    setCharacterCount(newContent.length);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h3>LaTeX Answer Editor</h3>
        <p className="char-count">Characters: {characterCount}</p>
      </div>

      <div className="quick-templates">
        <p className="templates-label">Quick Templates:</p>
        <div className="template-buttons">
          <button onClick={() => insertTemplate('$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$')}>
            Quadratic Formula
          </button>
          <button onClick={() => insertTemplate('$$\\int_{a}^{b} f(x) dx$$')}>Integral</button>
          <button onClick={() => insertTemplate('$$\\frac{d}{dx} f(x)$$')}>Derivative</button>
          <button onClick={() => insertTemplate('$$\\begin{matrix} a & b \\\\ c & d \\end{matrix}$$')}>
            Matrix
          </button>
        </div>
      </div>

      <textarea
        className="editor-textarea"
        value={latexContent}
        onChange={handleChange}
        placeholder="Enter LaTeX content here. Format: $$content$$&#10;Example: $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$"
      />

      <div className="editor-help">
        <h4>LaTeX Format</h4>
        <ul>
          <li>Wrap equations in $$...$$</li>
          <li>Use standard LaTeX syntax</li>
          <li>Example: $$\alpha + \beta = \gamma$$</li>
        </ul>
      </div>
    </div>
  );
};
