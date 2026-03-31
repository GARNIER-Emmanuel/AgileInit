import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const userStoriesTemplate = (ctx: ProjectContext): string => `
${markdownHeader('User Stories', ctx)}

## US1 — Initialisation par ${ctx.targetUsers}
En tant qu'utilisateur, je veux pouvoir accéder aux fonctionnalités de base afin de remplir mes objectifs.

## US2 — Gestion de la stack (${ctx.technicalStack.front} / ${ctx.technicalStack.back})
En tant que développeur, je veux que la stack technique soit correctement configurée.

${markdownFooter()}
`;
