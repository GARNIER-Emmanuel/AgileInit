import React from 'react';
import { UserStory, Persona } from '../../project-init/domain/entities';

interface UserStoryListProps {
  stories: UserStory[];
  personas: Persona[];
}

export const UserStoryList: React.FC<UserStoryListProps> = ({ stories, personas }) => {
  return (
    <div className="us-list-section">
      <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.8, marginBottom: '1.5rem', color: '#ADC6FF' }}>BACKLOG RECENT ({stories.length})</h3>
      {stories.length === 0 ? <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>Aucun livrable disponible.</p> : (
        <div className="us-stack" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {stories.map(us => (
            <div key={us.id} className="premium-card" style={{ 
              backgroundColor: 'var(--surface-low)',
              marginBottom: 0
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.7rem', background: 'rgba(173, 198, 255, 0.1)', color: '#ADC6FF', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>#{us.id.slice(0,4)}</span>
                <span style={{ fontSize: '0.7rem', color: '#4B8EFF', border: '1px solid currentColor', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>Draft</span>
              </div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '1rem', color: 'white' }}>En tant que {us.role}</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.4rem' }}>Je souhaite {us.action} afin de {us.benefit}.</p>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#007AFF' }}></div>
                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{personas.find(p => p.id === us.personaId)?.name || 'Audit'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
