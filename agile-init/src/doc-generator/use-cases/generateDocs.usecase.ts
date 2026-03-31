import { ProjectContext } from '../domain/project-context';
import { productVisionTemplate } from '../templates/product-vision';
import { userStoriesTemplate } from '../templates/user-stories';
import { backlogTemplate } from '../templates/backlog';
import { architectureTemplate } from '../templates/architecture';
import { antigravityPlanTemplate } from '../templates/antigravity-plan';
import { geminiPromptsTemplate } from '../templates/gemini-prompts';
import { readmeTemplate } from '../templates/readme';

export const generateDocs = (ctx: ProjectContext) => {
  return {
    productVision: productVisionTemplate(ctx),
    userStories: userStoriesTemplate(ctx),
    backlog: backlogTemplate(ctx),
    architecture: architectureTemplate(ctx),
    antigravityPlan: antigravityPlanTemplate(ctx),
    geminiPrompts: geminiPromptsTemplate(ctx),
    readme: readmeTemplate(ctx),
  };
};
