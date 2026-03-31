import { ProjectContext } from '../domain/project-context';

export const markdownHeader = (title: string, ctx: ProjectContext) => `
TITRE : ${title.toUpperCase()}
PROJET : ${ctx.projectName || "Sans nom"}
DATE : ${new Date().toLocaleDateString('fr-FR')}

`;

export const markdownFooter = () => `

Généré par AgileInit Auto-Docs Factory (V2) — Propulsion par Antigravity.
`;
