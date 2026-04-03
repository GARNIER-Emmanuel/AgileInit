import { ProjectContext } from '../domain/project-context';
import { markdownHeader, markdownFooter } from './base-template';

export const readmeTemplate = (ctx: ProjectContext): string => {
  const isPython = ctx.technicalStack.back.toLowerCase().includes('python');
  const installCmd = isPython ? 'pip install -r requirements.txt' : 'npm install';
  const startCmd = isPython ? 'python app.py' : 'npm run dev';

  return `
${markdownHeader('README', ctx)}

PRESENTATION
${ctx.pitch || "Aucune description renseignée."}

OBJECTIFS
${(ctx.mainObjectives && ctx.mainObjectives.filter(o => o.trim()).length > 0)
    ? ctx.mainObjectives.map((obj: string) => `- ${obj}`).join('\n')
    : "Aucun objectif SMART défini."}

STACK TECHNIQUE
Frontend : ${ctx.technicalStack.front}
Backend : ${ctx.technicalStack.back}
Base de données : ${ctx.technicalStack.db}

DEMARRAGE RAPIDE
1. Clonez le répertoire.
2. ${installCmd}
3. ${startCmd}

${markdownFooter()}
`;
};
