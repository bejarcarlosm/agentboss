'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { FactoryAgent, ChatMessage as ChatMessageType, SuggestedQuestion, ConversationNode } from '@/lib/factory-types';
import { pickRandom } from '@/lib/factory-service';
import { ChatHeader } from './chat-header';
import { ChatMessage } from './chat-message';
import { SuggestedChips } from './suggested-chips';
import { ChatInput } from './chat-input';

interface ChatInterfaceProps {
  agent: FactoryAgent;
}

function TypingIndicator({ color }: { color: string }) {
  return (
    <div className="flex gap-3 message-in">
      <div className="w-8 h-8 rounded-full flex-shrink-0" />
      <div className="flex items-center gap-1 px-4 py-3 bg-[#1a1a1a] border border-[var(--border)] rounded-2xl">
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

export function ChatInterface({ agent }: ChatInterfaceProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [currentNode, setCurrentNode] = useState<ConversationNode | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

      setTimeout(() => {
        setShowChips(true);
      }, 200);
    }, delay);
  }, []);

  useEffect(() => {
    const startNode = agent.conversationTree.nodes[agent.conversationTree.startNodeId];
    if (startNode) {
      addAgentMessage(startNode);
    }
  }, [agent, addAgentMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showChips, scrollToBottom]);

  function handleChipSelect(question: SuggestedQuestion) {
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

    const nextNode = agent.conversationTree.nodes[question.nextNodeId];
    if (nextNode) {
      addAgentMessage(nextNode);
    }
  }

  function handleFreeText(text: string) {
    const userMsg: ChatMessageType = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setShowChips(false);

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
            {/* Show chips after the last agent message if we're not typing */}
            {msg.role === 'agent' && i === messages.length - 1 && showChips && currentNode && (
              <SuggestedChips
                questions={currentNode.suggestedQuestions}
                onSelect={handleChipSelect}
                agentColor={agent.color}
              />
            )}
          </div>
        ))}

        {isTyping && <TypingIndicator color={agent.color} />}
      </div>

      <ChatInput
        onSend={handleFreeText}
        placeholder={`Escribe a ${agent.name}...`}
        agentColor={agent.color}
        disabled={isTyping}
      />
    </div>
  );
}
