import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const architectureTemplate = (ctx: ProjectContext): string => {
  const patterns = ctx.technicalStack.architecturePatterns || [];
  const selectedArchis = patterns.length > 0 ? patterns.join(' + ') : 'Non spécifié';

  // SECTION 3: Comparatif / Descriptions
  const archiDescriptions: Record<string, string> = {
    'Clean Architecture': '- CLEAN ARCHITECTURE : Séparation stricte du domaine et de l\'infrastructure pour une testabilité maximale.',
    'Vertical Slice': '- VERTICAL SLICE : Organisation par fonctionnalités (slices) pour réduire la complexité croisée.',
    'Screaming Architecture': '- SCREAMING ARCHITECTURE : Structure de dossiers qui exprime explicitement le domaine métier.',
    'Hexagonal': '- HEXAGONALE : Isolation totale du cœur métier via des Ports et Adapteurs.',
    'MCD': '- MCD : Approche centrée sur les données et les relations entre entités.'
  };

  // SECTION 4: Principes Fondamentaux
  const archiPrinciples: Record<string, string> = {
    'Clean Architecture': '- Indépendance des frameworks et des outils.\n- Inversion de dépendances.',
    'Vertical Slice': '- Encapsulation des fonctionnalités.\n- Cohésion forte au sein de chaque slice.',
    'Screaming Architecture': '- Découvrabilité immédiate du métier.\n- Réduction de la dette cognitive technique.',
    'Hexagonal': '- Symétrie entre les entrées (driving) et les sorties (driven).\n- Inversion de contrôle (IoC).',
    'MCD': '- Intégrité référentielle.\n- Optimisation des modèles relationnels.'
  };

  // SECTION 5: Exemple de Structure
  let folderExample = 'src/\n';
  if (patterns.length === 0) {
    folderExample += '  app/\n  components/\n  services/\n';
  } else {
    patterns.forEach(p => {
       if (p === 'Clean Architecture') folderExample += '  shared/domain/\n  shared/infrastructure/\n';
       if (p === 'Vertical Slice') folderExample += '  features/user-management/\n  features/dashboard/\n';
       if (p === 'Screaming Architecture') folderExample += '  billing/\n  shipping/\n  catalog/ (Cœur Métier)\n';
       if (p === 'Hexagonal') folderExample += '  adapters/in/\n  adapters/out/\n  core/domain/\n';
    });
  }

  return `
${markdownHeader('Architecture', ctx)}

SECTION 1 : Stratégie d'Architecture (Hybride)
Le projet sera structuré selon la combinaison : ${selectedArchis.toUpperCase()}

SECTION 2 : Stack Technique
Frontend : ${ctx.technicalStack.front || "Non spécifié"}
Backend : ${ctx.technicalStack.back || "Non spécifié"}
Base de données : ${ctx.technicalStack.db || "Non spécifié"}

SECTION 3 : Justification des Modèles
${patterns.map(p => archiDescriptions[p] || `- ${p.toUpperCase()} : Modèle personnalisé configuré.`).join('\n')}

SECTION 4 : Principes Fondamentaux de Mise en Œuvre
${patterns.map(p => archiPrinciples[p] || '- Respect des standards du modèle choisi.').join('\n')}

SECTION 5 : Structure des Dossiers (Exemple Concret)
Voici un aperçu de l'organisation des fichiers pour votre configuration :

${folderExample}

${markdownFooter()}
`;
};
