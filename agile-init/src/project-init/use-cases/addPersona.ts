import { Persona } from '../domain/entities';
import { store } from '../../shared/store';

export const addPersona = (_projectId: string, persona: Omit<Persona, 'id'>): Persona => {
  const newPersona: Persona = {
    id: Math.random().toString(36).substring(7),
    ...persona
  };
  store.addPersona(newPersona);
  return newPersona;
};
