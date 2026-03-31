# Plan Antigravity — Phases de génération

Ce document décrit comment utiliser Antigravity + Gemini 3 Pro pour
générer et faire évoluer le projet par étapes [web:59][web:53].

## Phase 1 — Initialisation du repo
Objectif : créer un monorepo Node/React avec la structure Screaming.

Étapes cibles Antigravity :
- Créer le projet Node + React (Vite).
- Générer les dossiers et fichiers de base décrits dans ARCHITECTURE.md.
- Ajouter README.md, PRODUCT_VISION.md, USER_STORIES.md, BACKLOG.md.

## Phase 2 — Modèle domaine & use cases
Objectif : implémenter les entités (Project, UserStory, Persona) et
les premiers use-cases (createProject, addUserStory).

## Phase 3 — UI de base (sans Stitch)
Objectif : simple formulaire React pour saisir projet, personas, US,
affichage brut en liste.

## Phase 4 — Intégration Stitch MCP
Objectif : connecter Antigravity au projet Stitch, remplacer la UI
de base par la UI générée.

## Phase 5 — Génération de docs Markdown
Objectif : implémenter la génération des fichiers BESOINS.md,
USER_STORIES.md, BACKLOG.md, STACK_TECH.md.

## Phase 6 — Finitions & DX
Objectif : ajout du bouton Copy to Clipboard global, gestion erreurs,
petit polish sur UX.