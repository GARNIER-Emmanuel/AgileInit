import { describe, it, expect, beforeEach } from 'vitest';
import { createProject } from '../createProject';
import { addPersona } from '../addPersona';
import { addUserStory } from '../addUserStory';
import { generateBacklog } from '../generateBacklog';
import { store } from '../../../shared/store';

describe('Project Use Cases', () => {
  beforeEach(() => {
    // Reset store for each test would be ideal, but for v1 we just overwrite
    createProject({ name: 'Test Project', description: 'Test Desc' });
  });

  it('should create a project', () => {
    const project = createProject({ name: 'New Project', description: 'New Desc' });
    expect(project.name).toBe('New Project');
    expect(store.getProject()?.name).toBe('New Project');
  });

  it('should add a persona', () => {
    const project = store.getProject();
    const persona = addPersona(project!.id, { 
      name: 'Alice', 
      role: 'Admin', 
      description: 'System admin' 
    });
    expect(persona.name).toBe('Alice');
    expect(store.getProject()?.personas.length).toBe(1);
  });

  it('should add a user story', () => {
    const project = store.getProject();
    const us = addUserStory(project!.id, {
      role: 'Admin',
      action: 'delete user',
      benefit: 'keep system clean',
      personaId: 'alice-id'
    });
    expect(us.action).toBe('delete user');
    expect(us.status).toBe('Draft');
    expect(store.getProject()?.userStories.length).toBe(1);
  });

  it('should generate a backlog markdown', () => {
    const project = store.getProject();
    const markdown = generateBacklog(project!.id);
    expect(markdown).toContain('# Backlog - Test Project');
  });
});
