import { type Locale } from "./playhouse"

export const locales = ["es", "en"] as const
export type SupportedLocale = typeof locales[number]

export const defaultLocale: SupportedLocale = "es"

export function getLocaleFromUrl(url: string): SupportedLocale {
  const params = new URLSearchParams(url.split("?")[1])
  return (params.get("lang") as SupportedLocale) ?? defaultLocale
}

export function useLocale(): SupportedLocale {
  // Hook implementation for client components
  if (typeof window === "undefined") return defaultLocale
  
  const urlParams = new URLSearchParams(window.location.search)
  const lang = urlParams.get("lang") as SupportedLocale
  
  return lang && (locales as readonly string[]).includes(lang) 
    ? lang 
    : defaultLocale
}
