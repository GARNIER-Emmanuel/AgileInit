import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const geminiPromptsTemplate = (ctx: ProjectContext): string => `
${markdownHeader('Prompts Strategiques', ctx)}

PROMPT 1 : Initialisation
Tu es un expert en ${ctx.technicalStack.front} et ${ctx.technicalStack.back}. Je lance un projet nommé ${ctx.projectName} dont le pitch est : ${ctx.pitch}. Prépare-moi la structure de dossier et le fichier de configuration de base.

PROMPT 2 : Raffinage des User Stories
Explore mes User Stories et pour chacune, décompose-la en tâches techniques atomiques nécessaires à sa réalisation en te basant sur une base de données ${ctx.technicalStack.db}.

PROMPT 3 : Revue de Code
En tant qu'expert en Clean Architecture, analyse mes composants et propose des améliorations de design pour garantir la scalabilité de mon projet.

${markdownFooter()}
`;
