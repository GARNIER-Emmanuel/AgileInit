import React, { useState } from 'react';

interface AutoDocsPreviewProps {
  docs: {
    productVision: string;
    userStories: string;
    backlog: string;
    architecture: string;
    antigravityPlan: string;
    geminiPrompts: string;
    readme: string;
  };
}

export const AutoDocsPreview: React.FC<AutoDocsPreviewProps> = ({ docs }) => {
  const [activeFile, setActiveFile] = useState<keyof typeof docs>('readme');
  const [copied, setCopied] = useState(false);

  const fileMappings: { key: keyof typeof docs; filename: string }[] = [
    { key: 'readme', filename: 'README.md' },
    { key: 'productVision', filename: 'PRODUCT_VISION.md' },
    { key: 'userStories', filename: 'USER_STORIES.md' },
    { key: 'backlog', filename: 'BACKLOG.md' },
    { key: 'architecture', filename: 'ARCHITECTURE.md' },
    { key: 'antigravityPlan', filename: 'ANTIGRAVITY_PLAN.md' },
    { key: 'geminiPrompts', filename: 'GEMINI_PROMPTS.md' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(docs[activeFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAll = () => {
    const all = fileMappings.map(f => `### ${f.filename}\n\n${docs[f.key]}`).join('\n\n---\n\n');
    navigator.clipboard.writeText(all);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="autodocs-preview-v2" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', overflow: 'hidden' }}>
      
      {/* File Selection Menu */}
      <div className="file-selector" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '0.8rem' }}>
        <label style={{ fontSize: '0.65rem', letterSpacing: '0.15em', opacity: 0.5, marginBottom: '0.5rem', display: 'block' }}>SÉLECTIONNER UN LIVRABLE</label>
        <select 
          value={activeFile} 
          onChange={(e) => setActiveFile(e.target.value as any)}
          style={{ 
            width: '100%', 
            background: 'var(--surface-low)', 
            color: 'white', 
            border: '1px solid #333', 
            borderRadius: '4px', 
            padding: '0.6rem',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {fileMappings.map(f => (
            <option key={f.key} value={f.key}>{f.filename}</option>
          ))}
        </select>
      </div>

      {/* Content Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
        <button 
          onClick={handleCopy} 
          className="btn-primary" 
          style={{ flex: 1, fontSize: '0.75rem', padding: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          {copied ? '✅ COPIÉ !' : `📋 COPIER ${activeFile === 'readme' ? 'README' : 'LE FICHIER'}`}
        </button>
        <button 
          onClick={handleCopyAll} 
          className="btn-secondary" 
          style={{ width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Copier tout le pack"
        >
          📦
        </button>
      </div>

      {/* Markdown Preview Area */}
      <div style={{ 
        flex: 1, 
        background: '#0D0D0D', 
        border: '1px solid #2A2A2A', 
        borderRadius: '8px', 
        padding: '1.5rem', 
        overflowY: 'auto',
        fontFamily: 'monospace',
        fontSize: '0.85rem',
        lineHeight: 1.6,
        color: '#E5E2E1'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #2A2A2A', paddingBottom: '0.8rem', marginBottom: '1.5rem' }}>
           <span style={{ fontSize: '0.7rem', color: '#ADC6FF', fontWeight: 700 }}>{fileMappings.find(f => f.key === activeFile)?.filename}</span>
           <span style={{ fontSize: '0.6rem', opacity: 0.4 }}>Markdown Raw</span>
        </div>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
          {docs[activeFile]}
        </pre>
      </div>

    </div>
  );
};
