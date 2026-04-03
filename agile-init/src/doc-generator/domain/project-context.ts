export interface ProjectContext {
  projectName: string;
  pitch: string;
  targetUsers: string;
  mainObjectives: string[];
  technicalStack: {
    front: string;
    back: string;
    db: string;
    architecturePatterns: string[];
    customArchitecture?: string;
  };
  constraints?: string[];
  userStories?: any[];
  personas?: any[];
}
