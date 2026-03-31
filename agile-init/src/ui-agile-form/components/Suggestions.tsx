import React from 'react';
import { UserStory } from '../../project-init/domain/entities';

interface SuggestionsProps {
  sugs: Partial<UserStory>[];
  onAccept: (sug: Partial<UserStory>) => void;
  onReject: (id: number) => void;
}

export const Suggestions: React.FC<SuggestionsProps> = ({ sugs, onAccept, onReject }) => {
  if (!Array.isArray(sugs) || sugs.length === 0) return null;

  return (
    <div className="suggestions-section" style={{ marginTop: '2rem' }}>
      <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.1cm', opacity: 0.8, color: '#FFB595', marginBottom: '1rem' }}>SUGGESTIONS IA (DRAFT)</h3>
      <div className="suggestion-cards" style={{ display: 'grid', gap: '0.8rem' }}>
        {sugs.map((sug, i) => (
          <div key={i} className="premium-card" style={{ 
            backgroundColor: 'rgba(239, 103, 25, 0.05)', 
            border: '1px dashed rgba(239, 103, 25, 0.3)',
            marginBottom: 0
          }}>
            <p style={{ fontSize: '0.85rem' }}>
              <strong>{sug.role}</strong> : Je veux {sug.action} afin de {sug.benefit}
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => onAccept(sug)}
                style={{ fontSize: '0.7rem', padding: '0.4rem 0.8rem', background: '#28a745', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
              >
                Accepter
              </button>
              <button 
                onClick={() => onReject(i)}
                style={{ fontSize: '0.7rem', padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
              >
                Ignorer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
