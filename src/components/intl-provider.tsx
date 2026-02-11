'use client'

import { IntlProvider } from 'next-intl'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  locale: string
  messages: Record<string, any>
}

export function IntlProviderWrapper({ children, locale, messages }: Props) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      {children}
    </IntlProvider>
  )
}
