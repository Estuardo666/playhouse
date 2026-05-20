export const locales = ["en", "es"] as const
export type SupportedLocale = typeof locales[number]

export const defaultLocale: SupportedLocale = "en"

export function isValidLocale(lang: string): lang is SupportedLocale {
  return (locales as readonly string[]).includes(lang)
}

export function getLocaleFromPathname(pathname: string): SupportedLocale {
  const segment = pathname.split("/")[1]
  return isValidLocale(segment) ? segment : defaultLocale
}

export function switchLocalePath(pathname: string, targetLocale: SupportedLocale): string {
  const parts = pathname.split("/")
  if (isValidLocale(parts[1])) {
    parts[1] = targetLocale
    return parts.join("/") || "/"
  }
  return `/${targetLocale}${pathname}`
}
