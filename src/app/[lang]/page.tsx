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

export default function LangPage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) notFound()

  const lang = params.lang as SupportedLocale
  const dict = getDict(lang)

  return (
    <div className="relative bg-white">
      <CustomScrollbarPro
        thumbStyle="gradient"
        thumbGradientStart="#7A1515"
        thumbGradientEnd="#3D0A0A"
        trackStyle="transparent"
        scrollbarSize={12}
        borderRadius={10}
        autoHide={false}
      />
      <div className="relative z-10 isolate bg-white">
        <Hero lang={lang} dict={dict.hero} />
        <About lang={lang} dict={dict.about} missionDict={dict.mission} />
        <Team lang={lang} dict={dict.team} />
        <Shows lang={lang} dict={dict.shows} />
        <SectionDivider bg="#fff" />
        <Workshops lang={lang} dict={dict.workshops} />
        <SectionDivider bg="#fff" />
        <Materials lang={lang} dict={dict.materials} />
        <Footer lang={lang} dict={dict.footer} />
      </div>
    </div>
  )
}
