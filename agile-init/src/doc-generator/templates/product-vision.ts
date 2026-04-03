import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const productVisionTemplate = (ctx: ProjectContext): string => `
${markdownHeader('Vision Produit', ctx)}

SECTION 1 : Résumé Exécutif (Pitch)
${ctx.pitch || "Aucun pitch renseigné."}

SECTION 2 : Cible Utilisateur
Le produit s'adresse principalement à : ${ctx.targetUsers || "Cible non définie"}.

SECTION 3 : Objectifs Stratégiques (SMART)
${(ctx.mainObjectives && ctx.mainObjectives.filter(o => o.trim()).length > 0) 
    ? ctx.mainObjectives.map((obj: string) => `- ${obj}`).join('\n') 
    : "Aucun objectif SMART défini."}

SECTION 4 : Proposition de Valeur
En utilisant ${ctx.technicalStack.front} et ${ctx.technicalStack.back}, nous garantissons une expérience fluide et performante.

${markdownFooter()}
`;
