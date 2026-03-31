import { AgileProject, UserStory } from '../domain/entities';

export const suggestUserStories = (project: AgileProject): Partial<UserStory>[] => {
  const suggestions: Partial<UserStory>[] = [];
  const desc = project.description.toLowerCase();

  // Basic rule engine for US suggestions
  project.personas.forEach(persona => {
    const role = persona.role.toLowerCase();

    // Admin suggestions
    if (role.includes('admin') || role.includes('responsable')) {
      suggestions.push({
        role: persona.role,
        action: 'gérer les accès utilisateurs',
        benefit: 'garantir la sécurité du système',
        personaId: persona.id
      });
      suggestions.push({
        role: persona.role,
        action: 'consulter les logs d\'activité',
        benefit: 'détecter les anomalies rapidement',
        personaId: persona.id
      });
    }

    // User / Client suggestions
    if (role.includes('client') || role.includes('utilisateur') || role.includes('user')) {
      suggestions.push({
        role: persona.role,
        action: 'modifier mon profil personnel',
        benefit: 'garder mes informations à jour',
        personaId: persona.id
      });
    }

    // Domain specific suggestions
    if (desc.includes('shop') || desc.includes('vente') || desc.includes('e-commerce')) {
      if (role.includes('client')) {
        suggestions.push({
          role: persona.role,
          action: 'rechercher un produit par catégorie',
          benefit: 'trouver plus vite ce dont j\'ai besoin',
          personaId: persona.id
        });
      }
    }

    if (desc.includes('agile') || desc.includes('outil') || desc.includes('init')) {
      suggestions.push({
        role: persona.role,
        action: 'exporter le backlog en PDF',
        benefit: 'partager le cadrage avec des personnes hors-ligne',
        personaId: persona.id
      });
    }
  });

  // Limit suggestions to avoid noise
  return suggestions.slice(0, 5);
};
