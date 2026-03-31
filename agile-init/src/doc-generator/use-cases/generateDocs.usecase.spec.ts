import { describe, it, expect } from 'vitest';
import { generateDocs } from './generateDocs.usecase';
import { ProjectContext } from '../domain/project-context';

describe('generateDocs UseCase', () => {
  const mockCtx: ProjectContext = {
    projectName: 'Test Project',
    pitch: 'Simple pitch',
    targetUsers: 'Testers',
    mainObjectives: ['Obj1'],
    technicalStack: { front: 'React', back: 'Node', db: 'Postgres' }
  };

  it('should generate all 7 documentation files', () => {
    const docs = generateDocs(mockCtx);
    
    expect(docs).toHaveProperty('productVision');
    expect(docs).toHaveProperty('userStories');
    expect(docs).toHaveProperty('backlog');
    expect(docs).toHaveProperty('architecture');
    expect(docs).toHaveProperty('antigravityPlan');
    expect(docs).toHaveProperty('geminiPrompts');
    expect(docs).toHaveProperty('readme');
  });

  it('should include the project name in generated docs', () => {
    const docs = generateDocs(mockCtx);
    expect(docs.productVision).toContain('Test Project');
    expect(docs.readme).toContain('Simple pitch');
  });
});
