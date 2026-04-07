export type PageId = 'home' | 'customer' | 'chat' | 'skills' | 'extract' | 'visit-ai' | 'product-pool';

export interface Insight {
  id: string;
  type: 'urgent' | 'opportunity';
  title: string;
  description: string;
  meta: string;
  priorityLabel: string;
  icon: string;
}

export interface Skill {
  id: string;
  type: string;
  title: string;
  preview: string;
  tags: string[];
  description?: string;
  scenario?: string;
  trigger?: {
    signal?: string;
    customer_type?: string;
    stage?: string;
  };
  inputs?: string[];
  workflow?: {
    title: string;
    steps: {
      name: string;
      action: string;
      tools: string[];
    }[];
  };
  tips?: string[];
  effect?: string;
  isExecutable?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  actions?: string[];
}
