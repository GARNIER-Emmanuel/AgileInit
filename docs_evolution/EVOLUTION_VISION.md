# Vision Évolution — AgileInit Auto-Docs

## Problème
Aujourd'hui, AgileInit aide à cadrer un projet, mais la création de la
documentation (PRODUCT_VISION.md, USER_STORIES.md, BACKLOG.md,
ARCHITECTURE.md, ANTIGRAVITY_PLAN.md, GEMINI_PROMPTS.md, README.md)
reste manuelle pour l'utilisateur.

## Objectif
Permettre à l'utilisateur, via une interface web, de:
- Saisir le contexte de son projet (objectif, produit, contraintes).
- Laisser l'application générer automatiquement tous les fichiers
  `.md` standards du projet à partir de ce contexte.

## Résultat attendu
En moins de 10 minutes, un utilisateur novice obtient:
- Un README.md prêt à pousser sur Git.
- Un PRODUCT_VISION.md cohérent.
- Un USER_STORIES.md initial avec quelques US fines.
- Un BACKLOG.md priorisé.
- Un ARCHITECTURE.md simple mais crédible.
- Un ANTIGRAVITY_PLAN.md et des GEMINI_PROMPTS.md utilisables dans
  Antigravity pour générer le code du projet.

## Métriques SMART
- Générer au moins 6 fichiers `.md` complets pour 3 projets tests
  en moins de 10 minutes de saisie chacun.
- 80 % des fichiers générés sont jugés "utilisables sans tout réécrire"
  par au moins 3 utilisateurs.