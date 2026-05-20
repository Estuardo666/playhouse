"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { WORKSHOPS, getLocalizedWorkshops, type LocalizedWorkshop } from "@/content/playhouse/workshops"
import type { Dict } from "@/lib/i18n"
import type { SupportedLocale } from "@/content/config"
import ShiftButton from "@/components/ui/shift-button"

const PG = '"Play Grotesk", "Google Sans", sans-serif'
const GS = '"Google Sans", "Inter", sans-serif'
const DESKTOP_CARD_W = 286
const DESKTOP_CARD_H = 428
const MOBILE_CARD_MIN_W = 220
const MAX_VISIBLE_OFFSET = 2

type SliderSlot = {
  x: number
  scale: number
  opacity: number
  zIndex: number
  blur: string
  pointerEvents: "auto" | "none"
}

function getWrappedOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex
  const half = Math.floor(total / 2)

  if (offset > half) {
    offset -= total
  }

  if (offset < -half) {
    offset += total
  }

  return offset
}

function getCardSlot(offset: number, sideOffset: number): SliderSlot {
  const absOffset = Math.abs(offset)
  const direction = Math.sign(offset) || 1

  if (absOffset === 0) {
    return {
      x: 0,
      scale: 1.085,
      opacity: 1,
      zIndex: 90,
      blur: "blur(0px)",
      pointerEvents: "auto",
    }
  }

  if (absOffset === 1) {
    return {
      x: direction * sideOffset,
      scale: 0.9,
      opacity: 0.8,
      zIndex: 70,
      blur: "blur(1.6px)",
      pointerEvents: "auto",
    }
  }

  if (absOffset === 2) {
    return {
      x: direction * sideOffset * 1.78,
      scale: 0.8,
      opacity: 0.52,
      zIndex: 50,
      blur: "blur(3.6px)",
      pointerEvents: "auto",
    }
  }

  return {
    x: direction * sideOffset * 2.2,
    scale: 0.76,
    opacity: 0,
    zIndex: 10,
    blur: "blur(7px)",
    pointerEvents: "none",
  }
}

const blurFade = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(12px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
})

type DetailTab = "objectives" | "methodology" | "outcomes"

