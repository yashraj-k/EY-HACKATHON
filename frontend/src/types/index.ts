export interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  icon: string;
  status: 'active' | 'inactive' | 'processing';
}

export interface AnalysisResult {
  id: string;
  drugName: string;
  phase: 'discovery' | 'validation' | 'business';
  status: 'running' | 'completed' | 'failed';
  progress: number;
  results: any;
  createdAt: string;
  updatedAt: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  category: 'analysis' | 'prediction' | 'optimization';
  capabilities: string[];
  status: 'available' | 'beta' | 'coming-soon';
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'completed' | 'archived';
  publishedAt: string;
  authors: string[];
}

export interface ScienceBreakthrough {
  id: string;
  title: string;
  description: string;
  domain: 'biology' | 'chemistry' | 'pharmacology' | 'clinical';
  impact: 'high' | 'medium' | 'low';
  publishedAt: string;
}
