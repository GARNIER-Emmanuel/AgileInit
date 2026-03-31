import { ProjectContext } from '../domain/project-context';

export const markdownHeader = (title: string, ctx: ProjectContext) => `
# ${title} — ${ctx.projectName}

*Généré par AgileInit Auto-Docs Factory*
*Cadrage stratégique au ${new Date().toLocaleDateString()}*

---
`;

export const markdownFooter = () => `
---
*Fin du document — Logiciel AgileInit Strategic Engine (V2).*
`;
