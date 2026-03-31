import { AgileProject } from '../domain/entities';
import { store } from '../../shared/store';

export const createProject = (projectData: { name: string; description: string }): AgileProject => {
  const newProject: AgileProject = {
    id: Math.random().toString(36).substring(7),
    name: projectData.name,
    description: projectData.description,
    personas: [],
    userStories: []
  };
  store.setProject(newProject);
  return newProject;
};
