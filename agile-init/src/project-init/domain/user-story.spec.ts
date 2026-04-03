import { describe, it, expect } from 'vitest';
import { transitionToReadyForDev } from './user-story.service';
import { UserStory } from './entities';

describe('US1 — Liaison US ↔ Persona', () => {
  it('Une US sans Persona ne peut pas passer en "Prêt pour Dev"', () => {
    const usInfo: UserStory = {
      id: '1',
      role: 'PO',
      action: 'lier US à Persona',
      benefit: 'garder une trace',
      personaId: '', // Pas de persona
      priority: 'Must',
      status: 'Draft'
    };
    
    expect(() => transitionToReadyForDev(usInfo)).toThrowError('Une US sans Persona ne peut pas passer en "Prêt pour Dev"');
  });
});
