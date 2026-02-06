'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  agentColor: string;
  disabled?: boolean;
}

export function ChatInput({ onSend, placeholder = 'Escribe tu mensaje...', agentColor, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--background)]">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-[var(--secondary)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-opacity-50 transition-colors"
          style={{ ['--tw-ring-color' as string]: agentColor }}
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || disabled}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
          style={{ background: text.trim() ? agentColor : 'var(--secondary)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={text.trim() ? '#0a0a0a' : 'var(--muted)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
