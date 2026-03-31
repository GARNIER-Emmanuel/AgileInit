# AgileInit — Générateur de cadrage Agile

## Pitch
AgileInit est une application Node.js + React permettant à un PO ou un dev
de cadrer un projet en méthodologie Agile en moins de 15 minutes.
L’app pose des questions guidées, structure les User Stories, génère du
Markdown (besoins, backlog) et fournit une UI moderne générée via
Stitch MCP + Antigravity [web:48][web:56].

## Objectifs métier
- Réduire le temps de cadrage initial de ~2h à <15min.
- Produire des livrables Markdown exploitables sans retouche (80 % mini).
- Proposer une UI claire pour la saisie des US et la visualisation du
  backlog.

## Stack
- Backend : Node.js, TypeScript, architecture Screaming + modulaire.
- Frontend : React + Vite, intégration Design-to-Code via Stitch MCP.
- AI design : Google Stitch (UI/UX) + Antigravity (génération du code React).
- Format livrables : fichiers `.md` commités dans Git.

## Fonctionnalités principales (US)
- US1 : Lier chaque User Story à un Persona via un dropdown.
- US2 : Placeholders contextuels « En tant que [Rôle], je veux [Action]
  afin de [Bénéfice] ».
- US3 : Aperçu Markdown en temps réel.
- US4 : Bouton global « Copy to Clipboard » pour tous les exports.
- US5 : Inclusion de la stack technique dans les exports.
- US6 : Suggestions de nouvelles User Stories basées sur le projet.

## Démarrage rapide
```bash
npm install
npm run dev
```

## Docs
- PRODUCT_VISION.md
- USER_STORIES.md
- BACKLOG.md
- ARCHITECTURE.md
- ANTIGRAVITY_PLAN.md
- GEMINI_PROMPTS.md
