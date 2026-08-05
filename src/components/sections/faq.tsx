"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import type { SupportedLocale } from "@/content/config"
import { FAQ } from "@/content/playhouse/faq"
import SectionShell from "@/components/layout/section-shell"

export default function FaqSection({ lang }: { lang: SupportedLocale }) {
  const items = FAQ[lang]
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  return (
    <SectionShell
      id="faq"
      className="!pt-8 lg:!pt-12"
      headingClassName="w-full bg-none text-center text-[clamp(2.4rem,5vw,3.8rem)] font-bold leading-[0.92] tracking-[-0.045em] text-foreground"
      title={lang === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
    >
      <div className="mx-auto max-w-3xl divide-y divide-foreground/10 border-y border-foreground/10">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          const questionId = `faq-question-${lang}-${index}`
          const answerId = `faq-answer-${lang}-${index}`
          return (
            <div key={item.question}>
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-4 text-left text-base font-semibold transition-colors hover:text-deep-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep-red md:py-5 md:text-lg"
              >
                <span>{item.question}</span>
                <motion.span
                  aria-hidden="true"
                  animate={reducedMotion ? undefined : { rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="shrink-0 text-2xl font-normal leading-none text-deep-red"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-5 pr-10 text-sm leading-6 text-foreground/70 md:text-base">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </SectionShell>
  )
}