function WorkshopDetailModal({
  workshop,
  isOpen,
  onClose,
  dict,
}: {
  workshop: LocalizedWorkshop | null
  isOpen: boolean
  onClose: () => void
  dict: Dict["workshops"]
}) {
  const [activeTab, setActiveTab] = useState<DetailTab>("objectives")
  // Keep last seen workshop so the exit animation has content to show
  const [lastWorkshop, setLastWorkshop] = useState<LocalizedWorkshop | null>(workshop)

  if (workshop && workshop !== lastWorkshop) {
    setLastWorkshop(workshop)
    setActiveTab("objectives")
  }

  const displayed = workshop ?? lastWorkshop

  const tabItems =
    activeTab === "objectives"
      ? (displayed?.objectives ?? [])
      : activeTab === "outcomes"
        ? (displayed?.outcomes ?? [])
        : []

  return (
    <AnimatePresence mode="wait">
      {isOpen && displayed && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center px-4 pb-4 pt-24 md:px-6 md:pb-6 md:pt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.button
            aria-label={dict.closeLabel}
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(4px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
          />

          <motion.div
            className="relative z-[121] flex max-h-[calc(100dvh-7.5rem)] w-full max-w-[1240px] flex-col overflow-hidden rounded-[1.45rem] bg-card md:max-h-[calc(100dvh-9rem)] md:rounded-[2rem]"
            initial={{ opacity: 0, y: 32, scale: 0.93, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              y: 18,
              scale: 0.95,
              filter: "blur(6px)",
              transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
            }}
            transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-y-auto overscroll-contain p-4 md:p-8">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-black/10 px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-black/15"
              style={{ fontFamily: GS }}
            >
              {dict.closeLabel}
            </button>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-[0.95fr_1.85fr] md:gap-8">
              <div className="relative hidden min-h-[620px] overflow-hidden rounded-[1.8rem] md:block">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={displayed!.image}
                    alt={displayed!.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 35vw"
                  />
                </motion.div>
              </div>

              <div className="rounded-[1.9rem] bg-popover p-5 md:p-8">
                <h3
                  className="text-foreground"
                  style={{
                    fontFamily: GS,
                    fontSize: "clamp(2rem, 3vw, 3.3rem)",
                    fontWeight: 700,
                    lineHeight: 0.9,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {displayed!.title}
                </h3>

                <p
                  className="mt-3 text-muted-foreground"
                  style={{ fontFamily: GS, fontSize: "1.12rem", fontWeight: 400 }}
                >
                  {displayed!.subtitle}
                </p>

                <p
                  className="mt-4 text-foreground"
                  style={{ fontFamily: GS, fontSize: "clamp(1.05rem,1.8vw,1.15rem)", lineHeight: 1.4 }}
                >
                  {displayed!.description}
                </p>

                <div className="mt-6 w-full rounded-[1rem] border border-border bg-background/40 p-1 md:rounded-full">
                  <div className="flex w-full flex-col items-stretch gap-1 md:flex-row md:flex-wrap md:items-center">
                    {[
                      { key: "objectives", label: dict.tabs.objectives },
                      { key: "methodology", label: dict.tabs.methodology },
                      { key: "outcomes", label: dict.tabs.outcomes },
                    ].map((tab) => {
                      const isActive = activeTab === tab.key
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key as DetailTab)}
                          className="relative w-full rounded-[0.8rem] px-4 py-2 text-center text-[0.69rem] font-bold uppercase tracking-[0.16em] md:w-auto md:rounded-full"
                          style={{
                            fontFamily: GS,
                            color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                            background: isActive ? "hsl(var(--primary))" : "transparent",
                          }}
                        >
                          {tab.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.24 }}
                    className="mt-5 min-h-[280px]"
                  >
                    {activeTab === "methodology" ? (
                      <div className="space-y-3">
                        <div className="relative h-[200px] w-full overflow-hidden rounded-2xl">
                          <Image
                            src={displayed!.gallery[0]}
                            alt={`${displayed!.title} methodology`}
                            fill
                            className="object-cover"
                            sizes="(max-width:1024px) 100vw, 50vw"
                          />
                        </div>
                        <p
                          className="rounded-2xl bg-background px-4 py-4"
                          style={{ fontFamily: GS, fontSize: "1rem", lineHeight: 1.35 }}
                        >
                          {displayed!.methodology}
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {tabItems.slice(0, 3).map((text, idx) => (
                          <div key={idx} className="flex h-full flex-col gap-2">
                            <div className="relative h-[160px] overflow-hidden rounded-2xl">
                              <Image
                                src={displayed!.gallery[idx]}
                                alt={`${displayed!.title} point ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width:768px) 100vw, 260px"
                              />
                            </div>
                            <p
                              className="flex-1 rounded-2xl bg-background px-3 py-3"
                              style={{ fontFamily: GS, fontSize: "0.98rem", lineHeight: 1.2 }}
                            >
                              {text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Booking CTA */}
                <div className="mt-6 flex flex-col items-center border-t border-border pt-6 text-center">
                  <p className="text-muted-foreground" style={{ fontFamily: GS, fontSize: "0.95rem" }}>
                    {dict.bookingNote}
                  </p>
                  <a
                    href="https://forms.gle/DQ4ELJyu9vaFp6ax9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-80"
                    style={{ fontFamily: GS }}
                  >
                    {dict.bookCta}
                  </a>
                </div>
              </div>
            </div>
            </div>{/* end scroll wrapper */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function OverlappingSlider({
  items,
  initialIndex = 2,
  onLearnMore,
  learnMoreLabel,
}: {
  items: LocalizedWorkshop[]
  initialIndex?: number
  onLearnMore: (workshop: LocalizedWorkshop) => void
  learnMoreLabel: string
}) {
  const total = items.length
  const [activeIndex, setActiveIndex] = useState(() => {
    if (total === 0) {
      return 0
    }

    return ((initialIndex % total) + total) % total
  })
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(1180)

  useEffect(() => {
    const node = trackRef.current

    if (!node) {
      return
    }

    const updateWidth = () => {
      setTrackWidth(node.clientWidth)
    }

    updateWidth()

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setTrackWidth(entry.contentRect.width)
      }
    })

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const goNext = () => setActiveIndex((current) => (current + 1) % total)
  const goPrev = () => setActiveIndex((current) => (current - 1 + total) % total)
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offsetX = info.offset.x

    if (offsetX <= -70) {
      goNext()
      return
    }

    if (offsetX >= 70) {
      goPrev()
    }
  }

  const cardWidth = Math.max(
    MOBILE_CARD_MIN_W,
    Math.min(DESKTOP_CARD_W, Math.round(trackWidth * 0.27)),
  )
  const cardHeight = Math.round((cardWidth / DESKTOP_CARD_W) * DESKTOP_CARD_H)
  const sideOffset = Math.max(128, Math.min(272, Math.round(trackWidth * 0.23)))

  return (
    <div className="mt-14 w-full select-none" style={{ overflowX: "clip" }}>
      <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-0">
        <div ref={trackRef} className="h-0 w-full" aria-hidden />

        <div className="relative mx-auto" style={{ height: cardHeight + 24 }}>
          {items.map((workshop, i) => {
            const offset = getWrappedOffset(i, activeIndex, total)
            const slot = getCardSlot(offset, sideOffset)

            return (
              <motion.article
                key={workshop.id}
                className="absolute top-0 overflow-hidden rounded-[1.95rem] bg-card shadow-[0_28px_80px_rgba(0,0,0,0.2)]"
                animate={{
                  x: slot.x,
                  scale: slot.scale,
                  opacity: slot.opacity,
                  zIndex: slot.zIndex,
                  filter: slot.blur,
                }}
                transition={{
                  type: "tween",
                  duration: 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  left: "50%",
                  width: cardWidth,
                  height: cardHeight,
                  marginLeft: -(cardWidth / 2),
                  cursor: slot.pointerEvents === "auto" ? "pointer" : "default",
                  pointerEvents: slot.pointerEvents,
                  transformOrigin: "center center",
                  willChange: "transform, opacity, filter",
                  touchAction: "pan-y",
                }}
                drag={offset === 0 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                onClick={() => setActiveIndex(i)}
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={offset === 0 ? { scale: 1.045 } : { scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={workshop.image}
                    alt={workshop.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 78vw, 286px"
                  />
                </motion.div>

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(24,24,21,0) 18%, rgba(24,24,21,0.12) 42%, rgba(24,24,21,0.42) 62%, rgba(40,24,24,0.76) 80%, rgba(24,24,21,0.96) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-32 backdrop-blur-[12px] [mask-image:linear-gradient(to_top,black,transparent)]" />

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p
                    style={{
                      fontFamily: GS,
                      fontWeight: 600,
                      fontSize: "0.68rem",
                      lineHeight: 1,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#fff",
                      marginBottom: "0.45rem",
                    }}
                  >
                    Workshop
                  </p>
                  <h3
                    style={{
                      fontFamily: GS,
                      fontWeight: 600,
                      fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
                      lineHeight: 0.94,
                      letterSpacing: "-0.03em",
                      color: "#fff",
                      textWrap: "balance",
                    }}
                  >
                    {workshop.title}
                  </h3>

                  <button
                    className="mt-3 rounded-full bg-[#5C1010] px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#741515]"
                    style={{ fontFamily: GS }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onLearnMore(workshop)
                    }}
                  >
                    {learnMoreLabel}
                  </button>
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={goPrev}
            aria-label="Previous workshop"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {items.map((workshop, i) => (
              <button
                key={workshop.id}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to ${workshop.title}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? 20 : 6,
                  height: 6,
                  background: i === activeIndex ? "hsl(var(--primary))" : "hsl(var(--border))",
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next workshop"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

interface WorkshopsProps {
  lang: SupportedLocale
  dict: Dict["workshops"]
}

export default function Workshops({ lang, dict }: WorkshopsProps) {
  const localizedWorkshops = getLocalizedWorkshops(WORKSHOPS, lang)
  const [selectedWorkshop, setSelectedWorkshop] = useState<LocalizedWorkshop | null>(null)

  return (
    <section
      id="workshops"
      className="relative w-full bg-background"
      aria-labelledby="workshops-heading"
    >
      <div className="relative z-10 mx-auto max-w-[1260px] px-6 pb-24 pt-24">
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.div {...blurFade(0)}>
            <span
              className="inline-flex items-center rounded-full bg-primary px-5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground"
              style={{ fontFamily: GS }}
            >
              {dict.pill}
            </span>
          </motion.div>

          <motion.h2
            {...blurFade(0.08)}
            id="workshops-heading"
            className="text-foreground"
            style={{
              fontFamily: PG,
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
            }}
          >
            {dict.heading}
          </motion.h2>

          <motion.p
            {...blurFade(0.11)}
            className="text-muted-foreground"
            style={{ fontFamily: GS, fontSize: "1rem", fontWeight: 400 }}
          >
            {dict.subheading}
          </motion.p>

          <motion.p
            {...blurFade(0.14)}
            className="text-foreground"
            style={{
              fontFamily: GS,
              fontSize: "1.22rem",
              lineHeight: 1.4,
              textAlign: "justify",
            }}
          >
            {dict.intro}
            <br />
            <br />
            {dict.intro2}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col items-center gap-1 text-center"
          >
            <p
              className="text-foreground"
              style={{
                fontFamily: GS,
                fontSize: "clamp(1.25rem, 2.2vw, 1.55rem)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {dict.bookingLine1}
            </p>
            <p
              className="text-muted-foreground"
              style={{
                fontFamily: GS,
                fontSize: "clamp(1.25rem, 2.2vw, 1.55rem)",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              {dict.bookingLine2}
            </p>
            <div className="mt-4">
              <ShiftButton
                label={dict.bookCta}
                href="https://forms.gle/DQ4ELJyu9vaFp6ax9"
                bgColor="#5C1010"
                textColor="#fff"
                fontSize={18}
                fontWeight={600}
              />
            </div>
          </motion.div>
        </div>

        <OverlappingSlider
          items={localizedWorkshops}
          initialIndex={2}
          onLearnMore={(workshop) => setSelectedWorkshop(workshop)}
          learnMoreLabel={dict.learnMore}
        />
      </div>

      <WorkshopDetailModal
        workshop={selectedWorkshop}
        isOpen={Boolean(selectedWorkshop)}
        onClose={() => setSelectedWorkshop(null)}
        dict={dict}
      />
    </section>
  )
}
