import type { MetadataRoute } from "next"
import { getBlogSlugs } from "@/content/playhouse/blog"

const siteUrl = "https://playhouseec.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const core: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/es`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { es: `${siteUrl}/es`, en: `${siteUrl}/en` } },
    },
    {
      url: `${siteUrl}/en`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { es: `${siteUrl}/es`, en: `${siteUrl}/en` } },
    },
  ]
  const localizedPages = ["teatro-en-ingles-loja", "clases-de-ingles-loja"].flatMap((slug) => ["es", "en"].map((lang) => ({ url: `${siteUrl}/${lang}/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })))
  const blogPages = getBlogSlugs().flatMap((slug) => ["es", "en"].map((lang) => ({ url: `${siteUrl}/${lang}/blog/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.6 })))
  return [...core, ...localizedPages, ...blogPages]
}
