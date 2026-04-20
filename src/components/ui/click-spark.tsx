"use client"

import { useCallback, useEffect, useRef } from "react"

type EasingMode = "linear" | "ease-in" | "ease-out" | "ease-in-out"

type Spark = {
  x: number
  y: number
  angle: number
  startTime: number
}

interface ClickSparkProps {
  sparkColor?: string
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  duration?: number
  easing?: EasingMode
  extraScale?: number
  zIndex?: number
}

export default function ClickSpark({
  sparkColor = "#5C1010",
  sparkSize = 11,
  sparkRadius = 22,
  sparkCount = 9,
  duration = 420,
  easing = "ease-out",
  extraScale = 1,
  zIndex = 81,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sparksRef = useRef<Spark[]>([])
  const reduceMotionRef = useRef(false)
  const cursorTipRef = useRef<{ x: number; y: number } | null>(null)
  const interactiveSelector =
    'a, button, [role="button"], input[type="submit"], input[type="button"], .clickable, [data-clickable], label[for]'

  useEffect(() => {
    const handleCursorTip = (event: Event) => {
      const customEvent = event as CustomEvent<{ x: number; y: number }>
      cursorTipRef.current = customEvent.detail
    }

    window.addEventListener("playhouse:cursor-tip", handleCursorTip)
    return () => {
      window.removeEventListener("playhouse:cursor-tip", handleCursorTip)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    reduceMotionRef.current = media.matches

    const update = () => {
      reduceMotionRef.current = media.matches
    }

    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let resizeTimeout: ReturnType<typeof setTimeout> | undefined

    const resizeCanvas = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window
      const dpr = Math.max(1, Math.floor(devicePixelRatio || 1))
      const nextW = Math.max(1, Math.floor(innerWidth * dpr))
      const nextH = Math.max(1, Math.floor(innerHeight * dpr))

      if (canvas.width === nextW && canvas.height === nextH) return

      canvas.width = nextW
      canvas.height = nextH
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
    }

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }

    resizeCanvas()

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimeout) clearTimeout(resizeTimeout)
    }
  }, [])

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t
        case "ease-in":
          return t * t
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        default:
          return t * (2 - t)
      }
    },
    [easing]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0

    const draw = (timestamp: number) => {
      const { width: cssW, height: cssH } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, cssW, cssH)

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime
        if (elapsed >= duration) return false

        const progress = elapsed / duration
        const eased = easeFunc(progress)
        const distance = eased * sparkRadius * extraScale
        const lineLength = sparkSize * (1 - eased)

        const x1 = spark.x + distance * Math.cos(spark.angle)
        const y1 = spark.y + distance * Math.sin(spark.angle)
        const x2 =
          spark.x + (distance + lineLength) * Math.cos(spark.angle)
        const y2 =
          spark.y + (distance + lineLength) * Math.sin(spark.angle)

        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        return true
      })

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (reduceMotionRef.current) return

      const target = event.target as HTMLElement | null
      const clickedInteractive = !!target?.closest?.(interactiveSelector)

      const point =
        event.pointerType === "mouse" && cursorTipRef.current && !clickedInteractive
          ? cursorTipRef.current
          : { x: event.clientX, y: event.clientY }

      const now = performance.now()
      const newSparks = Array.from({ length: sparkCount }, (_, index) => ({
        x: point.x,
        y: point.y,
        angle: (2 * Math.PI * index) / sparkCount,
        startTime: now,
      }))

      sparksRef.current.push(...newSparks)
    }

    window.addEventListener("pointerdown", handlePointerDown)
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [sparkCount])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex }}
    />
  )
}