import { isValidLocale, type SupportedLocale } from "@/content/config"
import { getDict } from "@/lib/i18n"
import { notFound } from "next/navigation"
import Hero from "@/components/layout/hero"
import CustomScrollbarPro from "@/components/layout/custom-scrollbar-pro"
import About from "@/components/sections/about"
import Team from "@/components/sections/team"
import Shows from "@/components/sections/shows"
import Workshops from "@/components/sections/workshops"
import Materials from "@/components/sections/materials"
import Footer from "@/components/sections/footer"
import SectionDivider from "@/components/ui/section-divider"
import FaqSection from "@/components/sections/faq"
import SectionShell from "@/components/layout/section-shell"

export default function LangPage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) notFound()

  const lang = params.lang as SupportedLocale
  const dict = getDict(lang)

  return (
    <div className="relative bg-background">
      <CustomScrollbarPro
        thumbStyle="gradient"
        thumbGradientStart="#7A1515"
        thumbGradientEnd="#3D0A0A"
        trackStyle="transparent"
        scrollbarSize={12}
        borderRadius={10}
        autoHide={false}
      />
      <div className="relative z-10 isolate bg-background">
        <Hero lang={lang} dict={dict.hero} />
        <About lang={lang} dict={dict.about} missionDict={dict.mission} />
        <Team lang={lang} dict={dict.team} />
        <Shows lang={lang} dict={dict.shows} />
        <SectionDivider />
        <Workshops lang={lang} dict={dict.workshops} />
        <SectionDivider />
        <Materials lang={lang} dict={dict.materials} />
        <SectionShell id="services" title={lang === "es" ? "Explora Playhouse" : "Explore Playhouse"}>
          <div className="grid gap-5 md:grid-cols-2">
            <LinkCard href={`/${lang}/teatro-en-ingles-loja`} title={lang === "es" ? "Teatro en inglés en Loja" : "English theatre in Loja"} text={lang === "es" ? "Shows, talleres y teatro musical para aprender haciendo." : "Shows, workshops, and musical theatre for active learning."} />
            <LinkCard href={`/${lang}/clases-de-ingles-loja`} title={lang === "es" ? "Clases de inglés por edades" : "English classes by age"} text={lang === "es" ? "Niños, jóvenes y adultos con una metodología creativa." : "Children, young people, and adults through a creative methodology."} />
          </div>
        </SectionShell>
        <FaqSection lang={lang} />
        <Footer lang={lang} dict={dict.footer} />
      </div>
    </div>
  )
}

function LinkCard({ href, title, text }: { href: string; title: string; text: string }) {
  return <a href={href} className="rounded-2xl border border-foreground/10 bg-background/70 p-7 transition-colors hover:border-deep-red"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-foreground/70">{text}</p><span className="mt-5 inline-block font-semibold text-deep-red">Explore →</span></a>
}
