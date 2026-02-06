'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DynamicOrb } from '@/components/ui/dynamic-orb';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    const user = {
      id: `user-${Date.now()}`,
      email: email,
      name: email.split('@')[0],
    };

    localStorage.setItem('agentboss-user', JSON.stringify(user));

    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  const handleDemoLogin = () => {
    const demoUser = {
      id: 'demo-user-1',
      email: 'demo@agentboss.cl',
      name: 'Usuario Demo',
    };
    localStorage.setItem('agentboss-user', JSON.stringify(demoUser));
    router.push('/');
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-[120px] h-[120px] mx-auto mb-6 animate-float">
            <DynamicOrb agentState={null} colors={["#c8e64c", "#4a5520"]} />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Agent<span className="text-[var(--primary)]">Boss</span>
          </h1>
          <p className="text-[var(--muted)]">Fabrica de Agentes IA</p>
        </div>

        {/* Login Card */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Iniciar Sesion</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-[var(--error)]/10 text-[var(--error)] text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="tu@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <label className="label">Contrasena</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Continuar'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[var(--secondary)] text-[var(--muted)]">o</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            className="btn btn-secondary w-full"
          >
            Probar con cuenta demo
          </button>

          <p className="text-center text-sm text-[var(--muted)] mt-6">
            No tienes cuenta?{' '}
            <Link href="/register" className="text-[var(--primary)] hover:underline">
              Registrate
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[var(--muted)] mt-8">
          &copy; 2026 AgentBoss by{' '}
          <a
            href="https://carlosbejar.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline"
          >
            Carlos Bejar
          </a>
        </p>
      </div>
    </div>
  );
}
