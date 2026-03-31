# Prompts Antigravity — Évolution Auto-Docs

## Prompt A — Ajouter le module doc-generator

Tu es un agent Antigravity/Gemini 3 Pro dans un projet existant
`agile-init`.

Objectif:
Ajouter un nouveau module `doc-generator` qui prendra un `ProjectContext`
et produira 7 fichiers Markdown en mémoire:

- PRODUCT_VISION.md
- USER_STORIES.md
- BACKLOG.md
- ARCHITECTURE.md
- ANTIGRAVITY_PLAN.md
- GEMINI_PROMPTS.md
- README.md

Actions attendues:
1. Crée la structure de dossiers décrite dans EVOLUTION_ARCHITECTURE.md.
2. Implémente un type `ProjectContext` avec les champs de base:
   - projectName, pitch, targetUsers, mainObjectives[],
     technicalStack (front, back, db), constraints?.
3. Implémente un use-case `generateDocs(projectContext)` qui
   retourne un objet:
   ```ts
   {
     productVision: string;
     userStories: string;
     backlog: string;
     architecture: string;
     antigravityPlan: string;
     geminiPrompts: string;
     readme: string;
   }
   ```
4. Pour l’instant, utilise des templates simples (string templates)
   basés sur les documents existants du repo.

Ne modifie pas la UI pour le moment, concentre-toi sur le backend.

---

## Prompt B — Exposer l’API de génération

Dans le projet `agile-init` mis à jour:

Objectif:
Exposer un endpoint REST permettant à la UI d’appeler la génération
des docs.

Actions:
1. Ajoute un contrôleur HTTP dans `doc-generator/infrastructure`:
   - `POST /api/docs/generate` reçoit un `ProjectContext` en JSON.
   - Appelle `generateDocs`.
   - Retourne un JSON avec les 7 contenus Markdown.
2. Ajoute un endpoint `GET /api/docs/sample` qui retourne un exemple
   de `ProjectContext` pré-rempli.

Assure-toi d’ajouter les tests de base pour ces endpoints.

---

## Prompt C — UI pour la saisie du contexte et l’aperçu

Dans le frontend React du projet `agile-init`:

Objectif:
Ajouter une page "Auto-Docs" avec:
- Un formulaire pour saisir `ProjectContext`.
- Des onglets d’aperçu pour les 7 fichiers générés.

Actions:
1. Crée une page `/auto-docs` avec:
   - Un formulaire (nom, pitch, cible, objectifs, stack).
   - Un bouton "Générer la doc".
2. Après clic, appelle `POST /api/docs/generate`.
3. Affiche les 7 fichiers dans un composant avec onglets:
   - Chaque onglet montre le contenu en Markdown (preview).
   - Ajoute un bouton "Copy" dans chaque onglet.
   - Ajoute un bouton "Copy all".

---

## Prompt D — Vue Antigravity

Toujours dans le frontend React:

Objectif:
Créer une vue "Antigravity" pour faciliter l’usage de Gemini/Antigravity.

Actions:
1. Sur la page `/auto-docs`, ajoute un sous-onglet "Antigravity".
2. Ce sous-onglet affiche:
   - Le contenu de `antigravityPlan`.
   - Le contenu de `geminiPrompts`.
3. Pour chaque phase de prompt (Phase 1..N), ajoute un bouton "Copy
   prompt Phase X" qui copie uniquement le texte de ce prompt.

Optionnel:
Ajoute une section d’aide rappelant comment Antigravity fonctionne,
inspirée des bonnes pratiques vues dans la documentation officielle
[web:66][web:75].

---

## Prompt E — Revue & refactor

Objectif:
Nettoyer le code généré pour cette évolution.

Actions:
1. Passe en revue `doc-generator` (domain, templates, use-cases).
2. Factorise les templates si dupliqués.
3. Ajoute/complète la documentation dans EVOLUTION_VISION.md,
   EVOLUTION_FEATURES.md, EVOLUTION_ARCHITECTURE.md si nécessaire.