import { FACTORY_AGENTS } from './factory-agents';
import type { FactoryAgent } from './factory-types';

export function getFactoryAgent(slug: string): FactoryAgent | undefined {
  return FACTORY_AGENTS.find(a => a.slug === slug);
}

export function getFrontOfficeAgents(): FactoryAgent[] {
  return FACTORY_AGENTS.filter(a => a.category === 'front-office');
}

export function getBackOfficeAgents(): FactoryAgent[] {
  return FACTORY_AGENTS.filter(a => a.category === 'back-office');
}

export function getAllAgents(): FactoryAgent[] {
  return FACTORY_AGENTS;
}

export function pickRandom(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}
