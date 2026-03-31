import React, { useState } from 'react';

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
    <div className="preview-panel-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header style={{
        marginBottom: '1.5rem',
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
            border: '1px solid var(--outline-variant)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {copied ? 'COPIÉ !' : 'COPIER TOUT (US4)'}
        </button>
      </header>

      <div style={{
        flex: 1,
        color: '#E5E2E1',
        fontSize: '0.85rem',
        lineHeight: 1.6,
        fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"
      }}>
        {markdown.split('\n').map((line, i) => (
          <div key={i} style={{
            color: line.startsWith('#') ? '#ADC6FF' : (line.startsWith('>') ? '#FFB595' : 'inherit'),
            marginBottom: '0.2rem'
          }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};
