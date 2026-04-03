import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  markdown: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="preview-panel-content" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <header style={{
        marginBottom: '1rem',
        borderBottom: '1px solid #2A2A2A',
        paddingBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.8 }}>BACKLOG LIVE</h3>
        <button
          onClick={handleCopy}
          className="btn-secondary"
          style={{
            fontSize: '0.65rem',
            background: copied ? '#28a745' : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {copied ? 'COPIÉ !' : 'COPIER LE MARKDOWN'}
        </button>
      </header>

      <div className="markdown-render-area" style={{
        flex: 1,
        overflowY: 'auto',
        color: '#E5E2E1',
        fontSize: '0.9rem',
        lineHeight: 1.7,
        padding: '0.5rem 0'
      }}>
        <div data-testid="fake-render">
          {markdown}
        </div>
      </div>
    </div>
  );
};
