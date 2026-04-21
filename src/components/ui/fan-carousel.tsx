"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

/* ─────────────── types ─────────────── */

export type FanCarouselItem = {
  id: string
  image: string
  tag: string
  secondaryTag?: string
  title: string
}

type FanCarouselProps = {
  items: FanCarouselItem[]
  autoplay?: boolean
  autoplayInterval?: number
}

/* ─────────────── constants ─────────────── */

const CARD_W = 350
const CARD_H = 475

const SPRING = {
  type: "spring" as const,
  stiffness: 255,
  damping: 30,
  mass: 0.85,
}

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const

/**
 * Slot ±3 = hidden (opacity 0, blur). Cards animate through this state
 * giving a natural fade-in-blur when entering from the edge.
 */
const SLOT = {
  "-3": { x: -700, scale: 0.48, rotateY:  46, z: -420, opacity: 0,    filter: "blur(22px)" },
  "-2": { x: -525, scale: 0.62, rotateY:  38, z: -260, opacity: 0.28, filter: "blur(0px)"  },
  "-1": { x: -288, scale: 0.80, rotateY:  20, z: -120, opacity: 0.62, filter: "blur(0px)"  },
   "0": { x:    0, scale: 1.00, rotateY:   0, z:    0, opacity: 1.00, filter: "blur(0px)"  },
   "1": { x:  288, scale: 0.80, rotateY: -20, z: -120, opacity: 0.62, filter: "blur(0px)"  },
   "2": { x:  525, scale: 0.62, rotateY: -38, z: -260, opacity: 0.28, filter: "blur(0px)"  },
   "3": { x:  700, scale: 0.48, rotateY: -46, z: -420, opacity: 0,    filter: "blur(22px)" },
} as const

/* ─────────────── helpers ─────────────── */

function modIndex(value: number, total: number) {
  return ((value % total) + total) % total
}

function getSlot(offset: number) {
  const key = String(Math.max(-3, Math.min(3, offset))) as keyof typeof SLOT
  return SLOT[key]
}

/* ─────────────── NavArrow ─────────────── */

function NavArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next"
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className="relative w-12 h-12 rounded-full flex items-center justify-center
                 transition-all duration-200 active:scale-95
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C1010]/60
                 hover:brightness-125"
      style={{
        background: "rgba(92,16,16,0.52)",
        border: "1.5px solid rgba(140,45,45,0.50)",
        backdropFilter: "blur(14px)",
      }}
    >
      <svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        className={direction === "prev" ? "" : "rotate-180"}
        aria-hidden="true"
      >
        <path
          d="M11 4L6 9L11 14"
          stroke="white"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

/* ─────────────── FanCard ─────────────── */

function FanCard({
  item,
  offset,
  total,
  onClickSide,
}: {
  item: FanCarouselItem
  offset: number
  total: number
  onClickSide: (offset: number) => void
}) {
  const isActive = offset === 0
  const isClickable = Math.abs(offset) <= 2 && !isActive
  const slot = getSlot(offset)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!isActive) setHovered(false)
  }, [isActive])

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        x: slot.x,
        scale: slot.scale,
        rotateY: slot.rotateY,
        z: slot.z,
        opacity: slot.opacity,
        filter: slot.filter,
      }}
      transition={SPRING}
      className="absolute select-none"
      style={{
        width: CARD_W,
        height: CARD_H,
        left: "50%",
        top: 0,
        marginLeft: -(CARD_W / 2),
        borderRadius: 32,
        overflow: "hidden",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter",
        zIndex: total - Math.abs(offset),
        cursor: isClickable ? "pointer" : "default",
        pointerEvents: Math.abs(offset) <= 2 ? "auto" : "none",
      }}
      onClick={() => {
        if (isClickable) onClickSide(offset)
      }}
      onMouseEnter={() => { if (isActive) setHovered(true) }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* photo with hover zoom on active */}
      <div
        className="absolute inset-0"
        style={{
          transform: isActive && hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={`${CARD_W}px`}
          className="object-cover object-top"
          priority={isActive}
          draggable={false}
        />
      </div>

      {/* gradient overlay — fades in/out with active state */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(18,6,6,0.72) 68%, rgba(18,6,6,0.96) 100%)",
        }}
      />

      {/* text content — active card only, fade in up */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            transition={{ duration: 0.42, ease: EASE_OUT, delay: 0.08 }}
            className="absolute inset-x-0 bottom-0 px-6 pb-10 pt-6 flex flex-col gap-2"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className="text-[13px] font-semibold tracking-[0.14em] uppercase"
                style={{
                  fontFamily: '"Google Sans", sans-serif',
                  color: "rgba(235,185,185,0.88)",
                }}
              >
                {item.tag}
              </span>
              {item.secondaryTag && (
                <span
                  className="text-[12px] font-medium tracking-[0.12em] uppercase"
                  style={{
                    fontFamily: '"Google Sans", sans-serif',
                    color: "rgba(210,148,148,0.62)",
                  }}
                >
                  {item.secondaryTag}
                </span>
              )}
            </div>
            <p
              className="text-white font-bold leading-tight"
              style={{
                fontFamily: '"Play Grotesk", "Google Sans", sans-serif',
                fontSize: 30,
                letterSpacing: "-0.02em",
              }}
            >
              {item.title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* active rim glow */}
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: 32,
            boxShadow:
              "inset 0 0 0 1.5px rgba(255,255,255,0.13), 0 32px 72px rgba(92,16,16,0.48)",
          }}
        />
      )}
    </motion.div>
  )
}

