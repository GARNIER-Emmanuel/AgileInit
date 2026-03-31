import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const backlogTemplate = (ctx: ProjectContext): string => {
  const rows = ctx.userStories && ctx.userStories.length > 0
    ? ctx.userStories.map((us, i) => `| US${i+1} | ${us.action.substring(0, 30)}... | Must | 3 pts |`).join('\n')
    : `| US1 | Initialisation du projet | Must | 5 pts |\n| US2 | Configuration technique | Must | 3 pts |`;

  return `
${markdownHeader('Product Backlog', ctx)}

| ID | Titre | Priorité | Estimation |
|:---|:---|:---|:---|
${rows}

${markdownFooter()}
`;
};
