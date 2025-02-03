import { ReactNode } from 'react';

export interface LearningStep {
  title: string;
  content: string | ReactNode;
  interactive?: boolean;
  assessment?: {
    type: 'quiz' | 'practical' | 'code';
    questions?: Array<{
      question: string;
      options?: string[];
      answer: string | string[];
    }>;
    code?: {
      initial: string;
      solution: string;
      tests?: string[];
    };
  };
}

export interface ModuleConfig {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  steps: LearningStep[];
  aiComponents?: {
    type: string;
    config: Record<string, any>;
    apiEndpoint?: string;
  }[];
  ui?: {
    theme?: 'light' | 'dark' | 'custom';
    customStyles?: Record<string, string>;
    layout?: 'default' | 'wide' | 'split';
  };
}

export interface TemplateConfig {
  module: ModuleConfig;
  features: {
    enableAssessments: boolean;
    enableInteractiveExamples: boolean;
    enableAIIntegration: boolean;
  };
  api: {
    endpoints: Record<string, string>;
    headers?: Record<string, string>;
  };
}

export const createModuleConfig = (config: Partial<ModuleConfig>): ModuleConfig => {
  return {
    id: '',
    title: '',
    description: '',
    difficulty: 'beginner',
    steps: [],
    ...config,
  };
};

export const createTemplateConfig = (config: Partial<TemplateConfig>): TemplateConfig => {
  return {
    module: createModuleConfig({}),
    features: {
      enableAssessments: true,
      enableInteractiveExamples: true,
      enableAIIntegration: true,
    },
    api: {
      endpoints: {},
    },
    ...config,
  };
}; 