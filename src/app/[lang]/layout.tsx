import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "../globals.css"
import Navigation from "@/components/layout/navigation"
import { DirectionalCursor } from "@/components/ui/directional-cursor"
import ClickSpark from "@/components/ui/click-spark"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { locales, isValidLocale, type SupportedLocale } from "@/content/config"
import { notFound } from "next/navigation"
import { getDict } from "@/lib/i18n"
import WhatsAppFloat from "@/components/ui/whatsapp-float"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
})

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang
  if (!isValidLocale(lang)) return {}

  const isEs = lang === "es"
  // Use the domain that is currently live and resolvable. Switch this value
  // only after playhouse.ec has DNS, HTTPS, and a permanent redirect in place.
  const siteUrl = "https://playhouseec.com"

  const title = isEs
    ? "Playhouse – Teatro Educativo en Inglés | Loja, Ecuador"
    : "Playhouse | Educational Theatre & English Workshops in Loja, Ecuador"

  const description = isEs
    ? "Teatro educativo en inglés en Loja. Shows musicales, talleres y experiencias escénicas para niños y jóvenes. Arte, pedagogía e inglés en un mismo escenario."
    : "Playhouse brings English learning through theatre, shows, and creative workshops for students in Loja, Ecuador. Inspiring experiences combining art and pedagogy."

  const keywords = isEs
    ? [
        "teatro educativo en inglés",
        "teatro educativo Loja",
        "teatro educativo Loja Ecuador",
        "talleres de teatro Loja",
        "teatro en inglés niños Loja",
        "shows musicales en inglés Ecuador",
        "playhouse teatro Loja",
        "teatro infantil Loja",
        "residencia artística teatro Ecuador",
      ]
    : [
        "educational theatre Loja Ecuador",
        "English theatre workshops Ecuador",
        "theatre shows for schools Loja",
        "bilingual theatre Ecuador",
        "Playhouse educational theatre",
        "performing arts education Ecuador",
        "English musical theatre children Ecuador",
      ]

  return {
    metadataBase: new URL(siteUrl),
    verification: {
      google: "yEvacsO7GLpoD8nD0cmrf0D4b0k6-irhN0scwNbHHK8",
    },
    title: {
      default: title,
      template: "%s | Playhouse",
    },
    description,
    keywords,
    authors: [{ name: "Playhouse Team" }],
    creator: "Playhouse",
    icons: {
      icon: "/media/favicon.png",
      shortcut: "/media/favicon.png",
      apple: "/media/favicon.png",
    },
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        "en": `${siteUrl}/en`,
        "es": `${siteUrl}/es`,
        "x-default": `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: isEs ? "es_EC" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_EC",
      url: `${siteUrl}/${lang}`,
      siteName: "Playhouse",
      title,
      description,
      images: [
        {
          url: "/media/logo 2026.png",
          width: 1200,
          height: 630,
          alt: isEs
            ? "Playhouse – Teatro Educativo en Inglés, Loja Ecuador"
            : "Playhouse – Educational Theatre, Loja Ecuador",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/media/logo 2026.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDF6E3" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isValidLocale(params.lang)) notFound()

  const lang = params.lang as SupportedLocale
  const dict = getDict(lang)
  const siteUrl = "https://playhouseec.com"
  const isEs = lang === "es"
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: "Playhouse",
    url: `${siteUrl}/${lang}`,
    logo: `${siteUrl}/media/logo%202026.png`,
    description: isEs
      ? "Teatro educativo en inglés, shows musicales y talleres para escuelas, familias y estudiantes en Loja, Ecuador."
      : "Educational theatre in English, musical shows, and workshops for schools, families, and students in Loja, Ecuador.",
    email: "vaplayhouse@gmail.com",
    telephone: "+593939576825",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Loja",
      addressCountry: "EC",
    },
    areaServed: {
      "@type": "City",
      name: "Loja",
    },
    sameAs: [
      "https://www.instagram.com/playhouse.ec",
      "https://www.facebook.com/playhousec",
      "https://www.tiktok.com/@playhouse.ec",
      "https://www.youtube.com/@playhouse_ec",
    ],
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.variable,
          playfair.variable
        )}
      >
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
          />
          <DirectionalCursor
            color="#181815"
            cursorSize={0.7}
            keepBrowserCursor={false}
            keepPointerCursor={false}
            keepTextCursor={true}
            stiffness={520}
            damping={38}
            mass={0.6}
            hideOnMobile={true}
            hideOnTablet={true}
          />
          <ClickSpark
            sparkColor="#5C1010"
            sparkSize={11}
            sparkRadius={22}
            sparkCount={9}
            duration={420}
            easing="ease-out"
          />
          <div aria-hidden="true" className="global-tint-overlay" />
          <div aria-hidden="true" className="global-grain-overlay" />
          <div className="relative z-10">
            <Navigation lang={lang} dict={dict.nav} />
            <main className="flow-root bg-background">{children}</main>
          </div>
          <WhatsAppFloat label={dict.whatsapp.label} />
        </ThemeProvider>
      </body>
    </html>
  )
}
