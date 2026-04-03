# Pratiques de développement, Architecture et Conventions

Ce fichier répertorie les standards, conventions de nommage et pratiques d'architecture appliqués dans le projet **AgileInit**. Les IA (comme moi-même) ou les humains qui interviennent sur ce projet doivent s'y conformer.

## 1. Méthodologie et Qualité de code
- **TDD (Test-Driven Development) privilégié** :
  - **Red** : Écrire un test automatisé vérifiant un critère d'acceptation métier qui va inévitablement échouer.
  - **Green** : Implémenter **exclusivement le strict nécessaire** pour passer le test existant (approche YAGNI - *You Aren't Gonna Need It*).
  - **Refactor** : Remanier le code une fois fonctionnel et couvert, sans changer son comportement.
- **Micro-commits** : 
  - Un commit pour le test échouant (ex: `test: failing test for USX`).
  - Un commit pour l'implémentation qui fait passer le test (ex: `feat: implement logic to pass USX`).

## 2. Architecture & Modularité
- **Clean Architecture / Domain-Driven Design (DDD)** :
  - Les domaines (par ex: `project-init`, `doc-generator`) sont encapsulés dans leurs propres dossiers sous `src/`.
  - **Domaine (`src/<module>/domain/`)** : Contient les entités fondamentales (`entities.ts`), les règles métiers et interfaces. Les règles métiers pures n'ont aucune dépendance avec l'extérieur.
  - **Cas d'usage (`src/<module>/use-cases/`)** : Contient la logique d'orchestration (les *actions* réalisables dans l'applicatif).

## 3. Conventions de nommage
- **Fichiers TypeScript** : Noms en `kebab-case` (`user-story.service.ts`, `entities.ts`).
- **Composants React (TSX)** : Noms en `PascalCase` (`App.tsx`).
- **Fonctions / Méthodes / Variables** : Noms en `camelCase` (ex: `transitionToReadyForDev`).
- **Interfaces / Classes** : Noms en `PascalCase` (ex: `UserStory`, `AgileProject`).
- **Tests unitaires** : L'extension est `.spec.ts` ou `.test.ts`. Placés soit aux côtés des fichiers testés soit sous un dossier `__tests__/`.

## 4. Tests automatisés
- **Outil utilisé** : `vitest`.
- **Organisation** : Utilisation des blocs idiomatiques `describe` et `it`. 
- **Nommage des tests** : Les descriptions de tests doivent généralement reprendre le libellé du scénario d'utilisation (ex : `it('Une US sans Persona ne peut pas passer en "Prêt pour Dev"', ...)`).
- **Assertion Framework** : Utiliser l'API `expect` fournie par `vitest`.

## 5. Gestion des versions de code (Git)
- Suivi du format **Conventional Commits** :
  - `feat:` pour une nouvelle fonctionnalité.
  - `fix:` pour une correction de bogue.
  - `test:` pour l'ajout ou la modification de tests.
  - `docs:`, `chore:`, `refactor:`, etc.
