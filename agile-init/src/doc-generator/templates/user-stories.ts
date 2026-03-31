import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const userStoriesTemplate = (ctx: ProjectContext): string => {
  const stories = ctx.userStories && ctx.userStories.length > 0
    ? ctx.userStories.map((us, i) => `## US${i+1} — ${us.action}\nEn tant que ${us.role}, je veux ${us.action} afin de ${us.benefit}.`).join('\n\n')
    : `## US1 — Initialisation par ${ctx.targetUsers}\nEn tant qu'utilisateur, je veux pouvoir accéder aux fonctionnalités de base afin de remplir mes objectifs.`;

  return `
${markdownHeader('User Stories', ctx)}

${stories}

${markdownFooter()}
`;
};
