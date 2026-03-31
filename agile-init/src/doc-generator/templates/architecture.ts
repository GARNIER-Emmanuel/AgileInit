import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const architectureTemplate = (ctx: ProjectContext): string => `
${markdownHeader('Architecture', ctx)}

## Stack Technique
- **Frontend** : ${ctx.technicalStack.front}
- **Backend** : ${ctx.technicalStack.back}
- **Base de données** : ${ctx.technicalStack.db}

## Principes de conception
- Architecture modulaire et propre (Clean Architecture).
- Séparation des responsabilités.

${markdownFooter()}
`;
