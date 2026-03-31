# User Stories — Évolution Auto-Docs AgileInit

## US7 — Saisie guidée du contexte projet
En tant qu'Utilisateur, je veux un formulaire simple pour saisir
le contexte de mon projet (vision, cible, objectifs, stack), afin
de ne pas avoir à connaître la structure des documents Agile.

### Critères d'acceptation
- Le formulaire comporte des champs pour: nom, pitch, cible, objectifs,
  principaux modules, stack (front/back/DB).
- Tous les champs obligatoires sont marqués visuellement.
- Si un champ obligatoire est vide, un message d'erreur clair apparaît.

---

## US8 — Génération automatique des fichiers Markdown
En tant qu'Utilisateur, je veux que l'application génère automatiquement
PRODUCT_VISION.md, USER_STORIES.md, BACKLOG.md, ARCHITECTURE.md,
ANTIGRAVITY_PLAN.md, GEMINI_PROMPTS.md et README.md à partir des
informations que j'ai saisies.

### Critères d'acceptation
- Après soumission du formulaire, les 7 fichiers `.md` sont générés.
- Chaque fichier est visible dans un onglet ou une liste.
- Je peux télécharger chacun de ces fichiers individuellement.

---

## US9 — Aperçu live et copy/paste
En tant qu'Utilisateur, je veux voir un aperçu live des fichiers
Markdown générés, afin de vérifier rapidement le contenu avant de
télécharger ou copier.

### Critères d'acceptation
- Cliquer sur un fichier dans la liste affiche un aperçu Markdown.
- Un bouton "Copy" copie le contenu de ce fichier.
- Un bouton "Copy all" copie tous les fichiers concaténés.

---

## US10 — Mode Antigravity
En tant que Dev, je veux une vue dédiée "Antigravity" qui affiche
uniquement l'ANTIGRAVITY_PLAN.md et les GEMINI_PROMPTS.md, pour
pouvoir les copier directement dans Antigravity.

### Critères d'acceptation
- La vue Antigravity montre un onglet "Plan" et un onglet "Prompts".
- Un bouton par phase de prompt (Phase 1 à 6) copie uniquement
  le texte du prompt correspondant.
- Un texte d'aide rappelle comment coller ces prompts dans Antigravity.

---

## US11 — Export ZIP
En tant qu'Utilisateur, je veux pouvoir télécharger un zip contenant
tous les fichiers `.md` générés, afin de les déposer facilement dans
un repo Git.

### Critères d'acceptation
- Cliquer sur "Télécharger tout" déclenche le téléchargement d'un zip.
- Le zip contient les 7 fichiers `.md` à la racine.