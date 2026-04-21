import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/layout/navigation"
import SexyScroll from "@/components/layout/sexy-scroll"
import { DirectionalCursor } from "@/components/ui/directional-cursor"
import ClickSpark from "@/components/ui/click-spark"
import { cn } from "@/lib/utils"

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

export const metadata: Metadata = {
  title: {
    default: "PlayHouse – Teatro Educativo en Inglés | Loja, Ecuador",
    template: "%s | PlayHouse",
  },
  icons: {
    icon: "/media/favicon.png",
    shortcut: "/media/favicon.png",
    apple: "/media/favicon.png",
  },
  description:
    "Teatro educativo en inglés en Loja: shows musicales, talleres creativos y experiencias escénicas que combinan arte, pedagogía e inglés para niños y jóvenes en Ecuador.",
  keywords: [
    "teatro educativo en inglés",
    "teatro educativo Loja",
    "teatro educativo Loja Ecuador",
    "talleres de teatro Loja",
    "teatro en inglés niños Loja",
    "shows musicales en inglés Ecuador",
    "playhouse teatro Loja",
    "educational theatre Loja Ecuador",
    "teatro infantil Loja",
    "performing arts education Ecuador",
  ],
  authors: [{ name: "PlayHouse Team" }],
  creator: "PlayHouse",
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://playhouse.com",
    siteName: "PlayHouse",
    title: "PlayHouse – Teatro Educativo en Inglés | Loja, Ecuador",
    description:
      "Teatro educativo en inglés en Loja. Shows musicales, talleres y experiencias escénicas para niños y jóvenes. Arte, pedagogía e inglés en un mismo escenario.",
    images: [
      {
        url: "/og-hero.jpg",
        width: 1200,
        height: 630,
        alt: "PlayHouse – Teatro Educativo en Inglés, Loja Ecuador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlayHouse – Teatro Educativo en Inglés | Loja, Ecuador",
    description:
      "Teatro educativo en inglés en Loja: shows musicales, talleres y experiencias escénicas para niños y jóvenes.",
    images: ["/twitter-hero.jpg"],
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
  verification: {
    google: "your-google-site-verification",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDF6E3" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-[#181815] antialiased",
          inter.variable,
          playfair.variable
        )}
      >
        <SexyScroll />
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
          <Navigation />
          <main className="flow-root bg-white">{children}</main>
        </div>
      </body>
    </html>
  )
}
