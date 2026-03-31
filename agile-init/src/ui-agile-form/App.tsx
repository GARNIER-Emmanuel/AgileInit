import { useState, useEffect } from 'react';
import { StrategicContext } from './components/StrategicContext';
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

  const handleAddUS = (data: { role: string; action: string; benefit: string; personaId: string; priority: 'Must' | 'Should' | 'Could' | 'Wont' }) => {
    if (!project) return;
    addUserStory(project.id, data);
    setProject({ ...store.getProject()! });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBacklogOpen, setIsBacklogOpen] = useState(true);

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
      gridTemplateColumns: `${isSidebarOpen ? '320px' : '64px'} ${isBacklogOpen ? '0.5fr' : '0px'} minmax(500px, 1.5fr)`,
      height: '100vh',
      overflow: 'hidden',
      transition: 'grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      
      {/* Column 1: Strategic Context & Personas */}
      <aside className="sidebar unified-left" style={{ 
        borderRight: '1px solid #2A2A2A', 
        overflowY: isSidebarOpen ? 'auto' : 'hidden', 
        padding: isSidebarOpen ? '1rem' : '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        transition: 'padding 0.3s'
      }}>
        <header style={{ 
          marginBottom: isSidebarOpen ? '2rem' : '1rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: isSidebarOpen ? 'space-between' : 'center' 
        }}>
          {isSidebarOpen && (
            <h2 style={{ fontSize: '0.9rem', color: '#ADC6FF', margin: 0 }}>AGILEINIT <span style={{ opacity: 0.5 }}>FUSION</span></h2>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer', 
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
        </header>

        {isSidebarOpen ? (
          <StrategicContext 
            formData={strategicCtx} 
            onChange={setStrategicCtx} 
            personas={project.personas}
            onAddPersona={handleAddPersona}
            onAddUS={handleAddUS}
            onOpenBacklog={() => setIsBacklogOpen(true)}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', marginTop: '1rem', opacity: 0.4 }}>
            <div title="Projet">📁</div>
            <div title="Stack">⚡</div>
            <div title="Objectifs">🎯</div>
            <div title="Personas">👥</div>
          </div>
        )}
      </aside>

      {/* Column 2: User Stories Workshop */}
      <main className="workspace unified-center" style={{ 
        overflowY: 'auto', 
        padding: isBacklogOpen ? '2rem' : '0', 
        background: 'rgba(0,0,0,0.15)',
        visibility: isBacklogOpen ? 'visible' : 'hidden',
        transition: 'padding 0.3s'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Backlog</h3>
          <button 
            onClick={() => setIsBacklogOpen(false)}
            style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1rem' }}
          >
            ✕
          </button>
        </div>
        
        <Suggestions sugs={suggestions} onAccept={(sug) => handleAddUS(sug as any)} onReject={(idx) => setSuggestions(prev => prev.filter((_, i) => i !== idx))} />
        
        <div style={{ marginTop: '1rem' }}>
          <UserStoryList stories={project.userStories} personas={project.personas} />
        </div>
      </main>

      {/* Column 3: Global Preview (Auto-Docs) */}
      {generatedDocs ? (
        <div style={{ borderLeft: '1px solid #2A2A2A', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <AutoDocsPreview docs={generatedDocs} />
        </div>
      ) : (
        <div style={{ borderLeft: '1px solid #2A2A2A', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.4, padding: '2rem' }}>
          <p style={{ fontSize: '0.8rem' }}>Complétez le cadrage pour <br/><strong>VOIR LES RÉSULTATS</strong>.</p>
        </div>
      )}

    </div>
  );
}

export default App;
