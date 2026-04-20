"use client"

import { useCallback, useEffect, useMemo, useRef } from "react"

type SexyScrollProps = {
  enabled?: boolean
  smoothTime?: number
  maxSpeed?: number
  keyboardLines?: number
  pageJumpRatio?: number
  touchEnabled?: boolean
  clampToDocument?: boolean
  respectReducedMotion?: boolean
}

const EPSILON = 0.0001

function smoothDamp(
  current: number,
  target: number,
  currentVelocity: number,
  smoothTime: number,
  maxSpeed: number,
  deltaTime: number
): [number, number] {
  const safeSmoothTime = Math.max(EPSILON, smoothTime)
  const maxChange = maxSpeed * safeSmoothTime

  let nextTarget = target
  const delta = target - current
  if (Math.abs(delta) > maxChange) {
    nextTarget = current + Math.sign(delta) * maxChange
  }

  const omega = 2 / safeSmoothTime
  const x = omega * deltaTime
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)

  const change = current - nextTarget
  const temp = (currentVelocity + omega * change) * deltaTime
  let newVelocity = (currentVelocity - omega * temp) * exp
  let newValue = nextTarget + (change + temp) * exp

  const originalToCurrent = target - current
  const newToOriginal = newValue - target
  if ((originalToCurrent > 0) === (newToOriginal > 0)) {
    newValue = target
    newVelocity = 0
  }

  return [newValue, newVelocity]
}

export default function SexyScroll({
  enabled = true,
  smoothTime = 0.6,
  maxSpeed = 4500,
  keyboardLines = 1,
  pageJumpRatio = 0.9,
  touchEnabled = false,
  clampToDocument = true,
  respectReducedMotion = true,
}: SexyScrollProps) {
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false
    }

    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    } catch {
      return false
    }
  }, [])

  const active = enabled && !(respectReducedMotion && reducedMotion)

  const yRef = useRef(0)
  const velocityRef = useRef(0)
  const targetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)

  const getMaxScrollY = useCallback(() => {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  }, [])

  const setScrollY = useCallback((y: number) => {
    window.scrollTo({ top: y, left: 0, behavior: "auto" })
  }, [])

  const clampY = useCallback(
    (y: number) => {
      if (!clampToDocument) return y
      const maxY = getMaxScrollY()
      return Math.min(Math.max(0, y), maxY)
    },
    [clampToDocument, getMaxScrollY]
  )

  const cancelLoop = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    lastTsRef.current = null
  }, [])

  const loop = useCallback(
    (timestamp: number) => {
      if (lastTsRef.current === null) {
        lastTsRef.current = timestamp
      }

      const dt = Math.max(0.001, Math.min(0.033, (timestamp - lastTsRef.current) / 1000))
      lastTsRef.current = timestamp

      const current = yRef.current
      const target = clampY(targetRef.current)
      const [nextY, nextVelocity] = smoothDamp(current, target, velocityRef.current, smoothTime, maxSpeed, dt)

      yRef.current = nextY
      velocityRef.current = nextVelocity
      setScrollY(nextY)

      const arrived = Math.abs(nextY - target) < 0.2 && Math.abs(nextVelocity) < 2
      if (arrived) {
        yRef.current = target
        velocityRef.current = 0
        setScrollY(target)
        cancelLoop()
        return
      }

      rafRef.current = window.requestAnimationFrame(loop)
    },
    [cancelLoop, clampY, maxSpeed, setScrollY, smoothTime]
  )

  const ensureLoop = useCallback(() => {
    if (rafRef.current !== null) return

    yRef.current = window.scrollY
    rafRef.current = window.requestAnimationFrame(loop)
  }, [loop])

  const nudge = useCallback(
    (deltaY: number) => {
      targetRef.current = clampY(targetRef.current + deltaY)
      ensureLoop()
    },
    [clampY, ensureLoop]
  )

  useEffect(() => {
    yRef.current = window.scrollY
    targetRef.current = window.scrollY
    velocityRef.current = 0

    if (!active) {
      cancelLoop()
    }

    return () => cancelLoop()
  }, [active, cancelLoop])

  useEffect(() => {
    if (!active) return

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return

      if (getMaxScrollY() <= 0) return

      event.preventDefault()
      const factor = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
      nudge(event.deltaY * factor)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", onWheel)
      cancelLoop()
    }
  }, [active, cancelLoop, getMaxScrollY, nudge])

  useEffect(() => {
    if (!active) return

    const root = document.documentElement
    const body = document.body
    const prevRootBehavior = root.style.scrollBehavior
    const prevBodyBehavior = body.style.scrollBehavior

    root.style.scrollBehavior = "auto"
    body.style.scrollBehavior = "auto"

    return () => {
      root.style.scrollBehavior = prevRootBehavior
      body.style.scrollBehavior = prevBodyBehavior
    }
  }, [active])

  useEffect(() => {
    if (!active) return

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return
      }

      const lineStep = 48 * keyboardLines
      const pageStep = window.innerHeight * pageJumpRatio

      switch (event.code) {
        case "ArrowDown":
          event.preventDefault()
          nudge(lineStep)
          break
        case "ArrowUp":
          event.preventDefault()
          nudge(-lineStep)
          break
        case "PageDown":
          event.preventDefault()
          nudge(pageStep)
          break
        case "PageUp":
          event.preventDefault()
          nudge(-pageStep)
          break
        case "Space":
          event.preventDefault()
          nudge(pageStep)
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", onKeyDown, { passive: false })
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active, keyboardLines, nudge, pageJumpRatio])

  useEffect(() => {
    if (!active || !touchEnabled) return

    let lastY = 0
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) return

      const y = event.touches[0].clientY
      const deltaY = lastY ? lastY - y : 0
      lastY = y

      if (Math.abs(deltaY) > 0) {
        event.preventDefault()
        nudge(deltaY)
      }
    }

    const onTouchEnd = () => {
      lastY = 0
    }

    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [active, nudge, touchEnabled])

  useEffect(() => {
    if (!active) return

    const syncScrollState = () => {
      if (rafRef.current !== null) return
      yRef.current = window.scrollY
      targetRef.current = window.scrollY
    }

    window.addEventListener("scroll", syncScrollState, { passive: true })
    return () => window.removeEventListener("scroll", syncScrollState)
  }, [active])

  return null
}