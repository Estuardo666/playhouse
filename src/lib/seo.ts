import { type Metadata } from "next"

export interface SeoProps {
  title?: string
  description?: string
  image?: string
  keywords?: string[]
}

export function generateSeo({
  title = "PlayHouse – Teatro Educativo en Inglés | Loja, Ecuador",
  description = "Teatro educativo en inglés en Loja: shows musicales, talleres creativos y experiencias escénicas que combinan arte, pedagogía e inglés para niños y jóvenes en Ecuador.",
  image = "/og-hero.jpg",
  keywords = [
    "teatro educativo en inglés",
    "teatro educativo Loja",
    "teatro educativo Loja Ecuador",
    "talleres de teatro Loja",
    "shows musicales en inglés Ecuador",
    "playhouse teatro Loja",
    "educational theatre Loja Ecuador",
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
