import React, { useState } from 'react';
import { Persona } from '../../project-init/domain/entities';

interface UserStoryFormProps {
  personas: Persona[];
  onAdd: (data: { role: string; action: string; benefit: string; personaId: string }) => void;
}

export const UserStoryForm: React.FC<UserStoryFormProps> = ({ personas, onAdd }) => {
  const [role, setRole] = useState('');
  const [action, setAction] = useState('');
  const [benefit, setBenefit] = useState('');
  const [personaId, setPersonaId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personaId) {
      alert("Please select a Persona for this Story.");
      return;
    }
    onAdd({ role, action, benefit, personaId });
    setAction('');
    setBenefit('');
  };

  return (
    <div className="premium-card glass">
      <header style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Nouvelle User Story</h3>
        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Structurez vos besoins métiers avec précision.</p>
      </header>
      
      <form onSubmit={handleSubmit} className="us-input-group">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label>EN TANT QUE</label>
            <input 
              type="text" 
              placeholder="Rôle (ex: Client)" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              required 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label>PERSONA (US1)</label>
            <select value={personaId} onChange={(e) => setPersonaId(e.target.value)} required>
              <option value="">Sélectionner...</option>
              {personas.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.role})</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label>JE VEUX (ACTION)</label>
          <input 
            type="text" 
            placeholder="Action métier" 
            value={action} 
            onChange={(e) => setAction(e.target.value)} 
            required 
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label>AFIN DE (BÉNÉFICE)</label>
          <textarea 
            placeholder="Valeur ajoutée" 
            value={benefit} 
            onChange={(e) => setBenefit(e.target.value)} 
            rows={2}
            required 
          />
        </div>

        <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
          Ajouter au Backlog
        </button>
      </form>
    </div>
  );
};
