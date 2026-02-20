import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { IntlProviderWrapper } from '@/components/intl-provider'

export const metadata: Metadata = {
  title: 'AgentBoss - Fábrica de Software potenciada por IA',
  description: 'Construimos tu software en semanas, no meses. Equipo de agentes IA especializados: desarrollo web, automatizaciones, agentes IA a medida y consultoría tech. Santiago, Chile.',
  keywords: ['software factory', 'agentes IA', 'desarrollo web', 'automatización', 'MVP', 'SaaS', 'Chile', 'inteligencia artificial', 'Next.js', 'consultoría tech'],
  authors: [{ name: 'AgentBoss', url: 'https://agentboss.cl' }],
  metadataBase: new URL('https://agentboss.cl'),
  alternates: {
    languages: {
      'es': '/es',
      'en': '/en',
    },
  },
  openGraph: {
    title: 'AgentBoss - Fábrica de Software potenciada por IA',
    description: 'Construimos tu software en semanas, no meses. 36 agentes IA especializados que cubren todo el ciclo de desarrollo.',
    url: 'https://agentboss.cl',
    siteName: 'AgentBoss',
    locale: 'es_CL',
    alternateLocale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AgentBoss - Tu software en semanas, no meses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentBoss - Fábrica de Software potenciada por IA',
    description: 'Construimos tu software en semanas, no meses. Equipo de agentes IA especializados.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
  ]
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!['es', 'en'].includes(locale)) {
    notFound()
  }

  const messages = (await import(`../../../i18n/${locale}.json`)).default

  return (
    <IntlProviderWrapper locale={locale} messages={messages}>
      {children}
    </IntlProviderWrapper>
  )
}
