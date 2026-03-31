# Fonctionnalités de l'Évolution — Auto-Docs

## F1 — Formulaire de contexte projet
Permettre à l'utilisateur de saisir:
- Nom du projet.
- Description / pitch.
- Cible utilisateur.
- Objectifs principaux.
- Contraintes techniques (stack souhaitée).

## F2 — Génération automatique de la documentation
À partir des données F1, générer:
- PRODUCT_VISION.md
- USER_STORIES.md
- BACKLOG.md
- ARCHITECTURE.md
- ANTIGRAVITY_PLAN.md
- GEMINI_PROMPTS.md
- README.md

## F3 — Aperçu & téléchargement
- Aperçu en temps réel de chaque fichier `.md`.
- Bouton "Télécharger zip" de tous les fichiers.
- Bouton "Copy to clipboard" par fichier ou global.

## F4 — Mode Antigravity helper
- Section "Pour Antigravity" qui affiche seulement:
  - ANTIGRAVITY_PLAN.md
  - GEMINI_PROMPTS.md
- Bouton "Copy prompt Phase 1/2/3…" pour coller directement
  dans Antigravity.

## F5 — Historique simple (v2 option)
- Garder en mémoire les 3 derniers projets générés
  (nom + date + lien de récupération).