"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useAnimationFrame } from "framer-motion"

/* ─────────────── types ─────────────── */

export type WaveCarouselItem = {
  id: string
  image: string
  title: string
  tag: string
  secondaryTag?: string
}

type WaveCarouselProps = {
  items: WaveCarouselItem[]
  cardWidth?: number
  cardHeight?: number
  gap?: number
  /** px / second */
  speed?: number
  /** vertical sine amplitude in px */
  amplitude?: number
}

/* ─────────────── constants ─────────────── */

const PG = '"Play Grotesk", "Figtree", sans-serif'
const GS = '"Figtree", "Inter", sans-serif'

/* ─────────────── component ─────────────── */

export default function WaveCarousel({
  items,
  cardWidth = 280,
  cardHeight = 400,
  gap = 36,
  speed = 90,
  amplitude = 42,
}: WaveCarouselProps) {
  const ITEM_W = cardWidth + gap
  const totalWidth = items.length * ITEM_W

  /** 3 copies → seamless infinite loop */
  const triple = [...items, ...items, ...items]

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const scrollRef = useRef(0)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScroll = useRef(0)

  /* ─── animation loop ─── */
  useAnimationFrame((_, delta) => {
    if (!isDragging.current) {
      scrollRef.current -= (speed * delta) / 1000
      // seamless wrap
      if (scrollRef.current <= -totalWidth) scrollRef.current += totalWidth
      if (scrollRef.current > 0) scrollRef.current -= totalWidth
    }

    const track = trackRef.current
    if (!track) return

    // horizontal scroll
    track.style.transform = `translateX(${scrollRef.current}px)`

    // wave Y per card — computed from viewport X position
    const vw = window.innerWidth
    cardRefs.current.forEach((wrapper, i) => {
      if (!wrapper) return
      const cardCenterX = scrollRef.current + i * ITEM_W + cardWidth / 2
      // normalise to 0–2π across one viewport width — *2.5 = more cycles = faster bounce
      const phase = (cardCenterX / vw) * Math.PI * 2 * 2.5
      const y = amplitude * Math.sin(phase)
      // tilt follows wave slope
      const tilt = 5 * Math.cos(phase)
      wrapper.style.transform = `translateY(${y}px) rotateZ(${tilt}deg)`
    })
  })

  /* ─── pointer handlers ─── */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true
    dragStartX.current = e.clientX
    dragStartScroll.current = scrollRef.current
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - dragStartX.current
    let next = dragStartScroll.current + dx
    if (next > 0) next -= totalWidth
    if (next < -totalWidth * 2) next += totalWidth
    scrollRef.current = next
  }

  const onPointerUp = () => {
    isDragging.current = false
  }

  /* ─── render ─── */
  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        /* +30 for hover lift headroom */
        height: cardHeight + amplitude * 2 + 48 + 30,
        overflowX: "clip",
        overflowY: "visible",
        position: "relative",
        cursor: "grab",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* left fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: "linear-gradient(to right, #181815 0%, transparent 100%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
      {/* right fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: "linear-gradient(to left, #181815 0%, transparent 100%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* scrolling track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: amplitude,
          left: 0,
          gap: gap,
          willChange: "transform",
          userSelect: "none",
        }}
      >
        {triple.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            style={{
              width: cardWidth,
              flexShrink: 0,
              willChange: "transform",
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 22 },
              }}
              style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: 36,
                overflow: "hidden",
                position: "relative",
                boxShadow: "none",
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes={`${cardWidth}px`}
                className="object-cover object-top"
                draggable={false}
              />

              {/* card gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 48%, rgba(14,4,4,0.88) 100%)",
                }}
              />

              {/* name + role */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "18px 20px 22px",
                }}
              >
                {item.secondaryTag && (
                  <p
                    style={{
                      color: "rgba(220,160,160,0.65)",
                      fontSize: 12,
                      fontFamily: GS,
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    {item.secondaryTag}
                  </p>
                )}
                <p
                  style={{
                    color: "rgba(230,175,175,0.72)",
                    fontSize: 13,
                    fontFamily: GS,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {item.tag}
                </p>
                <p
                  style={{
                    color: "#fff",
                    fontSize: 26,
                    fontFamily: GS,
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
