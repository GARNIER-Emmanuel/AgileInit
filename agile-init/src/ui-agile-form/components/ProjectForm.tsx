import React, { useState } from 'react';

interface ProjectFormProps {
  onSave: (data: { name: string; description: string }) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description });
  };

  return (
    <div className="premium-card glass" style={{ maxWidth: '450px', margin: 'auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', background: 'linear-gradient(135deg, #ADC6FF, #4B8EFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Initialiser AgileInit
        </h2>
        <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>Démarrez votre projet avec style.</p>
      </header>
      <form onSubmit={handleSubmit} className="us-input-group">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label>Identité du projet</label>
          <input 
            type="text" 
            placeholder="Nom (ex: E-Shop V2)" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label>Vision globale</label>
          <textarea 
            placeholder="Objectifs et contexte..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows={4}
            required 
          />
        </div>
        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Configurer le Workshop</button>
      </form>
    </div>
  );
};
