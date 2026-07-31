import type { Metadata } from "next"
import type { SupportedLocale } from "@/content/config"
import SectionShell from "@/components/layout/section-shell"
import BlogCardList from "@/components/sections/blog-card-list"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const es = params.lang === "es"
  return {
    title: es ? "Blog de teatro e inglés en Loja" : "Theatre and English journal",
    description: es ? "Ideas y recursos de Playhouse sobre teatro, teatro musical y aprendizaje de inglés en Loja." : "Playhouse ideas about theatre, musical theatre, and English learning.",
  }
}

export default function BlogPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as SupportedLocale
  return <SectionShell id="blog" title={lang === "es" ? "Ideas para aprender creando" : "Ideas for creative learning"} subtitle={lang === "es" ? "Teatro, música, inglés y educación." : "Theatre, music, English, and education."}><BlogCardList lang={lang} /></SectionShell>
}
