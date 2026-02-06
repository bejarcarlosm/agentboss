// ============================================
// TIPOS - AI Software Factory
// ============================================

export interface FactoryAgent {
  id: string;
  slug: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  color: string;
  category: 'front-office' | 'back-office';
  status: 'active' | 'coming-soon';
  personality: string;
  conversationTree: ConversationTree;
}

export interface ConversationTree {
  startNodeId: string;
  nodes: Record<string, ConversationNode>;
}

export interface ConversationNode {
  id: string;
  agentMessages: string[];
  suggestedQuestions: SuggestedQuestion[];
}

export interface SuggestedQuestion {
  label: string;
  nextNodeId: string;
  type?: 'navigate' | 'node';
  navigateTo?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: number;
}

export interface ChatState {
  agentSlug: string;
  currentNodeId: string;
  messages: ChatMessage[];
  isTyping: boolean;
}
