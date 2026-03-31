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
  const [activeTab, setActiveTab] = useState<keyof typeof docs | 'antigravity'>('readme');
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  const tabs: { key: keyof typeof docs | 'antigravity'; label: string }[] = [
    { key: 'readme', label: 'README' },
    { key: 'productVision', label: 'Vision' },
    { key: 'userStories', label: 'US' },
    { key: 'backlog', label: 'Backlog' },
    { key: 'architecture', label: 'Arch' },
    { key: 'antigravity', label: '⚡ ANTIGRAVITY' },
  ];

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [key]: true });
    setTimeout(() => setCopied({ ...copied, [key]: false }), 2000);
  };

  const handleCopyAll = () => {
    const all = Object.values(docs).join('\n\n---\n\n');
    handleCopy('all', all);
  };

  // Helper to extract phases from geminiPrompts (simple regex/split for demo)
  const extractPrompts = (fullText: string) => {
    const phases = fullText.split('## Prompt').filter(p => p.trim() !== '');
    return phases.map(p => {
      const titleMatch = p.match(/^(.*)\n/);
      const title = titleMatch ? `Prompt ${titleMatch[1]}` : 'Prompt Segment';
      return { title, content: `## Prompt${p}` };
    });
  };

  return (
    <div className="premium-card glass" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2A2A2A', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: activeTab === tab.key ? (tab.key === 'antigravity' ? 'rgba(173, 198, 255, 0.2)' : 'var(--surface-container)') : 'transparent',
                border: 'none',
                color: activeTab === tab.key ? '#ADC6FF' : 'rgba(255,255,255,0.4)',
                padding: '0.4rem 0.8rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                whiteSpace: 'nowrap',
                fontWeight: activeTab === tab.key ? 700 : 400
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button onClick={handleCopyAll} className="btn-secondary" style={{ fontSize: '0.7rem', opacity: 0.8, background: copied['all'] ? '#28a745' : 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid #2A2A2A', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>
          {copied['all'] ? 'COPIÉ' : 'COPY ALL'}
        </button>
      </div>

      {activeTab === 'antigravity' ? (
        <div className="antigravity-view">
          <header style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255, 181, 149, 0.05)', borderRadius: '8px', borderLeft: '4px solid #FFB595' }}>
            <h4 style={{ color: '#FFB595', marginBottom: '0.5rem', fontSize: '0.9rem' }}>MODE EXPERT : ANTIGRAVITY HELPER</h4>
            <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Utilisez ces prompts séquentiels pour générer tout le code via Gemini 1.5 Pro ou 2.0.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Plan Display */}
            <div>
              <h5 style={{ fontSize: '0.75rem', marginBottom: '1rem', opacity: 0.8 }}>📋 PLAN DE GÉNÉRATION</h5>
              <pre style={{ background: 'var(--surface-low)', padding: '1rem', borderRadius: '8px', color: '#ADC6FF', fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
                {docs.antigravityPlan}
              </pre>
            </div>

            {/* Prompts Action Zone */}
            <div>
              <h5 style={{ fontSize: '0.75rem', marginBottom: '1rem', opacity: 0.8 }}>⚡ PROMPTS PAR PHASE (COPIE DIRECTE)</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {extractPrompts(docs.geminiPrompts).map((p, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleCopy(`p${i}`, p.content)}
                    className="btn-primary" 
                    style={{ 
                      textAlign: 'left', 
                      fontSize: '0.75rem', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      background: copied[`p${i}`] ? '#28a745' : 'linear-gradient(135deg, #1C1B1B, #201F1F)',
                      border: '1px solid var(--outline-variant)',
                      color: 'white'
                    }}
                  >
                    <span>{p.title}</span>
                    <span style={{ opacity: 0.5 }}>{copied[`p${i}`] ? 'COPIÉ !' : 'CLIQUER POUR COPIER'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button key={activeTab} onClick={() => handleCopy(activeTab, docs[activeTab as keyof typeof docs])} className="btn-primary" style={{ fontSize: '0.7rem', padding: '0.4rem 1rem' }}>
              {copied[activeTab] ? 'COPIÉ' : `COPIER ${activeTab.toUpperCase()}`}
            </button>
          </div>

          <pre style={{ 
            background: 'var(--surface-low)', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            color: '#E5E2E1', 
            fontSize: '0.85rem', 
            overflowX: 'auto',
            fontFamily: 'monospace',
            lineHeight: 1.5,
            maxHeight: '500px'
          }}>
            {docs[activeTab as keyof typeof docs]}
          </pre>
        </>
      )}
    </div>
  );
};
