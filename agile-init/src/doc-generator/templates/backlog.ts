import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const backlogTemplate = (ctx: ProjectContext): string => {
  const priorityMap: any = { Must: 'Vital', Should: 'Essentiel', Could: 'Optionnel', Wont: 'Exclu' };
  const statusMap: any = { Draft: 'Brouillon', Ready: 'Prêt', 'In Progress': 'En cours', Done: 'Terminé' };

  const rows = ctx.userStories && ctx.userStories.length > 0
    ? ctx.userStories.map((us: any, i: number) => `USER STORY US${i+1}\nAction : ${us.action}\nPriorité : ${priorityMap[us.priority] || us.priority}\nStatut : ${statusMap[us.status] || us.status}`).join('\n\n')
    : `US1 : Initialisation du projet (Vital / Brouillon)\nUS2 : Configuration technique (Vital / Brouillon)`;

  return `
${markdownHeader('Backlog Produit', ctx)}

${rows}

Légende des priorités :
Vital : Fonctionnalités non négociables.
Essentiel : Important mais pas vital.
Optionnel : Souhaitable si possible.
Exclu : Reporté.

${markdownFooter()}
`;
};
