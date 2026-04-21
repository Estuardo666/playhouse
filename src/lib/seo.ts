import { type Metadata } from "next"

export interface SeoProps {
  title?: string
  description?: string
  image?: string
  keywords?: string[]
}

export function generateSeo({
  title = "Playhouse | Educational Theatre & English Workshops in Loja, Ecuador",
  description = "Playhouse brings English learning through theatre, shows, and creative workshops for students in Loja, Ecuador. Inspiring experiences combining art and pedagogy.",
  image = "/media/logo 2026.png",
  keywords = [
    "teatro educativo en inglés",
    "teatro educativo Loja",
    "teatro educativo Loja Ecuador",
    "talleres de teatro Loja",
    "shows musicales en inglés Ecuador",
    "playhouse teatro Loja",
    "taller inglés Loja",
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
