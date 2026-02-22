'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LanguageSwitcher } from '@/components/language-switcher';
import { OrbLogo } from '@/components/ui/orb-logo';
import { useDiagnosticModal } from './diagnostic-modal-provider';

export function FactoryNavbar() {
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const { openModal } = useDiagnosticModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = locale === 'es'
    ? { services: 'Servicios', process: 'Proceso', team: 'Equipo', pipeline: 'Pipeline' }
    : { services: 'Services', process: 'Process', team: 'Team', pipeline: 'Pipeline' }

  const ctaText = locale === 'es' ? 'Solicitar Diagnostico' : 'Request Discovery'

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 text-lg font-bold">
          <OrbLogo size={28} />
          <span>Agent<span className="text-[#2dd4bf]">Boss</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-[var(--muted)]">
          <a href="#services" className="hover:text-[var(--foreground)] transition-colors">{navItems.services}</a>
          <a href="#process" className="hover:text-[var(--foreground)] transition-colors">{navItems.process}</a>
          <a href="#team" className="hover:text-[var(--foreground)] transition-colors">{navItems.team}</a>
          <Link href={`/${locale}/pipeline`} className="hover:text-[var(--foreground)] transition-colors">{navItems.pipeline}</Link>
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-[var(--secondary)] rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-[#fbbf24]" />
              ) : (
                <Moon size={20} className="text-[#6366f1]" />
              )}
            </button>
          )}
          <LanguageSwitcher />
          <button
            onClick={openModal}
            className="btn text-sm px-4 py-2 bg-[#2dd4bf] text-[var(--text-on-accent)] font-bold hover:bg-[#5eead4] transition-all"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </nav>
  );
}
