import { FactoryNavbar } from '@/components/landing/factory-navbar';
import { FactoryHero } from '@/components/landing/factory-hero';
import { ServicesSection } from '@/components/landing/services-section';
import { ProcessSection } from '@/components/landing/process-section';
import { AgentShowcase } from '@/components/landing/agent-showcase';
import { ValueProps } from '@/components/landing/value-props';
import { CtaSection } from '@/components/landing/cta-section';
import { FactoryFooter } from '@/components/landing/factory-footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <FactoryNavbar />
      <FactoryHero />
      <ServicesSection />
      <AgentShowcase />
      <ProcessSection />
      <ValueProps />
      <CtaSection />
      <FactoryFooter />
    </div>
  );
}
