import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const geminiPromptsTemplate = (ctx: ProjectContext): string => `
${markdownHeader('Prompts Gemini + Antigravity', ctx)}

## Prompt 1 — Initialisation (Phase 1)
Tu es un agent Antigravity...

${markdownFooter()}
`;
