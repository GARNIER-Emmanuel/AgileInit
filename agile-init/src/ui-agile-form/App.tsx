import { useState, useEffect } from 'react';
import { ProjectForm } from './components/ProjectForm';
import { PersonaForm } from './components/PersonaForm';
import { UserStoryForm } from './components/UserStoryForm';
import { UserStoryList } from './components/UserStoryList';
import { MarkdownPreview } from './components/MarkdownPreview';
import { Suggestions } from './components/Suggestions';
import { AutoDocsForm } from './components/AutoDocsForm';
import { AutoDocsPreview } from './components/AutoDocsPreview';

// Use-cases & services
import { createProject } from '../project-init/use-cases/createProject';
import { addPersona } from '../project-init/use-cases/addPersona';
import { addUserStory } from '../project-init/use-cases/addUserStory';
import { generateDocs as generateBacklogDocs } from '../generate-docs/services/docGenerator';
import { store } from '../shared/store';
import { AgileProject, UserStory } from '../project-init/domain/entities';
import { ProjectContext } from '../doc-generator/domain/project-context';

function App() {
  const [project, setProject] = useState<AgileProject | null>(null);
  const [markdown, setMarkdown] = useState('');
  const [suggestions, setSuggestions] = useState<Partial<UserStory>[]>([]);
  const [viewMode, setViewMode] = useState<'workshop' | 'autodocs'>('workshop');
  const [generatedDocs, setGeneratedDocs] = useState<any>(null);

  useEffect(() => {
    if (project && viewMode === 'workshop') {
      const docs = generateBacklogDocs(project);
      setMarkdown(docs.full);
      
      fetch('/api/suggestions')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setSuggestions(data);
          else console.warn("Suggestions format error:", data);
        })
        .catch(err => console.error("Suggestions error:", err));
    }
  }, [project, viewMode]);

  const handleCreateProject = (data: { name: string; description: string }) => {
    const newProject = createProject(data);
    setProject({ ...newProject });
  };

  const handleAddPersona = (data: { name: string; role: string; description: string }) => {
    if (!project) return;
    addPersona(project.id, data);
    const updated = store.getProject();
    if (updated) setProject({ ...updated });
  };

  const handleAddUS = (data: { role: string; action: string; benefit: string; personaId: string }) => {
    if (!project) return;
    addUserStory(project.id, data);
    const updated = store.getProject();
    if (updated) setProject({ ...updated });
  };

  const handleAcceptSug = (sug: Partial<UserStory>) => {
    handleAddUS(sug as any);
    setSuggestions(prev => prev.filter(s => s.action !== sug.action));
  };

  const handleRejectSug = (idx: number) => {
    setSuggestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleGenerateAutoDocs = async (ctx: ProjectContext) => {
    const res = await fetch('/api/docs/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ctx)
    });
    if (res.ok) {
      const docs = await res.json();
      setGeneratedDocs(docs);
    }
  };

  const downloadAll = async () => {
    const response = await fetch('/api/export', { method: 'POST' });
    if (response.ok) {
      alert("Projet synchronisé avec le backend !");
    }
  };

  if (!project) {
    return (
      <div className="onboarding-page" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ProjectForm onSave={handleCreateProject} />
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <header>
          <h2 style={{ fontSize: '1rem', color: '#ADC6FF' }}>AGILEINIT <span style={{ opacity: 0.5 }}>STRATEGIC</span></h2>
          <p style={{ fontSize: '0.6rem', opacity: 0.5, marginTop: '0.2rem', letterSpacing: '0.1em' }}>VERSION EVOLUTION C</p>
        </header>

        <nav style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setViewMode('workshop')} 
            style={{ 
              background: viewMode === 'workshop' ? 'rgba(173, 198, 255, 0.1)' : 'transparent', 
              border: viewMode === 'workshop' ? '1px solid var(--outline-variant)' : 'none',
              color: viewMode === 'workshop' ? '#ADC6FF' : 'white',
              padding: '0.8rem', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', fontSize: '0.8rem' 
            }}>
            🛠 Workshop Cadrage
          </button>
          <button 
            onClick={() => setViewMode('autodocs')} 
            style={{ 
              background: viewMode === 'autodocs' ? 'rgba(173, 198, 255, 0.1)' : 'transparent', 
              border: viewMode === 'autodocs' ? '1px solid var(--outline-variant)' : 'none',
              color: viewMode === 'autodocs' ? '#ADC6FF' : 'white',
              padding: '0.8rem', borderRadius: '8px', textAlign: 'left', cursor: 'pointer', fontSize: '0.8rem' 
            }}>
            📑 Auto-Docs Factory
          </button>
        </nav>

        {viewMode === 'workshop' && (
          <div className="sidebar-persona-section" style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '0.7rem', letterSpacing: '0.1em', opacity: 0.8, marginBottom: '1rem' }}>PERSONAS</h3>
            <div className="persona-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {project.personas.map(p => (
                <span key={p.id} style={{ fontSize: '0.6rem', background: 'var(--surface-container)', padding: '0.3rem 0.5rem', borderRadius: '4px' }}>
                  {p.name}
                </span>
              ))}
            </div>
            <PersonaForm onAdd={handleAddPersona} />
          </div>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '2rem' }}>
           <div style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.75rem', opacity: 0.8, cursor: 'pointer' }} onClick={downloadAll}>🚀 Export API</div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="workspace" style={{ gridColumn: viewMode === 'autodocs' ? '2 / span 2' : '2' }}>
        {viewMode === 'workshop' ? (
          <>
            <UserStoryForm personas={project.personas} onAdd={handleAddUS} />
            <Suggestions sugs={suggestions} onAccept={handleAcceptSug} onReject={handleRejectSug} />
            <UserStoryList stories={project.userStories} personas={project.personas} />
          </>
        ) : (
          <div className="autodocs-container" style={{ padding: '1rem' }}>
            <AutoDocsForm onGenerate={handleGenerateAutoDocs} />
            {generatedDocs && <AutoDocsPreview docs={generatedDocs} />}
          </div>
        )}
      </main>

      {/* Right Panel (only in workshop mode) */}
      {viewMode === 'workshop' && (
        <aside className="preview-panel">
          <MarkdownPreview markdown={markdown} />
        </aside>
      )}
    </div>
  );
}

export default App;
