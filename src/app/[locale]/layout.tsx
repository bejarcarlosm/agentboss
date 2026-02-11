import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { IntlProviderWrapper } from '@/components/intl-provider'

export const metadata: Metadata = {
  title: 'AgentBoss - AI Software Factory',
  description: 'The Tesla Factory for software: a system of intelligent commands to create production-ready applications with AI agents.',
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
