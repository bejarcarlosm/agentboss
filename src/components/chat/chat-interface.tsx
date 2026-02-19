'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { FactoryAgent, ChatMessage as ChatMessageType, SuggestedQuestion, ConversationNode } from '@/lib/factory-types';
import { pickRandom } from '@/lib/factory-service';
import { createConversation, saveMessage } from '@/lib/conversation-service';
import { ChatHeader } from './chat-header';
import { ChatMessage } from './chat-message';
import { SuggestedChips } from './suggested-chips';
import { ChatInput } from './chat-input';
import { DiagnosticFormModal } from '@/components/landing/diagnostic-form-modal';

const MAX_INTERACTIONS = 7;
const WHATSAPP_URL = 'https://wa.me/56912345678?text=Hola%2C%20quiero%20contratar%20el%20servicio%20de%20AgentBoss';

interface ChatInterfaceProps {
  agent: FactoryAgent;
}

function TypingIndicator({ color }: { color: string }) {
  return (
    <div className="flex gap-3 message-in">
      <div className="w-8 h-8 rounded-full flex-shrink-0" />
      <div className="flex items-center gap-1 px-4 py-3 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full typing-bounce"
            style={{ background: color, animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function ClosureMessage({ agentColor, onRequestDiagnostic }: { agentColor: string; onRequestDiagnostic: () => void }) {
  return (
    <div className="mx-4 my-6 p-5 rounded-2xl border-2 bg-[var(--secondary)]" style={{ borderColor: `${agentColor}40` }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: agentColor }} />
        <span className="text-sm font-bold" style={{ color: agentColor }}>Prueba de concepto finalizada</span>
      </div>
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
        Esta es una prueba de concepto que muestra como funcionaria la consultoria con nuestros agentes IA.
        En un proyecto real, la conversacion continua hasta definir completamente tus requerimientos.
        Quieres contratar el servicio?
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={onRequestDiagnostic}
          className="btn text-sm px-4 py-2.5 bg-[#2dd4bf] text-[#0a0a0a] font-bold hover:bg-[#5eead4] transition-all"
        >
          Solicitar Diagnostico Completo
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary text-sm px-4 py-2.5 text-center"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
}

export function ChatInterface({ agent }: ChatInterfaceProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [currentNode, setCurrentNode] = useState<ConversationNode | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [showFormModal, setShowFormModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<string | null>(null);

  const isLimitReached = interactionCount >= MAX_INTERACTIONS;

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const addAgentMessage = useCallback((node: ConversationNode) => {
    setIsTyping(true);
    setShowChips(false);

    const delay = 400 + Math.random() * 400;

    setTimeout(() => {
      const content = pickRandom(node.agentMessages);
      const msg: ChatMessageType = {
        id: `msg-${Date.now()}`,
        role: 'agent',
        content,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, msg]);
      setCurrentNode(node);
      setIsTyping(false);

      if (conversationIdRef.current) {
        saveMessage(conversationIdRef.current, 'agent', content, node.id);
      }

      setTimeout(() => {
        setShowChips(true);
      }, 200);
    }, delay);
  }, []);

  useEffect(() => {
    async function init() {
      const convId = await createConversation(agent.slug);
      conversationIdRef.current = convId;

      const startNode = agent.conversationTree.nodes[agent.conversationTree.startNodeId];
      if (startNode) {
        addAgentMessage(startNode);
      }
    }
    init();
  }, [agent, addAgentMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showChips, scrollToBottom]);

  function handleChipSelect(question: SuggestedQuestion) {
    if (isLimitReached) return;

    if (question.type === 'navigate' && question.navigateTo) {
      router.push(question.navigateTo);
      return;
    }

    const userMsg: ChatMessageType = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: question.label,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setShowChips(false);
    setInteractionCount(prev => prev + 1);

    if (conversationIdRef.current) {
      saveMessage(conversationIdRef.current, 'user', question.label);
    }

    if (interactionCount + 1 >= MAX_INTERACTIONS) {
      return;
    }

    const nextNode = agent.conversationTree.nodes[question.nextNodeId];
    if (nextNode) {
      addAgentMessage(nextNode);
    }
  }

  function handleFreeText(text: string) {
    if (isLimitReached) return;

    const userMsg: ChatMessageType = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setShowChips(false);
    setInteractionCount(prev => prev + 1);

    if (conversationIdRef.current) {
      saveMessage(conversationIdRef.current, 'user', text);
    }

    if (interactionCount + 1 >= MAX_INTERACTIONS) {
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      const fallbackMsg: ChatMessageType = {
        id: `msg-${Date.now()}`,
        role: 'agent',
        content: `Gracias por compartir eso! Lo tengo anotado. Para continuar nuestra conversacion, te sugiero alguna de estas opciones:`,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, fallbackMsg]);
      setIsTyping(false);
      setTimeout(() => setShowChips(true), 200);
    }, 500 + Math.random() * 300);
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--background)]">
      <ChatHeader agent={agent} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={msg.id}>
            <ChatMessage
              message={msg}
              agentName={agent.name}
              agentAvatar={agent.avatar}
              agentColor={agent.color}
            />
            {/* Show chips after the last agent message if we're not typing and limit not reached */}
            {msg.role === 'agent' && i === messages.length - 1 && showChips && currentNode && !isLimitReached && (
              <SuggestedChips
                questions={currentNode.suggestedQuestions}
                onSelect={handleChipSelect}
                agentColor={agent.color}
              />
            )}
          </div>
        ))}

        {isTyping && <TypingIndicator color={agent.color} />}

        {isLimitReached && (
          <ClosureMessage
            agentColor={agent.color}
            onRequestDiagnostic={() => setShowFormModal(true)}
          />
        )}
      </div>

      <ChatInput
        onSend={handleFreeText}
        placeholder={isLimitReached
          ? 'Limite de prueba alcanzado'
          : `Escribe a ${agent.name}...`
        }
        agentColor={agent.color}
        disabled={isTyping || isLimitReached}
      />

      <DiagnosticFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
      />
    </div>
  );
}
