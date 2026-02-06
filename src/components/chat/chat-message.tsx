'use client';

import Image from 'next/image';
import type { ChatMessage as ChatMessageType } from '@/lib/factory-types';

interface ChatMessageProps {
  message: ChatMessageType;
  agentName: string;
  agentAvatar: string;
  agentColor: string;
}

export function ChatMessage({ message, agentName, agentAvatar, agentColor }: ChatMessageProps) {
  const isAgent = message.role === 'agent';

  return (
    <div className={`flex gap-3 message-in ${isAgent ? '' : 'flex-row-reverse'}`}>
      {isAgent && (
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden border-2"
          style={{ borderColor: agentColor }}
        >
          <Image
            src={agentAvatar}
            alt={agentName}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
          isAgent
            ? 'bg-[#1a1a1a] text-[var(--foreground)] border border-[var(--border)]'
            : 'text-[#0a0a0a] font-medium'
        }`}
        style={!isAgent ? { background: agentColor } : undefined}
      >
        {message.content}
      </div>
    </div>
  );
}
