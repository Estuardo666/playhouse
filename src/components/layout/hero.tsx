"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const HERO_TEXT =
  "Teatro educativo en inglés para inspirar, aprender y vivir experiencias inolvidables"
const revealEase = [0.22, 1, 0.36, 1] as const
const contentEase = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [introComplete, setIntroComplete] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(false)

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

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  })
  const bgParallaxY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion || isMobileViewport ? [0, 0, 0] : [0, 0, -80]
  )

  useEffect(() => {
    if (prefersReducedMotion || introComplete) return

    const lockedScrollY = window.scrollY
    const preventDefault = (event: Event) => {
      event.preventDefault()
    }
    const preventKeyboardScroll = (event: KeyboardEvent) => {
      const blockedKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]
      if (blockedKeys.includes(event.key)) {
        event.preventDefault()
      }
    }
    const resetScroll = () => {
      if (window.scrollY !== lockedScrollY) {
        window.scrollTo({ top: lockedScrollY, behavior: "auto" })
      }
    }

    window.addEventListener("wheel", preventDefault, { passive: false })
    window.addEventListener("touchmove", preventDefault, { passive: false })
    window.addEventListener("keydown", preventKeyboardScroll)
    window.addEventListener("scroll", resetScroll, { passive: true })
    resetScroll()

    return () => {
      window.removeEventListener("wheel", preventDefault)
      window.removeEventListener("touchmove", preventDefault)
      window.removeEventListener("keydown", preventKeyboardScroll)
      window.removeEventListener("scroll", resetScroll)
    }
  }, [introComplete, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) {
      setIntroComplete(true)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const heroEl = heroRef.current
    const titleEl = titleRef.current
    const pillEl = pillRef.current
    if (!heroEl || !titleEl) return

    let ctx: gsap.Context | undefined

    if (!prefersReducedMotion) {
      ctx = gsap.context(() => {
        const sharedTrigger = {
          trigger: heroEl,
          start: "top top",
          end: "+=140%",
          scrub: 1.25,
        }
        gsap.fromTo(
          titleEl,
          { scale: 1, opacity: 0.9, y: 0, filter: "blur(0px)" },
          { scale: 2.1, opacity: 0, y: -60, filter: "blur(28px)", ease: "none", scrollTrigger: sharedTrigger }
        )
        if (pillEl) {
          gsap.fromTo(
            pillEl,
            { scale: 1, opacity: 1, y: 0, filter: "blur(0px)" },
            {
              scale: 1.25,
              opacity: 0,
              y: -36,
              filter: "blur(14px)",
              ease: "none",
              scrollTrigger: { ...sharedTrigger, end: "+=95%" },
            }
          )
        }
      }, heroEl)
    }

    return () => {
      ctx?.revert()
    }
  }, [prefersReducedMotion])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero relative m-4 h-[calc(100svh-2rem)] min-h-[42rem] overflow-hidden rounded-[2rem] bg-[#181815]"
      aria-label="Portada PlayHouse"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={prefersReducedMotion ? false : { scale: 1.16, filter: "blur(12px) saturate(0.82)" }}
        animate={
          prefersReducedMotion
            ? { scale: 1, filter: "blur(0px) saturate(1)" }
            : introComplete
              ? { scale: 1, filter: "blur(0px) saturate(1)" }
              : { scale: 1.08, filter: "blur(5px) saturate(0.9)" }
        }
              transition={{ duration: 3.4, ease: revealEase }}
        style={{ y: bgParallaxY }}
      >
        <Image
          src="/media/bg hero 3.jpg"
          alt="Elenco de PlayHouse en escena teatral"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,245,228,0.18),transparent_32%),linear-gradient(180deg,rgba(24,24,21,0.08),rgba(24,24,21,0.56))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,24,21,0.32),transparent_20%,transparent_80%,rgba(24,24,21,0.3))]" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-start gap-5 px-6 pt-24 md:pb-0 md:pt-28 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22, filter: "blur(12px)" }}
          animate={
            prefersReducedMotion || introComplete
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 22, filter: "blur(12px)" }
          }
          transition={{ duration: 1.18, ease: contentEase, delay: 0.38 }}
        >
          <div
            ref={pillRef}
            className="inline-flex items-center rounded-full border border-white/25 px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white sm:text-xs"
          >
            El escenario donde el inglés cobra vida
          </div>
        </motion.div>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 38, filter: "blur(18px)" }}
          animate={
            prefersReducedMotion || introComplete
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 38, filter: "blur(18px)" }
          }
          transition={{ duration: 1.42, ease: contentEase, delay: 0.54 }}
        >
          <h1
            ref={titleRef}
            className="max-w-3xl font-bold leading-[0.95] text-white"
            style={{ fontFamily: '"Play Grotesk", "Figtree", sans-serif', letterSpacing: '-0.025em', fontSize: 'clamp(1.6rem, 4.8vw, 3.1rem)', opacity: 0.9 }}
          >
            {HERO_TEXT}
          </h1>
        </motion.div>
      </div>

      <AnimatePresence>
        {!prefersReducedMotion && !introComplete && (
          <motion.div
            key="hero-reveal"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.72, ease: [0.4, 0, 0.2, 1], delay: 0.16 } }}
            className="absolute inset-0 z-20 overflow-hidden rounded-[inherit] bg-[#f6f0e8]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.75),transparent_42%),linear-gradient(180deg,#fbf7f1_0%,#f1e7db_100%)]" />
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 bg-[#f6f0e8]"
              initial={{ scaleX: 1, opacity: 1 }}
              animate={{ scaleX: 0, opacity: 0.94 }}
              transition={{ duration: 2.65, ease: revealEase, delay: 0.14 }}
              style={{ originX: 0 }}
            />
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 bg-[#f6f0e8]"
              initial={{ scaleX: 1, opacity: 1 }}
              animate={{ scaleX: 0, opacity: 0.94 }}
              transition={{ duration: 2.65, ease: revealEase, delay: 0.14 }}
              style={{ originX: 1 }}
            />
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-[inherit]"
              initial={{ clipPath: "inset(0 50% 0 50% round 2rem)", scale: 1.2 }}
              animate={{ clipPath: "inset(0 0% 0 0% round 2rem)", scale: 1 }}
              transition={{ duration: 3.05, ease: revealEase, delay: 0.06 }}
              onAnimationComplete={() => setIntroComplete(true)}
            >
              <Image
                src="/media/bg hero 3.jpg"
                alt=""
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.24),transparent_30%),linear-gradient(180deg,rgba(24,24,21,0.04),rgba(24,24,21,0.22))]" />
            </motion.div>
            <motion.div
              className="absolute left-1/2 top-1/2 h-[72vh] w-px bg-[linear-gradient(180deg,transparent,rgba(92,16,16,0.22),transparent)]"
              initial={{ opacity: 0.9, scaleY: 0.2, x: "-50%", y: "-50%" }}
              animate={{ opacity: 0, scaleY: 1.1 }}
              transition={{ duration: 1.9, ease: revealEase, delay: 0.08 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
