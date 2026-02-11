'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function FactoryNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          Agent<span className="text-[#2dd4bf]">Boss</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-[var(--muted)]">
          <a href="#services" className="hover:text-[var(--foreground)] transition-colors">Servicios</a>
          <a href="#process" className="hover:text-[var(--foreground)] transition-colors">Proceso</a>
          <a href="#team" className="hover:text-[var(--foreground)] transition-colors">Equipo</a>
          <Link href="/pipeline" className="hover:text-[var(--foreground)] transition-colors">Pipeline</Link>
        </div>

        <div className="flex items-center gap-4">
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
          <Link
            href="/chat/product-owner"
            className="btn text-sm px-4 py-2 bg-[#2dd4bf] text-[var(--text-on-accent)] font-bold hover:bg-[#5eead4] transition-all"
          >
            Discovery gratis
          </Link>
        </div>
      </div>
    </nav>
  );
}
