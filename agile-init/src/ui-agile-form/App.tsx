import { useState, useEffect } from 'react';
import { StrategicContext } from './components/StrategicContext';
import { PersonaForm } from './components/PersonaForm';
import { UserStoryForm } from './components/UserStoryForm';
import { UserStoryList } from './components/UserStoryList';
import { AutoDocsPreview } from './components/AutoDocsPreview';
import { Suggestions } from './components/Suggestions';
import { ProjectForm } from './components/ProjectForm';

// Use-cases & services
import { createProject } from '../project-init/use-cases/createProject';
import { addPersona } from '../project-init/use-cases/addPersona';
import { addUserStory } from '../project-init/use-cases/addUserStory';
import { store } from '../shared/store';
import { AgileProject, UserStory } from '../project-init/domain/entities';
import { ProjectContext } from '../doc-generator/domain/project-context';

function App() {
  const [project, setProject] = useState<AgileProject | null>(null);
  const [strategicCtx, setStrategicCtx] = useState<ProjectContext>({
    projectName: '',
    pitch: '',
    targetUsers: '',
    mainObjectives: [''],
    technicalStack: { front: '', back: '', db: '' }
  });
  const [suggestions, setSuggestions] = useState<Partial<UserStory>[]>([]);
  const [generatedDocs, setGeneratedDocs] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-generate docs when context or project changes (debounced)
  useEffect(() => {
    if (!project) return;
    
    const timeout = setTimeout(async () => {
      setIsGenerating(true);
      const res = await fetch('/api/docs/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...strategicCtx,
          userStories: project.userStories,
          personas: project.personas
        })
      });
      if (res.ok) {
        const docs = await res.json();
        setGeneratedDocs(docs);
      }
      setIsGenerating(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [strategicCtx, project?.userStories, project?.personas]);

  const downloadAll = async () => {
    const response = await fetch('/api/export', { method: 'POST' });
    if (response.ok) {
      alert("Projet synchronisé avec le backend !");
    }
  };

  useEffect(() => {
    if (project) {
      setStrategicCtx(prev => ({
        ...prev,
        projectName: project.name,
        pitch: project.description
      }));
      
      fetch('/api/suggestions')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setSuggestions(data);
        })
        .catch(err => console.error("Suggestions error:", err));
    }
  }, [project]);

  const handleCreateProject = (data: { name: string; description: string }) => {
    const newProject = createProject(data);
    setProject({ ...newProject });
  };

  const handleAddPersona = (data: { name: string; role: string; description: string }) => {
    if (!project) return;
    addPersona(project.id, data);
    setProject({ ...store.getProject()! });
  };

  const handleAddUS = (data: { role: string; action: string; benefit: string; personaId: string }) => {
    if (!project) return;
    addUserStory(project.id, data);
    setProject({ ...store.getProject()! });
  };

  if (!project) {
    return (
      <div className="onboarding-page" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ProjectForm onSave={handleCreateProject} />
      </div>
    );
  }

  return (
    <div className="dashboard-layout v2-fusion" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'minmax(250px, 1fr) minmax(400px, 2fr) minmax(350px, 1.5fr)',
      height: '100vh',
      overflow: 'hidden'
    }}>
      
      {/* Column 1: Strategic Context & Personas */}
      <aside className="sidebar unified-left" style={{ borderRight: '1px solid #2A2A2A', overflowY: 'auto', padding: '1rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', color: '#ADC6FF' }}>AGILEINIT <span style={{ opacity: 0.5 }}>FUSION</span></h2>
        </header>

        <StrategicContext formData={strategicCtx} onChange={setStrategicCtx} />

        <div style={{ marginTop: '2rem', borderTop: '1px solid #2A2A2A', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '0.7rem', letterSpacing: '0.1em', opacity: 0.8, marginBottom: '1rem' }}>PERSONAS</h3>
          <div className="persona-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
            {project.personas.map(p => (
              <span key={p.id} style={{ fontSize: '0.65rem', background: 'rgba(173, 198, 255, 0.1)', border: '1px solid var(--outline-variant)', color: '#ADC6FF', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
                {p.name}
              </span>
            ))}
          </div>
          <PersonaForm onAdd={handleAddPersona} />
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid #2A2A2A', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <button 
            onClick={downloadAll} 
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid #2A2A2A', 
              color: 'white', 
              padding: '0.6rem', 
              borderRadius: '6px', 
              fontSize: '0.7rem', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
            🚀 EXPORT API PROJET
          </button>
        </div>
      </aside>

      {/* Column 2: User Stories Workshop */}
      <main className="workspace unified-center" style={{ overflowY: 'auto', padding: '2rem', background: 'rgba(0,0,0,0.2)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem', fontWeight: 600 }}>Spécifications & Backlog</h3>
        
        <UserStoryForm personas={project.personas} onAdd={handleAddUS} />
        <Suggestions sugs={suggestions} onAccept={(sug) => handleAddUS(sug as any)} onReject={(idx) => setSuggestions(prev => prev.filter((_, i) => i !== idx))} />
        
        <div style={{ marginTop: '3rem' }}>
          <UserStoryList stories={project.userStories} personas={project.personas} />
        </div>
      </main>

      {/* Column 3: Global Preview (Auto-Docs) */}
      <aside className="preview-panel unified-right" style={{ borderLeft: '1px solid #2A2A2A', overflowY: 'auto', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.6 }}>PREVIEW LIVRABLES</h3>
          <div style={{ fontSize: '0.6rem', color: isGenerating ? '#ADC6FF' : '#888' }}>
            <span style={{ color: isGenerating ? '#ADC6FF' : '#28a745' }}>●</span> {isGenerating ? 'GEN...' : 'AUTO-SYNC'}
          </div>
        </div>

        {generatedDocs ? (
          <AutoDocsPreview docs={generatedDocs} />
        ) : (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', opacity: 0.4, border: '1px dashed #2A2A2A', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.8rem' }}>Complétez le cadrage pour <br/><strong>VOIR LES RÉSULTATS</strong>.</p>
          </div>
        )}
      </aside>

    </div>
  );
}

export default App;
