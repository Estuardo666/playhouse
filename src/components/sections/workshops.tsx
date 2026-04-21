"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { WORKSHOPS, type Workshop, type WorkshopTab } from "@/content/playhouse/workshops"

/* ─────────────── tokens ─────────────── */
const PG = '"Play Grotesk", "Google Sans", sans-serif'
const GS = '"Google Sans", "Inter", sans-serif'
const ease = [0.34, 1.56, 0.64, 1] as const

const blurFade = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(12px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, ease, delay },
})

/* ─────────────── slide tabs ─────────────── */
function SlideTabs({
  tabs,
  activeKey,
  onChange,
  layoutId,
}: {
  tabs: WorkshopTab[]
  activeKey: string
  onChange: (key: WorkshopTab["key"]) => void
  layoutId: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="w-full overflow-x-auto scrollbar-none"
        role="tablist"
      >
      <div className="flex min-w-max items-center gap-1 rounded-full border border-black/[0.12] bg-transparent p-1 md:min-w-0 md:w-full">
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className="relative flex-shrink-0 md:flex-1 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-colors text-center"
            style={{
              fontFamily: GS,
              letterSpacing: "0.14em",
              color: isActive ? "#fff" : "#545454",
              background: "transparent",
              zIndex: 1,
            }}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full"
                style={{ background: "#5C1010", zIndex: -1 }}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            {tab.label}
          </button>
        )
      })}
      </div>
      </div>
      <div
        aria-hidden="true"
        className="mt-2 flex items-center justify-center gap-3 md:hidden"
      >
        <span className="text-[0.74rem] text-[#7A7A7A]">←</span>
        <span
          className="uppercase text-[0.62rem] font-semibold"
          style={{ fontFamily: GS, color: "#7A7A7A", letterSpacing: "0.16em" }}
        >
          Slide tabs
        </span>
        <span className="text-[0.74rem] text-[#7A7A7A]">→</span>
      </div>
    </div>
  )
}

/* ─────────────── tab content ─────────────── */
function TabContent({ tab }: { tab: WorkshopTab }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tab.key}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Objectives / Outcomes — 3 image cards */}
        {tab.items && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 items-stretch">
            {tab.items.map((item, i) => (
              <div key={i} className="flex flex-col gap-2 h-full">
                <div
                  className="relative w-full overflow-hidden"
                  style={{ borderRadius: 22, aspectRatio: "4/3" }}
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 240px"
                    />
                  </motion.div>
                </div>
                <p
                  className="rounded-2xl px-4 py-3.5 flex-1"
                  style={{
                    fontFamily: GS,
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "#181815",
                    lineHeight: 0.95,
                    background: "#fff",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Methodology — wide image + paragraph */}
        {!tab.items && tab.image && (
          <div className="mt-5 flex flex-col gap-4">
            <div
              className="relative w-full overflow-hidden"
              style={{ borderRadius: 22, aspectRatio: "16/3" }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={tab.image}
                  alt={tab.imageAlt ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 600px"
                />
              </motion.div>
            </div>
            <p
              className="rounded-2xl px-5 py-4 text-center"
              style={{
                fontFamily: GS,
                fontSize: "1rem",
                fontWeight: 500,
                color: "#181815",
                lineHeight: 0.95,
                background: "#fff",
              }}
            >
              {tab.text}
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

/* ─────────────── workshop card ─────────────── */
function WorkshopCard({ workshop, index }: { workshop: Workshop; index: number }) {
  const [activeTab, setActiveTab] = useState<WorkshopTab["key"]>("objectives")
  const currentTab = workshop.tabs.find((t) => t.key === activeTab)!
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <motion.div
      ref={cardRef}
      {...blurFade(0.1 + index * 0.08)}
      className="relative grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-stretch py-14"
    >
      {/* left — image: fixed height, does not grow with tab content */}
      <div
        className="relative w-full overflow-hidden hidden md:block self-start"
        style={{ borderRadius: 32, height: 640 }}
      >
        <motion.div
          className="absolute left-0 right-0"
          style={{ y: imageY, top: "-12%", bottom: "-12%" }}
        >
          <Image
            src={workshop.image}
            alt={workshop.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </motion.div>
      </div>

      {/* right — content */}
      <div className="flex flex-col gap-4 p-8 md:p-14" style={{ background: "rgba(0,0,0,0.06)", borderRadius: 40, height: "auto", minHeight: 0 }}>
        <h3
          style={{
            fontFamily: GS,
            fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
            fontWeight: 600,
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            color: "#5C1010",
            whiteSpace: "pre-wrap",
          }}
        >
          {workshop.title}
        </h3>

        <p
          style={{
            fontFamily: GS,
            fontSize: "1rem",
            fontWeight: 400,
            color: "#545454",
            letterSpacing: "-0.01em",
          }}
        >
          {workshop.subtitle}
        </p>

        <p
          style={{
            fontFamily: GS,
            fontSize: "1.22rem",
            color: "#181815",
            lineHeight: 1.4,
            textAlign: "justify",
          }}
        >
          {workshop.description}
        </p>

        {/* slide tabs */}
        <div className="mt-2">
          <SlideTabs
            tabs={workshop.tabs}
            activeKey={activeTab}
            onChange={setActiveTab}
            layoutId={`tab-pill-${workshop.id}`}
          />
          <TabContent tab={currentTab} />
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────── section ─────────────── */
export default function Workshops() {
  return (
    <section
      id="workshops"
      className="relative w-full overflow-hidden bg-white"
      aria-labelledby="workshops-heading"
    >
      <div className="relative z-10 mx-auto px-6 pt-24 pb-24 max-w-[1260px]">

        {/* section header — centered, no image */}
        <div className="flex flex-col items-center text-center gap-6 mb-20 max-w-3xl mx-auto">
          <motion.div {...blurFade(0)}>
            <span
              className="inline-flex items-center px-5 py-1.5 rounded-full text-[0.72rem] font-semibold uppercase tracking-[0.18em]"
              style={{
                fontFamily: GS,
                background: "#5C1010",
                color: "#fff",
              }}
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
            Learn through the stage
          </motion.h2>

          <motion.p
            {...blurFade(0.11)}
            style={{ fontFamily: GS, fontSize: "1rem", fontWeight: 400, color: "#545454" }}
          >
            Hands-on learning through theatre &amp; performance
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
            At PLAYHOUSE — Educational Theatre, our workshops use the power of theatre to make learning English fun, creative, and memorable. Through games, improvisation, storytelling, music, and stage performance, students explore new ways of expressing themselves while building confidence in their language skills.
            <br /><br />
            Whether discovering the basics of theatre, creating original stories, trying out musical theatre, or learning to speak with clarity, each workshop is designed to inspire imagination, teamwork, and communication. From stepping onto the stage to welcoming a guest into the classroom, every experience is interactive, dynamic, and tailored to help students grow both as performers and as confident English speakers.
          </motion.p>
        </div>

        {/* workshop list */}
        <div className="divide-y divide-black/[0.07]">
          {WORKSHOPS.map((workshop, i) => (
            <WorkshopCard key={workshop.id} workshop={workshop} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
