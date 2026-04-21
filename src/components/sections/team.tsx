"use client"

import { useRef, useState, useCallback, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WaveCarousel, { type WaveCarouselItem } from "@/components/ui/wave-carousel"
import { TEAM_MEMBERS } from "@/content/playhouse/team"

/* ─────────────── tokens ─────────────── */
const PG = '"Play Grotesk", "Google Sans", sans-serif'
const GS = '"Google Sans", "Inter", sans-serif'
const ease = [0.34, 1.56, 0.64, 1] as const

const blurFade = (delay = 0) => ({
  initial: { opacity: 0, y: 32, filter: "blur(14px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1.05, ease, delay },
})

/* ─────────────── data transform ─────────────── */
const carouselItems: WaveCarouselItem[] = TEAM_MEMBERS.map((m) => ({
  id: m.id,
  image: m.image,
  tag: m.role,
  secondaryTag: m.secondaryRole,
  title: m.name,
}))

/* ─────────────── section ─────────────── */
export default function Team() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })

  const splitIndex = Math.ceil(carouselItems.length / 2)
  const topCarouselItems = useMemo(() => carouselItems.slice(0, splitIndex), [splitIndex])
  const bottomCarouselItems = useMemo(() => carouselItems.slice(splitIndex), [splitIndex])

  useEffect(() => {
    const updateViewport = () => {
      setIsMobileViewport(window.innerWidth < 768)
    }

    updateViewport()
    window.addEventListener("resize", updateViewport)

    return () => {
      window.removeEventListener("resize", updateViewport)
    }
  }, [])

  const animateCursor = useCallback(() => {
    posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.12
    posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.12
    setCursor((c) => ({ ...c, x: posRef.current.x, y: posRef.current.y }))
    rafRef.current = requestAnimationFrame(animateCursor)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = carouselRef.current?.getBoundingClientRect()
      if (!rect) return
      targetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    },
    []
  )

  const handleMouseEnter = useCallback(() => {
    setCursor((c) => ({ ...c, visible: true }))
    rafRef.current = requestAnimationFrame(animateCursor)
  }, [animateCursor])

  const handleMouseLeave = useCallback(() => {
    setCursor((c) => ({ ...c, visible: false }))
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])
  return (
    <section
      id="team"
      className="relative w-full overflow-hidden"
      style={{ background: "#181815" }}
      aria-labelledby="team-heading"
    >
      {/* subtle radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(92,16,16,0.18) 0%, transparent 65%)",
        }}
      />

      {/* header — stays in container */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12 flex flex-col items-center">
        <div className="flex flex-col items-center gap-5 text-center max-w-2xl">

          <motion.div {...blurFade(0)}>
            <span
              className="inline-flex items-center px-5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase"
              style={{
                fontFamily: GS,
                background: "#5C1010",
                color: "#fff",
                letterSpacing: "0.16em",
              }}
            >
              Our Team
            </span>
          </motion.div>

          <motion.h2
            {...blurFade(0.08)}
            id="team-heading"
            className="text-white text-balance"
            style={{
              fontFamily: PG,
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
            }}
          >
            The ensemble<br />behind the magic
          </motion.h2>

          <motion.p
            {...blurFade(0.12)}
            style={{ fontFamily: GS, fontSize: "1rem", fontWeight: 400, color: "rgba(255,255,255,0.55)" }}
          >
            Founders, performers, educators &amp; creators
          </motion.p>

          <motion.p
            {...blurFade(0.16)}
            className="leading-relaxed text-balance"
            style={{
              fontFamily: GS,
              fontSize: "1.22rem",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.4,
              textAlign: "justify",
            }}
          >
            From founders to performers to educators — every member of the
            PlayHouse family brings a unique voice to the stage. Together, we
            shape the experiences that transform young artists.
          </motion.p>

        </div>
      </div>

      {/* carousel — full 100vw, outside container */}
      <motion.div
        {...blurFade(0.28)}
        ref={carouselRef}
        className="relative z-10 pb-24"
        style={{ cursor: isMobileViewport ? "default" : "none" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isMobileViewport ? (
          <div className="flex flex-col gap-2">
            <WaveCarousel items={topCarouselItems} autoScroll={false} />
            <WaveCarousel items={bottomCarouselItems} autoScroll={false} reverse />
          </div>
        ) : (
          <WaveCarousel items={carouselItems} />
        )}

        {/* custom drag cursor */}
        <AnimatePresence>
          {!isMobileViewport && cursor.visible && (
            <motion.div
              key="drag-cursor"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="absolute pointer-events-none z-50 flex items-center gap-2 select-none"
              style={{
                left: cursor.x,
                top: cursor.y,
                transform: "translate(-50%, -50%)",
                background: "#fff",
                borderRadius: 999,
                padding: "10px 20px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1, color: "#181815" }}>←</span>
              <span
                style={{
                  fontFamily: GS,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#181815",
                }}
              >
                Drag
              </span>
              <span style={{ fontSize: 16, lineHeight: 1, color: "#181815" }}>→</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
