import { UserStory } from './entities';

export function transitionToReadyForDev(us: UserStory): void {
  if (!us.personaId || us.personaId.trim() === '') {
    throw new Error('Une US sans Persona ne peut pas passer en "Prêt pour Dev"');
  }
  us.status = 'Ready';
}
