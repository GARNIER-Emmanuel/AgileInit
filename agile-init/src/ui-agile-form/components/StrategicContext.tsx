import React, { useState } from 'react';
import { ProjectContext } from '../../doc-generator/domain/project-context';

interface StrategicContextProps {
  formData: ProjectContext;
  onChange: (data: ProjectContext) => void;
  personas: any[];
  onAddPersona: (data: { name: string; role: string; description: string }) => void;
}

export const StrategicContext: React.FC<StrategicContextProps> = ({ formData, onChange, personas, onAddPersona }) => {
  const [expanded, setExpanded] = useState<string | null>('projet');

  const toggle = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  const handleChange = (field: string, value: any) => {
    onChange({ ...formData, [field]: value });
  };

  const handleStackChange = (field: string, value: string) => {
    onChange({ 
      ...formData, 
      technicalStack: { ...formData.technicalStack, [field]: value } 
    });
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjs = [...formData.mainObjectives];
    newObjs[index] = value;
    onChange({ ...formData, mainObjectives: newObjs });
  };

  const addObjective = () => {
    onChange({ ...formData, mainObjectives: [...formData.mainObjectives, ''] });
  };

  const [newPersona, setNewPersona] = useState({ name: '', role: '', description: '' });
  const handlePersonaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersona.name || !newPersona.role) return;
    onAddPersona(newPersona);
    setNewPersona({ name: '', role: '', description: '' });
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    padding: '0.6rem',
    color: 'white',
    fontSize: '0.85rem',
    outline: 'none',
    width: '100%',
    marginTop: '0.3rem'
  };

  const sectionHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 1rem',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '0.5rem',
    fontWeight: 600,
    fontSize: '0.8rem',
    color: '#ADC6FF'
  };

  return (
    <div className="strategic-sidebar-v3" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.5rem' }}>
      
      {/* SECTION: PROJET */}
      <div className="accordion-item">
        <header style={sectionHeaderStyle} onClick={() => toggle('projet')}>
          <span>PROJET</span>
          <span>{expanded === 'projet' ? '−' : '+'}</span>
        </header>
        {expanded === 'projet' && (
          <div style={{ padding: '0.5rem 1rem 1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="field">
              <label style={{ fontSize: '0.65rem', opacity: 0.6 }}>NOM DU PROJET</label>
              <input 
                type="text" 
                value={formData.projectName} 
                onChange={(e) => handleChange('projectName', e.target.value)} 
                placeholder="Ex: Mon Application SaaS"
                style={inputStyle}
              />
            </div>
            <div className="field">
              <label style={{ fontSize: '0.65rem', opacity: 0.6 }}>CIBLE UTILISATEUR</label>
              <input 
                type="text" 
                value={formData.targetUsers} 
                onChange={(e) => handleChange('targetUsers', e.target.value)} 
                placeholder="Ex: Architectes, Développeurs..."
                style={inputStyle}
              />
            </div>
            <div className="field">
              <label style={{ fontSize: '0.65rem', opacity: 0.6 }}>VISION / PITCH</label>
              <textarea 
                value={formData.pitch} 
                onChange={(e) => handleChange('pitch', e.target.value)} 
                placeholder="Ex: Une plateforme centralisée pour gérer..."
                rows={3}
                style={inputStyle}
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION: STACK */}
      <div className="accordion-item">
        <header style={sectionHeaderStyle} onClick={() => toggle('stack')}>
          <span>STACK TECHNIQUE</span>
          <span>{expanded === 'stack' ? '−' : '+'}</span>
        </header>
        {expanded === 'stack' && (
          <div style={{ padding: '0.5rem 1rem 1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div>
              <label style={{ fontSize: '0.65rem', opacity: 0.6 }}>FRONTEND</label>
              <input type="text" placeholder="Ex: React, Next.js" value={formData.technicalStack.front} onChange={(e) => handleStackChange('front', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', opacity: 0.6 }}>BACKEND</label>
              <input type="text" placeholder="Ex: Node.js, NestJS" value={formData.technicalStack.back} onChange={(e) => handleStackChange('back', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', opacity: 0.6 }}>DATABASE</label>
              <input type="text" placeholder="Ex: PostgreSQL, Redis" value={formData.technicalStack.db} onChange={(e) => handleStackChange('db', e.target.value)} style={inputStyle} />
            </div>
          </div>
        )}
      </div>

      {/* SECTION: OBJECTIFS */}
      <div className="accordion-item">
        <header style={sectionHeaderStyle} onClick={() => toggle('objectifs')}>
          <span>OBJECTIFS SMART</span>
          <span>{expanded === 'objectifs' ? '−' : '+'}</span>
        </header>
        {expanded === 'objectifs' && (
          <div style={{ padding: '0.5rem 1rem 1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {formData.mainObjectives.map((obj, i) => (
              <input 
                key={i} 
                type="text" 
                value={obj} 
                onChange={(e) => handleObjectiveChange(i, e.target.value)} 
                placeholder={`Ex: Obtenir 1000 utilisateurs en 6 mois`}
                style={inputStyle}
              />
            ))}
            <button onClick={addObjective} style={{ background: 'transparent', border: '1px dashed #ADC6FF', color: '#ADC6FF', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', marginTop: '0.5rem' }}>
              + AJOUTER UN OBJECTIF
            </button>
          </div>
        )}
      </div>

      {/* SECTION: PERSONAS */}
      <div className="accordion-item">
        <header style={sectionHeaderStyle} onClick={() => toggle('personas')}>
          <span>PERSONAS</span>
          <span>{expanded === 'personas' ? '−' : '+'}</span>
        </header>
        {expanded === 'personas' && (
          <div style={{ padding: '0.5rem 1rem 1.5rem 1rem' }}>
            <div className="persona-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
              {personas.map(p => (
                <span key={p.id} style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', background: 'rgba(173,198,255,0.1)', color: '#ADC6FF', borderRadius: '4px', border: '1px solid #2A2A2A' }}>
                  {p.name}
                </span>
              ))}
            </div>
            
            <form onSubmit={handlePersonaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '6px' }}>
              <input 
                type="text" 
                placeholder="Nom (Ex: Marc)" 
                value={newPersona.name} 
                onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })} 
                style={{ ...inputStyle, fontSize: '0.75rem', marginTop: 0 }} 
              />
              <input 
                type="text" 
                placeholder="Rôle (Ex: Développeur)" 
                value={newPersona.role} 
                onChange={(e) => setNewPersona({ ...newPersona, role: e.target.value })} 
                style={{ ...inputStyle, fontSize: '0.75rem', marginTop: 0 }} 
              />
              <button type="submit" style={{ background: '#ADC6FF', color: 'black', border: 'none', padding: '0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>
                + PERSONA
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
};