/* ─────────────── FanCarousel ─────────────── */

export default function FanCarousel({
  items,
  autoplay = true,
  autoplayInterval = 4000,
}: FanCarouselProps) {
  const total = items.length
  const [active, setActive] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startTsRef = useRef<number | null>(null)
  const pausedRef = useRef(false)

  const dragStartX = useRef<number | null>(null)

  const goTo = useCallback(
    (index: number) => {
      setActive(modIndex(index, total))
      startTsRef.current = null
    },
    [total]
  )

  const prev = useCallback(() => goTo(active - 1), [active, goTo])
  const next = useCallback(() => goTo(active + 1), [active, goTo])

  // autoplay loop
  useEffect(() => {
    if (!autoplay) return

    const tick = (ts: number) => {
      if (pausedRef.current) {
        startTsRef.current = null
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      if (startTsRef.current === null) startTsRef.current = ts
      if (ts - startTsRef.current >= autoplayInterval) {
        setActive((a) => modIndex(a + 1, total))
        startTsRef.current = null
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [autoplay, autoplayInterval, total])

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") prev()
      if (e.code === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
    pausedRef.current = true
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
    dragStartX.current = null
    pausedRef.current = false
  }

  const handlePointerLeave = () => {
    dragStartX.current = null
    pausedRef.current = false
  }

  return (
    <div
      className="flex flex-col items-center gap-4 select-none"
      aria-label="Team carousel"
    >
      {/* stage */}
      <div
        className="relative w-full"
        style={{
          height: CARD_H + 28,
          perspective: "1400px",
          perspectiveOrigin: "50% 50%",
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        {items.map((item, i) => {
          const offset = modIndex(i - active, total)
          const signedOffset = offset > total / 2 ? offset - total : offset
          return (
            <FanCard
              key={item.id}
              item={item}
              offset={signedOffset}
              total={total}
              onClickSide={(off) => goTo(active + off)}
            />
          )
        })}
      </div>

      {/* nav row: arrows + dots */}
      <div className="flex items-center gap-5">
        <NavArrow direction="prev" onClick={prev} />

        <div className="flex items-center gap-2.5" role="tablist" aria-label="Slides">
          {items.map((item, i) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={i === active}
              aria-label={item.title}
              onClick={() => goTo(i)}
              className="flex items-center justify-center
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-[#5C1010]/50 rounded-full"
            >
              <motion.div
                animate={{
                  width: i === active ? 22 : 6,
                  opacity: i === active ? 1 : 0.28,
                  backgroundColor: i === active ? "#7A1515" : "rgba(255,255,255,0.7)",
                }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="h-[6px] rounded-full"
              />
            </button>
          ))}
        </div>

        <NavArrow direction="next" onClick={next} />
      </div>

      {/* slide counter */}
      <p
        className="text-[11px] tracking-[0.18em]"
        style={{
          fontFamily: '"Google Sans", sans-serif',
          color: "rgba(255,255,255,0.3)",
        }}
        aria-live="polite"
      >
        {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
    </div>
  )
}
