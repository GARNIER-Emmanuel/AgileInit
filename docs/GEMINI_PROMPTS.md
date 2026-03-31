# Prompts Gemini + Antigravity — AgileInit

## Prompt 1 — Initialisation du projet (Phase 1)

Tu es un agent Antigravity connecté à Gemini 3 Pro.
Crée un nouveau projet appelé `agile-init` avec la stack suivante :

- Backend : Node.js + TypeScript.
- Frontend : React + Vite.
- Architecture : Screaming + modulaire, comme décrit dans ARCHITECTURE.md.
- Docs : génère dans le projet les fichiers markdown suivants à partir
  de leur contenu si présent dans la conversation : README.md,
  PRODUCT_VISION.md, USER_STORIES.md, BACKLOG.md, ARCHITECTURE.md.

Contraintes :
- Respecte la structure de dossiers décrite dans ARCHITECTURE.md.
- Ajoute les scripts npm pour `dev`, `build`, `test`.
- Utilise TypeScript partout côté backend et frontend.

À la fin, génère un court fichier `OVERVIEW.md` qui résume ce que
tu as créé.

---

## Prompt 2 — Domaine & use-cases (Phase 2)

Dans le projet existant `agile-init`, implémente le domaine et les
use-cases décrits dans USER_STORIES.md et ARCHITECTURE.md :

- Entités : Persona, UserStory, AgileProject.
- Use-cases :
  - createProject(projectData)
  - addPersona(projectId, persona)
  - addUserStory(projectId, userStory)
  - generateBacklog(projectId) — version sans IA, basée sur templates.

Contraintes :
- Place les entités dans `src/project-init/domain/`.
- Place les use-cases dans `src/project-init/use-cases/`.
- Ajoute des tests unitaires simples pour chaque use-case.

---

## Prompt 3 — UI React de base (Phase 3)

Dans le projet `agile-init`, crée une UI React minimaliste permettant :

- De saisir les infos projet (nom, description).
- D’ajouter des Personas.
- De créer des User Stories à partir des placeholders US2.
- D’afficher la liste des US avec leur Persona (US1).

Contraintes :
- Les composants doivent vivre dans `src/ui-agile-form/components/`.
- Utilise un state management simple (useState / context).
- Prépare une zone de prévisualisation Markdown pour US3 (même si le
  rendu est encore brut).

---

## Prompt 4 — Intégration Stitch MCP (Phase 4)

Connecte ce projet à Stitch MCP conformément à la doc Design-to-Code
avec Antigravity + Stitch [web:48][web:56][web:51] :

- Ajoute la configuration MCP Stitch nécessaire.
- Crée ou importe un design Stitch qui représente :
  - Un layout avec sidebar (navigation / info projet).
  - Une zone centrale pour le formulaire d’US.
  - Un panneau de droite pour l’aperçu Markdown.

Remplace la UI React basique par le layout créé à partir des tokens
de design Stitch.

---

## Prompt 5 — Génération de Markdown & Copy global (Phase 5)

Implémente la génération de fichiers Markdown :

- BESOINS.md
- USER_STORIES_EXPORT.md
- BACKLOG_EXPORT.md
- STACK_TECH.md

Utilise des templates (Handlebars ou équivalent) pour transformer les
données en texte. Ajoute un bouton global « Copy to Clipboard » en
frontend (US4) qui copie l’ensemble de ces contenus en une fois.

Contraintes :
- Les templates résident dans `src/generate-docs/templates/`.
- La logique de génération est dans `src/generate-docs/services/`.
- Expose une route `POST /api/export` qui retourne aussi le markdown.

---

## Prompt 6 — Suggestions d’US (Phase 6)

Ajoute une fonctionnalité simple de suggestions d’User Stories (US6)
basée sur le contexte projet :

- À partir de la description du projet + des personas, génère quelques
  suggestions d’US "basiques" côté backend (sans appel IA externe ou
  en utilisant un simple moteur de règles).
- Affiche-les dans une section « Suggestions » avec les actions
  Accepter/Rejeter.

Contraintes :
- Les suggestions sont marquées comme "brouillon" tant qu’elles ne
  sont pas acceptées.
- Accepter une suggestion la convertit en US normale dans le backlog.

---

## Prompt 7 — Revue finale & cleanup

Analyse l’ensemble du projet `agile-init` :

- Vérifie la cohérence avec les docs README.md, PRODUCT_VISION.md,
  USER_STORIES.md, BACKLOG.md, ARCHITECTURE.md.
- Liste les points techniques à améliorer (DX, tests, typage).
- Propose un petit plan d’évolution (v2) dans un fichier
  `NEXT_STEPS.md`.

Ne modifie pas le code dans cette étape, produis seulement la revue.