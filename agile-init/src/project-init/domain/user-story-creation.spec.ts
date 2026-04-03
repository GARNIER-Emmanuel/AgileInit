import { describe, it, expect } from 'vitest';
import { saveUserStory } from './user-story-creation.service';

describe('US2 — Placeholders structurés', () => {
  it('Doit bloquer la sauvegarde et afficher une erreur si un segment (Rôle, Action, Bénéfice) est vide', () => {
    const invalidUs = {
      role: '', // Vide
      action: 'un truc',
      benefit: 'une raison'
    };
    
    expect(() => saveUserStory(invalidUs)).toThrowError('Les segments Rôle, Action et Bénéfice sont obligatoires.');
  });
});
