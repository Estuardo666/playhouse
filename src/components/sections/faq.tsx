import type { SupportedLocale } from "@/content/config"
import { FAQ } from "@/content/playhouse/faq"
import SectionShell from "@/components/layout/section-shell"

export default function FaqSection({ lang }: { lang: SupportedLocale }) {
  const items = FAQ[lang]
  return (
    <SectionShell id="faq" title={lang === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}>
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {items.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-foreground/10 bg-background/70 p-5">
            <summary className="cursor-pointer list-none pr-8 text-lg font-semibold marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-red">
              {item.question}
              <span aria-hidden="true" className="float-right text-deep-red transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-prose leading-7 text-foreground/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  )
}
