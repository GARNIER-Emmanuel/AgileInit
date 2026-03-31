import React, { useState } from 'react';
import { ProjectContext } from '../../doc-generator/domain/project-context';

interface StrategicContextProps {
  formData: ProjectContext;
  onChange: (data: ProjectContext) => void;
  personas: any[];
  onAddPersona: (data: { name: string; role: string; description: string }) => void;
  onAddUS: (data: { role: string; action: string; benefit: string; personaId: string; priority: 'Must' | 'Should' | 'Could' | 'Wont' }) => void;
  onOpenBacklog: () => void;
}

export const StrategicContext: React.FC<StrategicContextProps> = ({ formData, onChange, personas, onAddPersona, onAddUS, onOpenBacklog }) => {
  const [expanded, setExpanded] = useState<string | null>('projet');

  const toggle = (section: string) => {
    const nextState = expanded === section ? null : section;
    setExpanded(nextState);
    if (section === 'us' && nextState === 'us') {
      onOpenBacklog();
    }
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

  const [newUS, setNewUS] = useState<{ personaId: string; role: string; action: string; benefit: string; priority: 'Must' | 'Should' | 'Could' | 'Wont' }>({ 
    personaId: '', role: '', action: '', benefit: '', priority: 'Must' 
  });
  const handleUSSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUS.action || !newUS.personaId) return;
    onAddUS(newUS);
    setNewUS({ ...newUS, action: '', benefit: '' }); // keep persona and priority
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

      {/* SECTION: USER STORY */}
      <div className="accordion-item">
        <header style={sectionHeaderStyle} onClick={() => toggle('us')}>
          <span>USER STORY</span>
          <span>{expanded === 'us' ? '−' : '+'}</span>
        </header>
        {expanded === 'us' && (
          <form onSubmit={handleUSSubmit} style={{ padding: '0.5rem 1rem 1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div>
              <label style={{ fontSize: '0.65rem', opacity: 0.6 }}>EN TANT QUE (PERSONA)</label>
              <select 
                value={newUS.personaId} 
                onChange={(e) => {
                  const p = personas.find(pers => pers.id === e.target.value);
                  setNewUS({ ...newUS, personaId: e.target.value, role: p ? p.role : '' });
                }} 
                style={{ ...inputStyle, background: 'rgba(255,255,255,0.1)', cursor: 'pointer' } as any}
                required
              >
                <option value="" style={{ background: '#1c1b1b', color: 'white' }}>-- Choisir un persona --</option>
                {personas.map(p => (
                  <option key={p.id} value={p.id} style={{ background: '#1c1b1b', color: 'white' }}>
                    {p.name} ({p.role})
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.65rem', opacity: 0.6 }}>PRIORITÉ</label>
                <select 
                  value={newUS.priority}
                  onChange={(e) => setNewUS({ ...newUS, priority: e.target.value as any })}
                  style={{ ...inputStyle, background: 'rgba(255,255,255,0.1)', cursor: 'pointer' } as any}
                >
                  <option value="Must" style={{ background: '#1c1b1b', color: 'white' }}>Must (P0)</option>
                  <option value="Should" style={{ background: '#1c1b1b', color: 'white' }}>Should (P1)</option>
                  <option value="Could" style={{ background: '#1c1b1b', color: 'white' }}>Could (P2)</option>
                  <option value="Wont" style={{ background: '#1c1b1b', color: 'white' }}>Won't (P3)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.65rem', opacity: 0.6 }}>JE VEUX (ACTION)</label>
              <input 
                type="text" 
                placeholder="Ex: pouvoir me connecter..." 
                value={newUS.action} 
                onChange={(e) => setNewUS({ ...newUS, action: e.target.value })} 
                style={inputStyle} 
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.65rem', opacity: 0.6 }}>AFIN DE (BÉNÉFICE)</label>
              <input 
                type="text" 
                placeholder="Ex: accéder à mon profil..." 
                value={newUS.benefit} 
                onChange={(e) => setNewUS({ ...newUS, benefit: e.target.value })} 
                style={inputStyle} 
                required
              />
            </div>
            <button type="submit" style={{ background: '#FFB595', color: 'black', border: 'none', padding: '0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' }}>
              AJOUTER AU BACKLOG
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
