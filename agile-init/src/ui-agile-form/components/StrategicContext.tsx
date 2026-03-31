import React from 'react';
import { ProjectContext } from '../../doc-generator/domain/project-context';

interface StrategicContextProps {
  formData: ProjectContext;
  onChange: (data: ProjectContext) => void;
}

export const StrategicContext: React.FC<StrategicContextProps> = ({ formData, onChange }) => {
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

  return (
    <div className="strategic-context-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }}>
      <section className="input-group">
        <label style={{ fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.6 }}>NOM DU PROJET</label>
        <input 
          type="text" 
          value={formData.projectName} 
          onChange={(e) => handleChange('projectName', e.target.value)} 
          placeholder="Nom du projet..."
          style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #2A2A2A', padding: '0.5rem 0', color: 'white', outline: 'none' }}
        />
      </section>

      <section className="input-group">
        <label style={{ fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.6 }}>CIBLE</label>
        <input 
          type="text" 
          value={formData.targetUsers} 
          onChange={(e) => handleChange('targetUsers', e.target.value)} 
          placeholder="Ex: Architectes, Devs..."
          style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #2A2A2A', padding: '0.5rem 0', color: 'white', outline: 'none' }}
        />
      </section>

      <section className="input-group">
        <label style={{ fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.6 }}>VISION / PITCH</label>
        <textarea 
          value={formData.pitch} 
          onChange={(e) => handleChange('pitch', e.target.value)} 
          placeholder="Décrivez votre vision..."
          rows={4}
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #2A2A2A', borderRadius: '4px', padding: '0.8rem', color: 'white', marginTop: '0.5rem', width: '100%', resize: 'none' }}
        />
      </section>

      <section className="input-group">
        <label style={{ fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.6 }}>STACK TECHNIQUE</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input type="text" placeholder="Front..." value={formData.technicalStack.front} onChange={(e) => handleStackChange('front', e.target.value)} style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid #2A2A2A', color: 'white', borderRadius: '4px' }} />
          <input type="text" placeholder="Back..." value={formData.technicalStack.back} onChange={(e) => handleStackChange('back', e.target.value)} style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid #2A2A2A', color: 'white', borderRadius: '4px' }} />
          <input type="text" placeholder="DB..." value={formData.technicalStack.db} onChange={(e) => handleStackChange('db', e.target.value)} style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid #2A2A2A', color: 'white', borderRadius: '4px' }} />
        </div>
      </section>

      <section className="input-group">
        <label style={{ fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.6 }}>OBJECTIFS SMART</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
          {formData.mainObjectives.map((obj, i) => (
            <input 
              key={i} 
              type="text" 
              value={obj} 
              onChange={(e) => handleObjectiveChange(i, e.target.value)} 
              placeholder={`Objectif ${i+1}`}
              style={{ padding: '0.4rem', background: 'transparent', border: '1px solid #2A2A2A', color: 'white', borderRadius: '4px' }}
            />
          ))}
          <button onClick={addObjective} style={{ background: 'transparent', border: '1px dashed #ADC6FF', color: '#ADC6FF', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.65rem' }}>
            + Objectif
          </button>
        </div>
      </section>
    </div>
  );
};
