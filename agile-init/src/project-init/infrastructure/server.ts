import express from 'express';
import cors from 'cors';

import { generateDocs } from '../../generate-docs/services/docGenerator';
import { store } from '../../shared/store';
import { suggestUserStories } from '../use-cases/suggestUserStories';
import { docsRouter } from '../../doc-generator/infrastructure/docs.router';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Main Doc Generation Routes (Evolution)
app.use('/api/docs', docsRouter);

app.get('/api/health', (_, res) => {
  res.json({ status: 'OK', message: 'AgileInit Backend is running' });
});

app.get('/api/suggestions', (_, res) => {
  const project = store.getProject();
  if (!project) return res.status(404).json({ error: 'No project' });
  const sugs = suggestUserStories(project);
  res.json(sugs);
});

app.post('/api/export', (_, res) => {
  const project = store.getProject();
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  const docs = generateDocs(project);
  res.json(docs);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
