import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const backlogTemplate = (ctx: ProjectContext): string => {
  const rows = ctx.userStories && ctx.userStories.length > 0
    ? ctx.userStories.map((us, i) => `| US${i+1} | ${us.action.substring(0, 30)}... | ${us.priority} | 3 pts | ${us.status} |`).join('\n')
    : `| US1 | Initialisation du projet | Must | 5 pts | Draft |\n| US2 | Configuration technique | Must | 3 pts | Draft |`;

  return `
${markdownHeader('Product Backlog', ctx)}

| ID | Titre | Priorité | Estimation | Statut |
|:---|:---|:---|:---|:---|
${rows}

${markdownFooter()}
`;
};
