import Hero from "@/components/layout/hero"
import CustomScrollbarPro from "@/components/layout/custom-scrollbar-pro"
import About from "@/components/sections/about"
import Team from "@/components/sections/team"
import Shows from "@/components/sections/shows"
import Workshops from "@/components/sections/workshops"
import Materials from "@/components/sections/materials"
import Footer from "@/components/sections/footer"
import SectionDivider from "@/components/ui/section-divider"

export default function MarketingPage() {
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

      {/* Main content — sits above the sticky footer */}
      <div className="relative z-10 isolate bg-white">
        <Hero />
        <About />
        <Team />
        <Shows />
        <SectionDivider bg="#fff" />
        <Workshops />
        <SectionDivider bg="#fff" />
        <Materials />
        <Footer />
      </div>
    </div>
  )
}
