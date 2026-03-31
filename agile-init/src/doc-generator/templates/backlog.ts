import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const backlogTemplate = (ctx: ProjectContext): string => `
${markdownHeader('Product Backlog', ctx)}

| ID | Titre | Priorité | Estimation |
|:---|:---|:---|:---|
| US1 | Initialisation du projet | Must | 5 pts |
| US2 | Configuration technique | Must | 3 pts |

${markdownFooter()}
`;
