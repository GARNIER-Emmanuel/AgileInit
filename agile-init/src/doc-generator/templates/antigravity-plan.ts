import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const antigravityPlanTemplate = (ctx: ProjectContext): string => `
${markdownHeader('Plan Antigravity', ctx)}

## Phase 1 — Initialisation du repo
Objectif : créer un monorepo avec la stack ${ctx.technicalStack.front} + ${ctx.technicalStack.back}.

## Phase 2 — Modèle domaine
Objectif : implémenter les entités de base.

## Phase 3 — UI de base
Objectif : créer les formulaires React de saisie.

${markdownFooter()}
`;
