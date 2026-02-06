import { supabase } from './supabase';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sessionId = localStorage.getItem('agentboss_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('agentboss_session_id', sessionId);
  }
  return sessionId;
}

export async function createConversation(agentSlug: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('conversations')
    .insert({ agent_slug: agentSlug, session_id: getSessionId() })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating conversation:', error);
    return null;
  }
  return data.id;
}

export async function saveMessage(
  conversationId: string,
  role: 'user' | 'agent',
  content: string,
  nodeId?: string
) {
  const { error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      role,
      content,
      node_id: nodeId ?? null,
    });

  if (error) {
    console.error('Error saving message:', error);
  }
}

export async function getConversationHistory(agentSlug: string) {
  const sessionId = getSessionId();
  const { data, error } = await supabase
    .from('conversations')
    .select('id, created_at, messages(id, role, content, node_id, created_at)')
    .eq('agent_slug', agentSlug)
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;
  return data;
}
