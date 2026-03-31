import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const userStoriesTemplate = (ctx: ProjectContext): string => {
  const priorityMap: any = { Must: 'Vital', Should: 'Essentiel', Could: 'Optionnel', Wont: 'Exclu' };
  const statusMap: any = { Draft: 'Brouillon', Ready: 'Prêt', 'In Progress': 'En cours', Done: 'Terminé' };

  const stories = ctx.userStories && ctx.userStories.length > 0
    ? ctx.userStories.map((us: any, i: number) => `USER STORY ${i+1} : ${us.action}\nEn tant que ${us.role || 'Utilisateur'}, je veux ${us.action} afin de ${us.benefit}.\n\nPriorité : ${priorityMap[us.priority] || us.priority}\nStatut : ${statusMap[us.status] || us.status}`).join('\n\n\n')
    : `Aucune User Story définie. Ajoutez des US dans la sidebar pour les voir apparaître ici.`;

  return `
${markdownHeader('User Stories', ctx)}

${stories}

${markdownFooter()}
`;
};
