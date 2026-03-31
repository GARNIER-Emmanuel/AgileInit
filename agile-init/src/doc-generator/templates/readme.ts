import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const readmeTemplate = (ctx: ProjectContext): string => `
${markdownHeader('README', ctx)}

## Pitch
${ctx.pitch}

## Objectifs
- ${ctx.mainObjectives.join('\n- ')}

## Stack
- Frontend : ${ctx.technicalStack.front}
- Backend : ${ctx.technicalStack.back}

${markdownFooter()}
`;
