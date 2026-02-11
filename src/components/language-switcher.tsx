'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const toggleLanguage = () => {
    const newLocale = locale === 'es' ? 'en' : 'es'

    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '')
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`

    router.push(newPath)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 hover:bg-[var(--secondary)] rounded-lg transition-colors flex items-center gap-1.5"
      title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      aria-label="Toggle language"
    >
      <Globe size={16} />
      <span className="text-xs font-medium uppercase tracking-wider">
        {locale === 'es' ? 'EN' : 'ES'}
      </span>
    </button>
  )
}
