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

export async function updateConversationUser(
  conversationId: string,
  userName?: string,
  userEmail?: string
) {
  const updates: Record<string, string> = {};
  if (userName) updates.user_name = userName;
  if (userEmail) updates.user_email = userEmail;
  if (Object.keys(updates).length === 0) return;

  const { error } = await supabase
    .from('conversations')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', conversationId);

  if (error) {
    console.error('Error updating conversation user:', error);
  }
}

export async function createOrUpdateLead(
  agentSlug: string,
  conversationId: string,
  name?: string,
  email?: string,
  phone?: string
) {
  if (!email && !name) return null;

  // Check if lead with this email already exists
  if (email) {
    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('email', email)
      .limit(1)
      .single();

    if (existing) {
      // Update existing lead
      const updates: Record<string, string> = { updated_at: new Date().toISOString() };
      if (name) updates.name = name;
      if (phone) updates.phone = phone;

      await supabase.from('leads').update(updates).eq('id', existing.id);
      await supabase.from('conversations').update({ lead_id: existing.id }).eq('id', conversationId);
      return existing.id;
    }
  }

  // Create new lead
  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: name || null,
      email: email || null,
      phone: phone || null,
      agent_slug: agentSlug,
      source: 'voice_chat',
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating lead:', error);
    return null;
  }

  // Link lead to conversation
  await supabase.from('conversations').update({ lead_id: data.id }).eq('id', conversationId);
  return data.id;
}

// Extract name and email from conversation messages
const EMAIL_REGEX = /[\w.-]+@[\w.-]+\.\w{2,}/;
const NAME_PATTERNS = [
  /(?:me llamo|soy|mi nombre es)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑa-záéíóúñ]+)?)/i,
  /(?:my name is|i'm|i am)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i,
];

export function extractEmail(text: string): string | null {
  const match = text.match(EMAIL_REGEX);
  return match ? match[0].toLowerCase() : null;
}

export function extractName(text: string): string | null {
  for (const pattern of NAME_PATTERNS) {
    const match = text.match(pattern);
    if (match && match[1]) return match[1].trim();
  }
  return null;
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
