export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface UserStory {
  id: string;
  role: string;
  action: string;
  benefit: string;
  personaId: string;
  status: 'Draft' | 'Ready' | 'In Progress' | 'Done';
}

export interface AgileProject {
  id: string;
  name: string;
  description: string;
  personas: Persona[];
  userStories: UserStory[];
}
