import type { CaseStudy } from "../portfolio";
import { tetraEngine } from "./tetra-engine";
import { futureguide } from "./futureguide";
import { rumiTalk } from "./rumi-talk";

const studies: Record<string, CaseStudy> = {
  [tetraEngine.slug]: tetraEngine,
  [futureguide.slug]: futureguide,
  [rumiTalk.slug]: rumiTalk,
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return studies[slug];
}

export const caseStudySlugs = Object.keys(studies);

export const caseStudies = [tetraEngine, futureguide, rumiTalk];
