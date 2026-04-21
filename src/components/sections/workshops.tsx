"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { WORKSHOPS, type Workshop } from "@/content/playhouse/workshops"
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
}: {
  workshop: Workshop | null
  isOpen: boolean
  onClose: () => void
}) {
  const [activeTab, setActiveTab] = useState<DetailTab>("objectives")
  // Keep last seen workshop so the exit animation has content to show
  const [lastWorkshop, setLastWorkshop] = useState<Workshop | null>(workshop)

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
            aria-label="Close workshop details"
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(4px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
          />

          <motion.div
            className="relative z-[121] flex max-h-[calc(100dvh-7.5rem)] w-full max-w-[1240px] flex-col overflow-hidden rounded-[1.45rem] bg-[#f3f1ee] md:max-h-[calc(100dvh-9rem)] md:rounded-[2rem]"
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
              className="absolute right-4 top-4 rounded-full bg-black/10 px-3 py-1.5 text-sm font-semibold text-[#181815] transition-colors hover:bg-black/15"
              style={{ fontFamily: GS }}
            >
              Close
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

              <div className="rounded-[1.9rem] bg-[#ece9e6] p-5 md:p-8">
                <h3
                  style={{
                    fontFamily: GS,
                    fontSize: "clamp(2rem, 3vw, 3.3rem)",
                    fontWeight: 700,
                    lineHeight: 0.9,
                    letterSpacing: "-0.05em",
                    color: "#5C1010",
                  }}
                >
                  {displayed!.title}
                </h3>

                <p
                  className="mt-3"
                  style={{ fontFamily: GS, color: "#545454", fontSize: "1.12rem", fontWeight: 400 }}
                >
                  {displayed!.subtitle}
                </p>

                <p
                  className="mt-4"
                  style={{ fontFamily: GS, color: "#181815", fontSize: "clamp(1.05rem,1.8vw,1.15rem)", lineHeight: 1.4 }}
                >
                  {displayed!.description}
                </p>

                <div className="mt-6 w-full rounded-[1rem] border border-black/10 bg-white/40 p-1 md:rounded-full">
                  <div className="flex w-full flex-col items-stretch gap-1 md:flex-row md:flex-wrap md:items-center">
                    {[
                      { key: "objectives", label: "Specific Objectives" },
                      { key: "methodology", label: "Methodology" },
                      { key: "outcomes", label: "Expected Outcomes" },
                    ].map((tab) => {
                      const isActive = activeTab === tab.key
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key as DetailTab)}
                          className="relative w-full rounded-[0.8rem] px-4 py-2 text-center text-[0.69rem] font-bold uppercase tracking-[0.16em] md:w-auto md:rounded-full"
                          style={{
                            fontFamily: GS,
                            color: isActive ? "#fff" : "#686868",
                            background: isActive ? "#5C1010" : "transparent",
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
                          className="rounded-2xl bg-white px-4 py-4"
                          style={{ fontFamily: GS, fontSize: "1rem", color: "#181815", lineHeight: 1.35 }}
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
                              className="flex-1 rounded-2xl bg-white px-3 py-3"
                              style={{ fontFamily: GS, fontSize: "0.98rem", color: "#181815", lineHeight: 1.2 }}
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
                <div className="mt-6 flex flex-col items-center border-t border-black/10 pt-6 text-center">
                  <p style={{ fontFamily: GS, fontSize: "0.95rem", color: "#545454" }}>
                    To book any of the workshops, please fill out the following form:
                  </p>
                  <a
                    href="https://forms.gle/DQ4ELJyu9vaFp6ax9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block rounded-full bg-[#5C1010] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                    style={{ fontFamily: GS }}
                  >
                    Book a Workshop
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
}: {
  items: Workshop[]
  initialIndex?: number
  onLearnMore: (workshop: Workshop) => void
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
                className="absolute top-0 overflow-hidden rounded-[1.95rem] bg-white shadow-[0_28px_80px_rgba(0,0,0,0.2)]"
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
                    Learn more
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-[#181815] shadow-sm transition-colors hover:bg-[#f3f1ee]"
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
                  background: i === activeIndex ? "#5C1010" : "#D8D1CB",
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next workshop"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-[#181815] shadow-sm transition-colors hover:bg-[#f3f1ee]"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Workshops() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)

  return (
    <section
      id="workshops"
      className="relative w-full bg-white"
      aria-labelledby="workshops-heading"
    >
      <div className="relative z-10 mx-auto max-w-[1260px] px-6 pb-24 pt-24">
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center gap-6 text-center">
          <motion.div {...blurFade(0)}>
            <span
              className="inline-flex items-center rounded-full px-5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em]"
              style={{ fontFamily: GS, background: "#5C1010", color: "#fff" }}
            >
              Workshops
            </span>
          </motion.div>

          <motion.h2
            {...blurFade(0.08)}
            id="workshops-heading"
            style={{
              fontFamily: PG,
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
              color: "#181815",
            }}
          >
            Theatre Workshops in English
          </motion.h2>

          <motion.p
            {...blurFade(0.11)}
            style={{ fontFamily: GS, fontSize: "1rem", fontWeight: 400, color: "#545454" }}
          >
            Hands-on learning through theatre and performance
          </motion.p>

          <motion.p
            {...blurFade(0.14)}
            style={{
              fontFamily: GS,
              fontSize: "1.22rem",
              color: "#181815",
              lineHeight: 1.4,
              textAlign: "justify",
            }}
          >
            At PLAYHOUSE - Educational Theatre, our workshops use the power of theatre to make learning English fun, creative, and memorable. Through games, improvisation, storytelling, music, and stage performance, students explore new ways of expressing themselves while building confidence in their language skills.
            <br />
            <br />
            Whether discovering the basics of theatre, creating original stories, trying out musical theatre, or learning to speak with clarity, each workshop is designed to inspire imagination, teamwork, and communication. From stepping onto the stage to welcoming a guest into the classroom, every experience is interactive, dynamic, and tailored to help students grow both as performers and as confident English speakers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col items-center gap-1 text-center"
          >
            <p
              style={{
                fontFamily: GS,
                fontSize: "clamp(1.25rem, 2.2vw, 1.55rem)",
                color: "#181815",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              To book any of the workshops,
            </p>
            <p
              style={{
                fontFamily: GS,
                fontSize: "clamp(1.25rem, 2.2vw, 1.55rem)",
                color: "#282830",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              please fill out the following form:
            </p>
            <div className="mt-4">
              <ShiftButton
                label="Book a Workshop"
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
          items={WORKSHOPS}
          initialIndex={2}
          onLearnMore={(workshop) => setSelectedWorkshop(workshop)}
        />
      </div>

      <WorkshopDetailModal
        workshop={selectedWorkshop}
        isOpen={Boolean(selectedWorkshop)}
        onClose={() => setSelectedWorkshop(null)}
      />
    </section>
  )
}
