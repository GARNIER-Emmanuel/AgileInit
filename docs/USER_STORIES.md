# User Stories — AgileInit

## US1 — Liaison US ↔ Persona
En tant que PO, je veux lier chaque User Story à un Persona via un
menu déroulant, afin de garder une trace claire de pour quel utilisateur
je conçois la fonctionnalité.

### Règles
- 1 US = 1 Persona obligatoire.
- Personas définis dans un référentiel (pas de texte libre).

### Critères d’acceptation
- Une US sans Persona ne peut pas passer en "Prêt pour Dev".
- Le Persona est visible sur la carte US (badge/label).

---

## US2 — Placeholders structurés
En tant que PO, je veux des placeholders structurés
« En tant que [Rôle], je veux [Action] afin de [Bénéfice] »
pour rédiger des US claires.

### Règles
- Modèle de phrase pré-rempli.
- 3 segments obligatoires : Rôle, Action, Bénéfice.

### Critères d’acceptation
- Si un segment est vide, l’appli bloque la sauvegarde et affiche
  un message d’erreur.

---

## US3 — Aperçu Markdown en temps réel
En tant que Stakeholder, je veux voir un aperçu Markdown en temps réel
pour valider rapidement le cadrage.

### Règles
- Latence <300 ms entre saisie et rendu.
- Support : titres, listes, gras, italique, code inline.

### Critères d’acceptation
- Saisie `## Titre` → affichage d’un titre formaté dans l’aperçu.
- Saisie `- item` → affichage d’une bullet list.

---

## US4 — Copy to Clipboard global
En tant qu’Utilisateur, je veux copier tout le markdown (besoins,
backlog, stack) en un clic pour le coller ailleurs.

### Critères d’acceptation
- Après clic, un toast confirme la copie.
- Le contenu collé correspond exactement aux fichiers exportés.

---

## US5 — Stack technique dans les exports
En tant que Dev, je veux que la stack technique soit incluse dans les
exports Markdown pour contextualiser facilement le projet.

### Critères d’acceptation
- La section "Stack Technique" apparaît avec les techno configurées.
- Si aucune techno n’est définie, la section n’apparaît pas.

---

## US6 — Suggestions d’US basées sur le projet
En tant que PO, je veux obtenir des suggestions d’US à partir du
contexte projet, pour enrichir le backlog.

### Critères d’acceptation
- Les suggestions apparaissent dans une section dédiée.
- Je peux accepter/rejeter chaque suggestion individuellement.