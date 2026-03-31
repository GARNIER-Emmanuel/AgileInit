import React, { useState } from 'react';
import { ProjectContext } from '../../doc-generator/domain/project-context';

interface AutoDocsFormProps {
  onGenerate: (ctx: ProjectContext) => void;
}

export const AutoDocsForm: React.FC<AutoDocsFormProps> = ({ onGenerate }) => {
  const [formData, setFormData] = useState<ProjectContext>({
    projectName: '',
    pitch: '',
    targetUsers: '',
    mainObjectives: [''],
    technicalStack: { front: '', back: '', db: '' }
  });

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjs = [...formData.mainObjectives];
    newObjs[index] = value;
    setFormData({ ...formData, mainObjectives: newObjs });
  };

  const addObjective = () => {
    setFormData({ ...formData, mainObjectives: [...formData.mainObjectives, ''] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="premium-card glass" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', background: 'linear-gradient(135deg, #ADC6FF, #4B8EFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Générateur de Documentation Auto-Docs
        </h2>
        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Décrivez votre projet pour obtenir 7 documents de cadrage complets.</p>
      </header>

      <form onSubmit={handleSubmit} className="us-input-group">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label>NOM DU PROJET</label>
            <input 
              type="text" 
              placeholder="Ex: MySaaS V1" 
              value={formData.projectName} 
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} 
              required 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label>CIBLE UTILISATEUR</label>
            <input 
              type="text" 
              placeholder="Ex: Startups, Étudiants..." 
              value={formData.targetUsers} 
              onChange={(e) => setFormData({ ...formData, targetUsers: e.target.value })} 
              required 
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label>PITCH / VISION</label>
          <textarea 
            placeholder="Décrivez le problème et votre solution..." 
            value={formData.pitch} 
            onChange={(e) => setFormData({ ...formData, pitch: e.target.value })} 
            rows={3}
            required 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label>FRONTEND</label>
            <input type="text" placeholder="React, Vue..." value={formData.technicalStack.front} onChange={(e) => setFormData({ ...formData, technicalStack: { ...formData.technicalStack, front: e.target.value } })} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label>BACKEND</label>
            <input type="text" placeholder="Node.js, Go..." value={formData.technicalStack.back} onChange={(e) => setFormData({ ...formData, technicalStack: { ...formData.technicalStack, back: e.target.value } })} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label>DATABASE</label>
            <input type="text" placeholder="PostgreSQL, Redis..." value={formData.technicalStack.db} onChange={(e) => setFormData({ ...formData, technicalStack: { ...formData.technicalStack, db: e.target.value } })} required />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <label>OBJECTIFS (SMART)</label>
          {formData.mainObjectives.map((obj, i) => (
            <input 
              key={i} 
              type="text" 
              placeholder={`Objectif ${i+1}`} 
              value={obj} 
              onChange={(e) => handleObjectiveChange(i, e.target.value)} 
              required 
            />
          ))}
          <button type="button" onClick={addObjective} style={{ background: 'transparent', border: '1px dashed #ADC6FF', color: '#ADC6FF', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem' }}>
            + Ajouter un objectif
          </button>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>GÉNÉRER LA DOCUMENTATION (PHASE C)</button>
      </form>
    </div>
  );
};
