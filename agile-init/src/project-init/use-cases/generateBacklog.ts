import { store } from '../../shared/store';

export const generateBacklog = (_projectId: string): string => {
  const project = store.getProject();
  if (!project) return 'No project found';

  let markdown = `# Backlog - ${project.name}\n\n`;
  markdown += `## Description\n${project.description}\n\n`;
  
  markdown += `## Personas\n`;
  project.personas.forEach(p => {
    markdown += `- **${p.name}** (${p.role}): ${p.description}\n`;
  });
  
  markdown += `\n## User Stories\n`;
  project.userStories.forEach(us => {
    const persona = project.personas.find(p => p.id === us.personaId);
    markdown += `### [${us.status}] En tant que ${us.role}\n`;
    markdown += `> Je veux ${us.action}\n`;
    markdown += `> Afin de ${us.benefit}\n`;
    if (persona) markdown += `*Persona : ${persona.name}*\n`;
    markdown += `\n---\n`;
  });

  return markdown;
};
