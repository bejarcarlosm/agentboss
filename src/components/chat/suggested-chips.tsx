'use client';

import type { SuggestedQuestion } from '@/lib/factory-types';

interface SuggestedChipsProps {
  questions: SuggestedQuestion[];
  onSelect: (question: SuggestedQuestion) => void;
  agentColor: string;
}

export function SuggestedChips({ questions, onSelect, agentColor }: SuggestedChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3 ml-11">
      {questions.map((q, i) => (
        <button
          key={q.label}
          onClick={() => onSelect(q)}
          className="chip-enter px-3 py-1.5 text-sm rounded-full border transition-all hover:scale-105 cursor-pointer"
          style={{
            borderColor: `${agentColor}40`,
            color: agentColor,
            animationDelay: `${i * 100}ms`,
          }}
        >
          {q.label}
        </button>
      ))}
    </div>
  );
}
