import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'
import de from './locales/de.json'
import it from './locales/it.json'

const messages = {
  en,
  fr,
  es,
  de,
  it
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'fr',
  fallbackLocale: 'en',
  messages
})