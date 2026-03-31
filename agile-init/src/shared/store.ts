import { AgileProject, Persona, UserStory } from '../project-init/domain/entities';

// Simple in-memory storage for v1 logic
class MemoryStore {
  private project: AgileProject | null = null;

  setProject(project: AgileProject) {
    this.project = project;
  }

  getProject(): AgileProject | null {
    return this.project;
  }

  addPersona(persona: Persona) {
    if (this.project) {
      this.project.personas.push(persona);
    }
  }

  addUserStory(userStory: UserStory) {
    if (this.project) {
      this.project.userStories.push(userStory);
    }
  }
}

export const store = new MemoryStore();
