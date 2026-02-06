"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Agent } from "@/lib/types"

function SoundWave({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="flex items-end gap-[2px] h-3">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-[2px] bg-[#c8e64c] rounded-full sound-wave"
          style={{
            animationDelay: `${i * 0.15}s`,
            height: "4px",
          }}
        />
      ))}
    </div>
  )
}

interface AgentCardProps {
  agent: Agent
  onToggleStatus?: (id: string) => void
  onDelete?: (id: string) => void
}

export function AgentCard({ agent, onToggleStatus, onDelete }: AgentCardProps) {
  const [hovered, setHovered] = useState(false)
  const isActive = agent.status === "active"

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden border border-[#2a2f14] bg-[#1a1f0a] agent-card-glow transition-all duration-300 min-w-[260px] max-w-[290px] snap-start flex-shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover action buttons (top-right) */}
      <div
        className={`absolute top-3 right-3 z-20 flex gap-1 transition-opacity duration-200 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            onToggleStatus?.(agent.id)
          }}
          className="w-7 h-7 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-xs hover:bg-black/80 transition-colors"
          title={isActive ? "Pausar" : "Activar"}
        >
          {isActive ? "⏸" : "▶️"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            onDelete?.(agent.id)
          }}
          className="w-7 h-7 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-xs hover:bg-red-600/70 transition-colors"
          title="Eliminar"
        >
          🗑
        </button>
      </div>

      {/* Top section: Name + Status */}
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-[#c8e64c] leading-tight">
            {agent.name}
          </h3>
          {isActive && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <SoundWave active />
            </div>
          )}
        </div>
        <p className="text-xs text-[#71717a]">{agent.role}</p>
      </div>

      {/* Avatar centered */}
      <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden">
        {agent.avatar ? (
          <Image
            src={agent.avatar}
            alt={agent.name}
            fill
            className="object-cover"
            sizes="290px"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#252b12] flex items-center justify-center text-3xl">
            🤖
          </div>
        )}
        {/* Subtle gradient overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#1a1f0a] to-transparent" />
      </div>

      {/* Capabilities checklist */}
      <div className="px-5 py-3 space-y-1.5 flex-1">
        {(agent.capabilities || []).slice(0, 4).map((cap, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-[#e5e5e5]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <circle cx="8" cy="8" r="8" fill="#22c55e" />
              <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="truncate">{cap}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="px-5 pb-5 pt-1 space-y-2">
        <Link
          href={`/agents/${agent.id}?tab=test`}
          className="block w-full text-center text-sm font-bold py-2.5 rounded-lg transition-all bg-[#c8e64c] text-[#0a0a0a] hover:bg-[#d4f058] hover:shadow-lg hover:shadow-[#c8e64c]/20"
        >
          Hablar
        </Link>
        <Link
          href={`/agents/${agent.id}`}
          className="block text-center text-xs text-[#71717a] hover:text-[#c8e64c] transition-colors"
        >
          Configurar
        </Link>
      </div>
    </div>
  )
}
