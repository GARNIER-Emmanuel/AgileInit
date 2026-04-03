import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const antigravityPlanTemplate = (ctx: ProjectContext): string => {
  const isPython = ctx.technicalStack.back.toLowerCase().includes('python');
  const setupStep = isPython ? 'Configuration de l\'environnement virtuel et installation via pip.' : 'Initialisation du package.json et installation via npm.';

  return `
${markdownHeader('Plan Antigravity', ctx)}

Ce document répartit le développement de ${ctx.projectName} en phases stratégiques.

PHASE 1 : Initialisation (Stratégie)
Objectif : créer le socle technique avec la stack ${ctx.technicalStack.front} + ${ctx.technicalStack.back}.
${setupStep}

PHASE 2 : Modèle Domaine & Mockups
Objectif : implémenter les entités de base et les formulaires de saisie.

PHASE 3 : Logique de Données & Persistence
Objectif : connecter le backend à la base de données ${ctx.technicalStack.db}.

PHASE 4 : Livraison
Objectif : finalisation des livrables.

${markdownFooter()}
`;
};
