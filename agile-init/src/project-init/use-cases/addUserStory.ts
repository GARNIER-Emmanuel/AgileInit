import { UserStory } from '../domain/entities';
import { store } from '../../shared/store';

export const addUserStory = (_projectId: string, userStory: Omit<UserStory, 'id' | 'status'>): UserStory => {
  const newUS: UserStory = {
    id: Math.random().toString(36).substring(7),
    ...userStory,
    status: 'Draft'
  };
  store.addUserStory(newUS);
  return newUS;
};
