# Architecture — Évolution Auto-Docs

## Principe
Réutiliser la stack existante (Node.js + React, Screaming Architecture)
et ajouter un module responsable de la génération de documentation
à partir d'un "ProjectContext" [web:6][web:68].

## Nouveau module

```txt
src/
├── doc-generator/                 # NOUVEAU
│   ├── domain/
│   │   └── project-context.ts     # type ProjectContext
│   ├── templates/                 # templates *.hbs ou fonctions
│   │   ├── product-vision.ts
│   │   ├── user-stories.ts
│   │   ├── backlog.ts
│   │   ├── architecture.ts
│   │   ├── antigravity-plan.ts
│   │   ├── gemini-prompts.ts
│   │   └── readme.ts
│   ├── use-cases/
│   │   └── generate-docs.usecase.ts
│   └── infrastructure/
│       └── http-docs.controller.ts
```

## Flow
1. UI (React) collecte le `ProjectContext`.
2. Front appelle `POST /api/docs/generate` avec ce contexte.
3. Le use-case `generate-docs` génère 7 strings Markdown.
4. Le backend renvoie ces contenus, éventuellement un zip.
5. Le front:
   - affiche un onglet par document,
   - permet la copie et le téléchargement.

## Intégration Antigravity
- Antigravity reste l'outil qui consomme ANTIGRAVITY_PLAN.md &
  GEMINI_PROMPTS.md.
- L'évolution se concentre sur la génération de ces fichiers, pas sur
  l'exécution automatique d'Antigravity.