"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { SHOWS, type Show, type ShowGalleryImage } from "@/content/playhouse/shows"

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

/* ─────────────── vertical parallax slider + minimap ─────────────── */
function ParallaxSliderPro({ images }: { images: ShowGalleryImage[] }) {
  const n = images.length
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const scrollTarget = useRef(0)
  const scrollCurrent = useRef(0)
  const isDragging = useRef(false)
  const isHovered = useRef(false)
  const dragStartY = useRef(0)
  const dragStartScroll = useRef(0)
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scheduleSnapRef = useRef<() => void>(() => {})
  const [, rerender] = useState(0)
  const [H, setH] = useState(480)

  useEffect(() => {
    const updateViewport = () => setIsMobileViewport(window.innerWidth < 768)

    updateViewport()
    window.addEventListener("resize", updateViewport)

    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  // Observe container height
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setH(entry.contentRect.height))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // RAF lerp loop
  useEffect(() => {
    let rafId: number
    const loop = () => {
      const d = scrollTarget.current - scrollCurrent.current
      scrollCurrent.current = Math.abs(d) > 0.3 ? scrollCurrent.current + d * 0.055 : scrollTarget.current
      rerender(t => t + 1)
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const scheduleSnap = useCallback(() => {
    if (snapTimer.current) clearTimeout(snapTimer.current)
    snapTimer.current = setTimeout(() => {
      scrollTarget.current = Math.round(scrollTarget.current / H) * H
    }, 120)
  }, [H])

  // keep ref in sync so wheel handler always has latest
  useEffect(() => { scheduleSnapRef.current = scheduleSnap }, [scheduleSnap])

  // Wheel — block page scroll when hovering slider
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (!isHovered.current) return
      e.preventDefault()
      e.stopPropagation()
      scrollTarget.current += e.deltaY * 0.8
      scheduleSnapRef.current()
    }
    // must be non-passive to call preventDefault
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    isDragging.current = true
    dragStartY.current = e.clientY
    dragStartScroll.current = scrollTarget.current
    if (snapTimer.current) clearTimeout(snapTimer.current)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    scrollTarget.current = dragStartScroll.current + (dragStartY.current - e.clientY)
  }
  const onPointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    scheduleSnap()
  }

  // Render slots
  const s = scrollCurrent.current
  const centerSlot = Math.floor(s / H)
  const activeIdx = ((Math.round(s / H) % n) + n) % n
  const nextIdx = (activeIdx + 1) % n
  const SCALE = 1.4
  const PARALLAX = 0.28
  // Minimap height constant for parallax calc
  const MM_H = 130
  const nextSlot = Math.round(s / H) + 1
  const minimapImageY = (s - nextSlot * H) * PARALLAX * (MM_H / H)

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl select-none cursor-grab active:cursor-grabbing"
      style={{
        height: "clamp(360px, 44vw, 540px)",
        touchAction: "none",
        overscrollBehavior: "contain",
      }}
      onPointerEnter={() => { isHovered.current = true }}
      onPointerLeave={() => { isHovered.current = false; onPointerUp() }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {[centerSlot - 1, centerSlot, centerSlot + 1].map(slot => {
        const imgIdx = ((slot % n) + n) % n
        const slotY = slot * H - s
        if (slotY >= H || slotY <= -H) return null
        const imageY = (s - slot * H) * PARALLAX
        return (
          <div
            key={slot}
            className="absolute inset-x-0 overflow-hidden"
            style={{ top: 0, height: H, transform: `translateY(${slotY}px)` }}
          >
            <div
              className="absolute inset-x-0 will-change-transform"
              style={{
                height: `${SCALE * 100}%`,
                top: `${-(SCALE - 1) / 2 * 100}%`,
                transform: `translateY(${imageY}px)`,
              }}
            >
              <Image
                src={images[imgIdx].src}
                alt={images[imgIdx].alt}
                fill
                className="object-cover"
                draggable={false}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
          </div>
        )
      })}

      {/* minimap — next image preview with parallax */}
      <div
        aria-hidden
        className="absolute bottom-4 right-4 overflow-hidden rounded-xl pointer-events-none"
        style={{ width: 80, height: MM_H, boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
      >
        <div
          className="absolute inset-x-0 will-change-transform"
          style={{
            height: `${SCALE * 100}%`,
            top: `${-(SCALE - 1) / 2 * 100}%`,
            transform: `translateY(${minimapImageY}px)`,
          }}
        >
          <Image
            src={images[nextIdx].src}
            alt={images[nextIdx].alt}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center"
      >
        <span
          className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white"
          style={{
            fontFamily: GS,
            textShadow: "0 1px 10px rgba(0,0,0,0.42)",
          }}
        >
          {isMobileViewport ? "Swipe" : "Scroll"}
        </span>
      </div>
    </div>
  )
}

/* ─────────────── accordion tab ─────────────── */
function AccordionTab({
  show,
  isOpen,
  onToggle,
  isLast,
  tabRef,
  index,
}: {
  show: Show
  isOpen: boolean
  onToggle: () => void
  isLast: boolean
  tabRef: React.RefObject<HTMLDivElement>
  index: number
}) {
  const logoSrc = index === 1 ? "/media/trash talk logo.png" : "/media/three little pigs logo 2.png"
  const logoSize = index === 1 ? 84 : 80
  const logoScale = isOpen ? 1.33 : 1

  return (
    <div ref={tabRef} className="relative">
      {/* wavy bottom divider */}
      {!isLast && (
        <div aria-hidden className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ height: 10 }}>
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" width="100%" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C40,-15 80,55 120,20 C160,-15 200,55 240,20 C280,-15 320,55 360,20 C400,-15 440,55 480,20 C520,-15 560,55 600,20 C640,-15 680,55 720,20 C760,-15 800,55 840,20 C880,-15 920,55 960,20 C1000,-15 1040,55 1080,20 C1120,-15 1160,55 1200,20" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
          </svg>
        </div>
      )}
      {/* header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 md:gap-6 py-6 md:py-8 text-left"
        aria-expanded={isOpen}
      >
        {/* show logo */}
        <motion.div
          className="flex-shrink-0 overflow-hidden rounded-lg bg-white/70"
          style={{ width: logoSize, height: logoSize }}
          animate={{ scale: logoScale }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={logoSrc}
            alt={index === 1 ? "Trash Talk logo" : "Three Little Pigs logo"}
            width={logoSize}
            height={logoSize}
            className="h-full w-full object-contain"
          />
        </motion.div>

        {/* show title — red when open, dark when closed */}
        <motion.span
          animate={{ color: isOpen ? "#5C1010" : "#181815" }}
          transition={{ duration: 0.3 }}
          className="flex-1 min-w-0 leading-none"
          style={{
            fontFamily: GS,
            fontSize: "clamp(2rem, 5.2vw, 3.8rem)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          {show.title}
        </motion.span>

        {/* + / × button */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 flex items-center justify-center rounded-2xl text-white font-light select-none"
          style={{
            width: 52,
            height: 52,
            background: "#5C1010",
            fontSize: 26,
            lineHeight: 1,
          }}
          aria-hidden
        >
          +
        </motion.div>
      </button>

      {/* expanded panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, delay: 0.08 },
            }}
            className="overflow-hidden"
          >
            <div className="pb-10 md:pb-14 pt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
                {/* description */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                    style={{
                      fontFamily: GS,
                      fontSize: "clamp(1.35rem, 3vw, 1.9rem)",
                      fontWeight: 600,
                      color: "#545454",
                      letterSpacing: "-0.025em",
                      lineHeight: 0.9,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {show.subtitle}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.14 }}
                    style={{
                      fontFamily: GS,
                      fontSize: "1.22rem",
                      color: "#5a6370",
                      lineHeight: 1.4,
                      textAlign: "justify",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {show.description}
                  </motion.p>
                </div>

                {/* gallery slider */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <ParallaxSliderPro images={show.gallery} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────── section ─────────────── */
export default function Shows() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const tabRefs = useRef<React.RefObject<HTMLDivElement>[]>(
    SHOWS.map(() => ({ current: null } as React.RefObject<HTMLDivElement>))
  )
  const scrollTimers = useRef<number[]>([])

  const clearScrollTimers = useCallback(() => {
    scrollTimers.current.forEach(timer => window.clearTimeout(timer))
    scrollTimers.current = []
  }, [])

  const scrollTabIntoView = useCallback((i: number, behavior: ScrollBehavior = "smooth") => {
    const el = tabRefs.current[i]?.current
    if (!el) return
    const top = Math.max(el.getBoundingClientRect().top + window.scrollY - 88, 0)
    window.scrollTo({ top, behavior })
  }, [])

  useEffect(() => clearScrollTimers, [clearScrollTimers])

  function handleToggle(i: number) {
    const isOpening = openIndex !== i
    clearScrollTimers()
    setOpenIndex(isOpening ? i : null)
    if (isOpening) {
      scrollTimers.current = [
        window.setTimeout(() => scrollTabIntoView(i, "smooth"), 90),
        window.setTimeout(() => scrollTabIntoView(i, "smooth"), 640),
      ]
    }
  }

  return (
    <section
      id="shows"
      className="relative w-full overflow-hidden"
      style={{ background: "#fff" }}
      aria-labelledby="shows-heading"
    >

      <div className="relative z-10 mx-auto px-6 pt-24 pb-24 max-w-[1260px]">
        {/* section header — left aligned */}
        <div className="flex flex-col gap-4 max-w-2xl mb-16">
          <motion.div {...blurFade(0)}>
            <span
              className="inline-flex items-center px-5 py-1.5 rounded-full text-[11px] font-semibold uppercase"
              style={{
                fontFamily: GS,
                background: "#5C1010",
                color: "#fff",
                letterSpacing: "0.16em",
              }}
            >
              Our Shows
            </span>
          </motion.div>

          <motion.h2
            {...blurFade(0.08)}
            id="shows-heading"
            className="text-balance"
            style={{
              color: "#181815",
              fontFamily: PG,
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
            }}
          >
            Musical Shows in English for All Ages
          </motion.h2>

          <motion.p
            {...blurFade(0.12)}
            style={{ fontFamily: GS, fontSize: "1rem", fontWeight: 400, color: "#545454" }}
          >
            Musical productions in English for all ages
          </motion.p>

          <motion.p
            {...blurFade(0.16)}
            className="leading-relaxed"
            style={{
              fontFamily: GS,
              fontSize: "1.22rem",
              color: "#181815",
              lineHeight: 1.4,
              textAlign: "justify",
            }}
          >
            Each show is a unique world of music, movement, and language —
            designed to make English feel natural, exciting, and unforgettable.
          </motion.p>
        </div>

        {/* accordion */}
        <motion.div {...blurFade(0.28)} className="relative">
          {/* wavy top divider */}
          <div aria-hidden className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ height: 10 }}>
            <svg viewBox="0 0 1200 40" preserveAspectRatio="none" width="100%" height="10" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,20 C40,-15 80,55 120,20 C160,-15 200,55 240,20 C280,-15 320,55 360,20 C400,-15 440,55 480,20 C520,-15 560,55 600,20 C640,-15 680,55 720,20 C760,-15 800,55 840,20 C880,-15 920,55 960,20 C1000,-15 1040,55 1080,20 C1120,-15 1160,55 1200,20" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
            </svg>
          </div>
          {SHOWS.map((show, i) => (
            <AccordionTab
              key={show.id}
              show={show}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
              isLast={i === SHOWS.length - 1}
              tabRef={tabRefs.current[i]}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
