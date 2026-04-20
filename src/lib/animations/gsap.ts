"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { safeQuerySelector, sleep } from "@/lib/utils"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export interface HeroTimelineProps {
  curtainEl?: string
  spotlightEl?: string
  titleEl?: string
  subtitleEl?: string
  ctaEl?: string
}

/**
 * Hero cinematic opening sequence - theatrical curtain → spotlight → reveal
 */
export async function heroTimeline({
  curtainEl = ".curtain",
  spotlightEl = ".spotlight",
  titleEl = ".hero-title",
  subtitleEl = ".hero-subtitle", 
  ctaEl = ".hero-cta",
}: HeroTimelineProps) {
  const curtain = safeQuerySelector(curtainEl)
  const spotlight = safeQuerySelector(spotlightEl)
  const title = safeQuerySelector(titleEl)
  const subtitle = safeQuerySelector(subtitleEl)
  const cta = safeQuerySelector(ctaEl)

  if (!curtain || !title) return

  // 1. Curtain rise (2s)
  gsap.set(curtain, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" })
  gsap.to(curtain, {
    clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
    duration: 2,
    ease: "power3.inOut",
  })

  // 2. Spotlight glow (1s delay, 1.5s duration)
  await sleep(2000)
  if (spotlight) {
    gsap.fromTo(spotlight, 
      { 
        scale: 0.8, 
        opacity: 0,
        boxShadow: "0 0 0px rgba(212, 175, 55, 0)"
      },
      {
        scale: 1,
        opacity: 1,
        boxShadow: "0 0 60px rgba(212, 175, 55, 0.6), 0 0 100px rgba(212, 175, 55, 0.4)",
        duration: 1.5,
        ease: "power2.out",
      }
    )
  }

  // 3. Title spotlight reveal (staggered)
  await sleep(500)
  gsap.fromTo(title,
    { y: 100, opacity: 0, scale: 0.8 },
    { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
    }
  )

  // 4. Subtitle fade up
  await sleep(300)
  if (subtitle) {
    gsap.fromTo(subtitle,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }
    )
  }

  // 5. CTA bounce in
  await sleep(200)
  if (cta) {
    gsap.fromTo(cta,
      { y: 30, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }
    )
  }
}

/**
 * Parallax stage background
 */
export function stageParallax() {
  gsap.to(".stage-bg", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  })
}

/**
 * Section stagger reveal on scroll
 */
export function sectionStagger(selector: string) {
  gsap.utils.toArray(selector).forEach((section: any) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power2.out",
    })
  })
}
