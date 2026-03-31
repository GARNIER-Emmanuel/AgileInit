export interface ProjectContext {
  projectName: string;
  pitch: string;
  targetUsers: string;
  mainObjectives: string[];
  technicalStack: {
    front: string;
    back: string;
    db: string;
  };
  constraints?: string[];
}
