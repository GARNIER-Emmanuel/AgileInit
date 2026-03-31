import React, { useState } from 'react';

interface PersonaFormProps {
  onAdd: (data: { name: string; role: string; description: string }) => void;
}

export const PersonaForm: React.FC<PersonaFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, role, description });
    setName('');
    setRole('');
    setDescription('');
  };

  return (
    <div className="premium-card">
      <h3 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: '#ADC6FF' }}>AJOUTER UN PERSONA</h3>
      <form onSubmit={handleSubmit} className="us-input-group">
        <input 
          type="text" 
          placeholder="Nom (ex: Sarah)" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Rôle (ex: Product Owner)" 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          required 
        />
        <button type="submit" className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.6rem' }}>Ajouter</button>
      </form>
    </div>
  );
};
