'use client';

import Image from 'next/image';
import type { DossierAgent } from '@/lib/dossier-data';

interface Props {
  agent: DossierAgent;
  locale?: string;
}

export function DossierPlanetary({ agent, locale }: Props) {
  const mcpCount = agent.mcpTools.length;
  const areas = locale === 'en' && agent.relatedAreas_en ? agent.relatedAreas_en : agent.relatedAreas;
  const areaCount = areas.length;

  return (
    <div className="dossier-orbits relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] mx-auto">
      {/* Static orbit ring guides */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute w-[150px] h-[150px] md:w-[210px] md:h-[210px] rounded-full border border-dashed"
          style={{ borderColor: `${agent.color}15` }}
        />
        <div
          className="absolute w-[250px] h-[250px] md:w-[360px] md:h-[360px] rounded-full border border-dotted"
          style={{ borderColor: `${agent.color}10` }}
        />
      </div>

      {/* Inner orbit: MCP tools */}
      <div className="absolute inset-0 flex items-center justify-center">
        {agent.mcpTools.map((mcp, i) => {
          const delay = -(i * (24 / mcpCount));
          return (
            <div
              key={mcp.name}
              className="absolute dossier-orbit-inner"
              style={{
                animationDelay: `${delay}s`,
              }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: mcp.color,
                    boxShadow: `0 0 8px ${mcp.color}80`,
                  }}
                />
                <span
                  className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold whitespace-nowrap"
                  style={{
                    background: `${mcp.color}15`,
                    border: `1px solid ${mcp.color}30`,
                    color: mcp.color === '#FFFFFF' || mcp.color === '#000000' || mcp.color === '#262627'
                      ? '#d4d4d8'
                      : mcp.color,
                  }}
                >
                  {mcp.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outer orbit: Related areas */}
      <div className="absolute inset-0 flex items-center justify-center">
        {areas.map((area, i) => {
          const delay = -(i * (40 / areaCount));
          return (
            <div
              key={area.name}
              className="absolute dossier-orbit-outer"
              style={{
                animationDelay: `${delay}s`,
              }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: area.color,
                    boxShadow: `0 0 6px ${area.color}60`,
                  }}
                />
                <span
                  className="px-1.5 py-0.5 rounded-full text-[8px] font-semibold whitespace-nowrap"
                  style={{
                    background: `${area.color}10`,
                    border: `1px solid ${area.color}20`,
                    color: `${area.color}cc`,
                  }}
                >
                  {area.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center: Agent avatar */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full overflow-hidden border-2 shadow-lg"
          style={{
            borderColor: agent.color,
            boxShadow: `0 0 30px ${agent.color}30, 0 0 60px ${agent.color}10`,
          }}
        >
          <Image
            src={agent.avatar}
            alt={agent.codename}
            width={90}
            height={90}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span
            className="text-[9px] font-bold uppercase tracking-wider"
            style={{ color: agent.color }}
          >
            {agent.codename}
          </span>
        </div>
      </div>
    </div>
  );
}
