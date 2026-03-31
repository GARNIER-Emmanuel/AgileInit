import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

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
  const [activeFile, setActiveFile] = useState<keyof typeof docs>('productVision');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const fileMappings: { key: keyof typeof docs; filename: string; short: string }[] = [
    { key: 'productVision', filename: 'PRODUCT_VISION.md', short: 'VISION' },
    { key: 'userStories', filename: 'USER_STORIES.md', short: 'US' },
    { key: 'backlog', filename: 'BACKLOG.md', short: 'BACKLOG' },
    { key: 'architecture', filename: 'ARCHITECTURE.md', short: 'ARCH' },
    { key: 'antigravityPlan', filename: 'ANTIGRAVITY_PLAN.md', short: 'PLAN' },
    { key: 'geminiPrompts', filename: 'GEMINI_PROMPTS.md', short: 'PROMPTS' },
    { key: 'readme', filename: 'README.md', short: 'README' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(docs[activeFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("docs");
      
      fileMappings.forEach(f => {
        folder?.file(f.filename, docs[f.key]);
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "agile-init-docs.zip");
    } catch (err) {
      console.error("Zip generation failed", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="autodocs-preview-v3" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      background: '#0a0a0a'
    }}>

      {/* TAB BAR */}
      <nav style={{
        display: 'flex',
        gap: '2px',
        background: '#1a1a1a',
        padding: '0.5rem 0.5rem 0 0.5rem',
        borderBottom: '1px solid #2a2a2a',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {fileMappings.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFile(f.key)}
            style={{
              padding: '0.6rem 1rem',
              background: activeFile === f.key ? '#0a0a0a' : 'transparent',
              border: 'none',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
              color: activeFile === f.key ? '#ADC6FF' : '#888',
              fontSize: '0.65rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              borderBottom: activeFile === f.key ? '2px solid #ADC6FF' : '2px solid transparent'
            }}
          >
            {f.filename.replace('.md', '')}
          </button>
        ))}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            style={{
              padding: '0.4rem 0.8rem',
              background: downloading ? 'rgba(255,255,255,0.02)' : 'rgba(173,198,255,0.1)',
              border: '1px solid #ADC6FF',
              borderRadius: '4px',
              color: '#ADC6FF',
              fontSize: '0.6rem',
              fontWeight: 700,
              cursor: downloading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {downloading ? 'GÉNÉRATION...' : 'TÉLÉCHARGER (.ZIP)'}
          </button>
          <button
            onClick={handleCopy}
            style={{
              padding: '0.4rem 0.8rem',
              background: copied ? '#28a745' : 'rgba(255,255,255,0.05)',
              border: '1px solid #333',
              borderRadius: '4px',
              color: 'white',
              fontSize: '0.6rem',
              cursor: 'pointer',
            }}
          >
            {copied ? 'COPIÉ' : 'COPIER'}
          </button>
        </div>
      </nav>

      {/* RAW CONTENT AREA */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: '0.95rem',
        lineHeight: 1.8,
        color: '#d1d1d1',
        background: '#0a0a0a'
      }}>
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          margin: 0,
          background: 'none',
          border: 'none'
        }}>
          {docs[activeFile]}
        </pre>
      </div>

    </div>
  );
};
