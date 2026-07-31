import type { MetadataRoute } from "next"

const siteUrl = "https://playhouseec.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
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
}
