import { UserStory } from './entities';

export function saveUserStory(us: Partial<UserStory>): void {
  if (!us.role || us.role.trim() === '' ||
      !us.action || us.action.trim() === '' ||
      !us.benefit || us.benefit.trim() === '') {
    throw new Error('Les segments Rôle, Action et Bénéfice sont obligatoires.');
  }
}
