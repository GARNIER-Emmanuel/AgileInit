import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const productVisionTemplate = (ctx: ProjectContext): string => `
${markdownHeader('Vision Produit', ctx)}

## Problème
${ctx.pitch}

## Solution
Une application moderne répondant aux besoins de ${ctx.targetUsers}.

## Objectifs Principaux
${ctx.mainObjectives.map((obj: string) => `- ${obj}`).join('\n')}

${markdownFooter()}
`;
