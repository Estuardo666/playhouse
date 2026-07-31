import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { isValidLocale, type SupportedLocale } from "@/content/config"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const es = params.lang === "es"
  return { title: es ? "Teatro en Inglés en Loja para Niños y Jóvenes" : "English Theatre in Loja for Children and Young People", description: es ? "Shows, talleres y teatro musical en inglés para niños, jóvenes, familias y colegios en Loja, Ecuador." : "English theatre shows, workshops, and musical theatre for children, young people, families, and schools in Loja, Ecuador." }
}

export default function EnglishTheatreLanding({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) notFound()
  const es = params.lang === "es"
  const lang = params.lang as SupportedLocale
  const items = es ? ["Actuación, voz y movimiento", "Storytelling e improvisación", "Teatro musical con canto y ritmo", "Experiencias adaptadas a colegios y familias"] : ["Acting, voice, and movement", "Storytelling and improvisation", "Musical theatre with song and rhythm", "Experiences adapted to schools and families"]
  return <main className="mx-auto max-w-5xl px-6 py-24 lg:px-8"><p className="text-xs uppercase tracking-[0.2em] text-deep-red">Playhouse · Loja, Ecuador</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">{es ? "Teatro en inglés que convierte el aprendizaje en experiencia" : "English theatre that turns learning into experience"}</h1><p className="mt-7 max-w-2xl text-xl leading-8 text-foreground/70">{es ? "Shows, talleres y teatro musical para aprender inglés con imaginación, movimiento y confianza." : "Shows, workshops, and musical theatre that make English learning imaginative, active, and confident."}</p><div className="mt-10 flex flex-wrap gap-4"><a className="rounded-full bg-deep-red px-6 py-3 font-semibold text-white" href="https://wa.me/593939576825">{es ? "Consultar por WhatsApp" : "Ask on WhatsApp"}</a><Link className="rounded-full border border-foreground/20 px-6 py-3 font-semibold" href={`/${lang}/#faq`}>{es ? "Ver preguntas frecuentes" : "Read FAQs"}</Link></div><section className="mt-24 grid gap-5 md:grid-cols-2">{items.map((item) => <div key={item} className="rounded-2xl border border-foreground/10 p-6"><h2 className="text-xl font-semibold">{item}</h2><p className="mt-3 leading-7 text-foreground/70">{es ? "Una experiencia práctica para escuchar, expresarse y participar en inglés." : "A practical experience to listen, express yourself, and participate in English."}</p></div>)}</section><section className="mt-24 max-w-3xl"><h2 className="text-3xl font-semibold">{es ? "Para escuelas, familias y grupos" : "For schools, families, and groups"}</h2><p className="mt-5 leading-8 text-foreground/75">{es ? "Diseñamos actividades según la edad, el nivel y el contexto. Podemos trabajar con un show, un taller puntual o una experiencia más profunda de creación escénica." : "We design activities around age, level, and context. Choose a show, a one-off workshop, or a deeper stage-making experience."}</p></section></main>
}
