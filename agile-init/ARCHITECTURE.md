# Architecture — AgileInit

## Style global
- Architecture Screaming : les dossiers portent le nom des use cases
  métier (project-init, generate-docs, ui-agile-form).
- Architecture modulaire : modules indépendants par domaine,
  évitant le "big monolith" [web:6][web:8].

## Vue d’ensemble

```txt
src/
├── project-init/           # Initialisation & cadrage de projet
│   ├── domain/             # Entités (Persona, UserStory, Project)
│   ├── use-cases/          # Logique (createProject, generateBacklog)
│   └── infrastructure/     # REST, stockage fichiers, adaptateurs
├── ui-agile-form/          # Interface React pour saisir les infos
│   ├── components/
│   └── hooks/
├── generate-docs/          # Génération de fichiers Markdown
│   ├── templates/          # Handlebars ou équivalent
│   └── services/
└── shared/                 # Libs transverses (validation, types)
```

## Frontend
- React + Vite.
- UI générée / enrichie via Stitch + Antigravity (Design-to-Code).
- Redux/Zustand ou simple Context pour l’état global (v1 simple).

## Backend
- Node.js + Express (ou Fastify).
- Endpoints REST :
  - `POST /api/project` : crée/maj le contexte projet.
  - `POST /api/export` : génère les fichiers .md.
- Stockage local fichiers pour v1.

## Intégration Stitch MCP
- Stitch génère un design (layout, tokens).
- Antigravity consomme le projet Stitch via MCP et scaffold le code React
  correspondant (composants, styles) [web:48][web:56][web:51].
