export interface CaseStudy {
  outcome: string;
  context: string;
  contributions: string[];
  challenges: string[];
  improvements: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  category: 'Backend' | 'Automation' | 'Fullstack';
  caseStudy: CaseStudy;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'Core' | 'Testing' | 'Database' | 'Tools';
}

export enum AIToolType {
  GHERKIN_GEN = 'GHERKIN_GEN',
  CODE_REVIEW = 'CODE_REVIEW',
  ARCH_COPILOT = 'ARCH_COPILOT',
  CODE_EXPLAINER = 'CODE_EXPLAINER'
}

export interface StorytellerResult {
  portfolioDescription: string;
  starFormat: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  resumeBullets: string[];
  linkedinPost: string;
}

export interface QualityMeterResult {
  scores: {
    clarity: number;
    impact: number;
    specificity: number;
    credibility: number;
  };
  average: number;
  feedback: string[];
}