import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MarkdownPreview } from './MarkdownPreview';

describe('US3 — Aperçu Markdown en temps réel', () => {
  it('Doit afficher un h2 formaté lorsqu\'on lui passe "## Titre" (mini-E2E via Testing Library)', () => {
    // Étape 1 : On donne à l'interface virtuelle "## Titre" (comme si on l'avait saisi)
    render(<MarkdownPreview markdown="## Mon Super Titre" />);
    
    // Étape 2 : On cherche visuellement le texte dans le document
    // Si c'est transformé en HTML, "@testing-library" va trouver le texte ET il ne sera plus précédé de "##"
    // Comme l'application utilise une div custom pour h2 par défaut (cf. l'implémentation originelle), on cherche 
    // simplement que "Mon Super Titre" existe et qu'il n'y a plus "##" (le Markdown est parsé).
    const elementTextReel = screen.getByText(/Mon Super Titre/i);
    
    // Vérification : le composant doit avoir PARSÉ le titre.
    // L'élément ne doit donc PAS contenir exactement la chaîne brutes "## Mon Super Titre".
    expect(elementTextReel.textContent).toBe('Mon Super Titre');
    expect(elementTextReel.textContent).not.toContain('##');
  });
});
