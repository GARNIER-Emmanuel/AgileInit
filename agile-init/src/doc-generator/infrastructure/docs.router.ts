import { Router } from 'express';
import { generateDocs } from '../use-cases/generateDocs.usecase';
import { ProjectContext } from '../domain/project-context';

export const docsRouter = Router();

docsRouter.post('/generate', (req, res) => {
  const ctx = req.body as ProjectContext;
  
  if (!ctx.projectName || !ctx.pitch) {
    return res.status(400).json({ error: 'Missing required project context fields.' });
  }

  const result = generateDocs(ctx);
  res.json(result);
});

docsRouter.get('/sample', (_, res) => {
  const sample: ProjectContext = {
    projectName: 'Koda Assistant',
    pitch: 'Un assistant Agile intelligent pour cadres et développeurs.',
    targetUsers: 'Product Owners et Devs débutants',
    mainObjectives: ['Cadrer 100% des projets en < 10min', 'Automatiser la génération de prompts Antigravity'],
    technicalStack: {
      front: 'React + Vite',
      back: 'Node.js + Express',
      db: 'MemoryStore',
      architecturePatterns: ['Clean Architecture']
    }
  };
  res.json(sample);
});
