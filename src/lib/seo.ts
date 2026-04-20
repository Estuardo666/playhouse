import { type Metadata } from "next"

export interface SeoProps {
  title?: string
  description?: string
  image?: string
  keywords?: string[]
}

export function generateSeo({
  title = "PlayHouse | Teatro Educativo Interactivo",
  description = "PlayHouse combina teatro, música, pedagogía e inglés en experiencias educativas transformadoras.",
  image = "/og-hero.jpg",
  keywords = [
    "teatro educativo",
    "inglés niños", 
    "educational theatre",
    "playhouse",
  ],
}: SeoProps): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }]
}
