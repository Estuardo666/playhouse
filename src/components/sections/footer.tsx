"use client"

import Image from "next/image"
import { motion } from "framer-motion"

/* ─────────────── tokens ─────────────── */
const GS = '"Figtree", "Inter", sans-serif'

const blurFade = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
})

/* ─────────────── data ─────────────── */
const SOCIALS = [
  { label: "Instagram", handle: "@playhouse.ec", href: "https://www.instagram.com/vaplayhouse/" },
  { label: "Facebook", handle: "playhousec", href: "https://www.facebook.com/playhousec" },
  { label: "TikTok", handle: "@playhouse.ec", href: "https://www.tiktok.com/@playhouse.ec" },
  { label: "YouTube", handle: "@playhouse_ec", href: "https://www.youtube.com/@playhouse_ec" },
]

/* ─────────────── component ─────────────── */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{ background: "#181815" }}
      className="relative w-full"
      id="footer"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 pt-20 pb-12">

        {/* ── two-column layout ── */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-24">

          {/* ═══ LEFT column ═══ */}
          <div className="flex flex-col">
            {/* top divider */}
            <div className="h-px w-full bg-white/10 mb-8" />

            {/* tagline */}
            <motion.p
              {...blurFade(0)}
              className="text-[1.1rem] leading-[1.55] mb-10"
              style={{ fontFamily: GS, color: "rgba(255,255,255,0.45)" }}
            >
              Immersive educational theatre<br />
              that inspires and transforms.
            </motion.p>

            {/* large logo */}
            <motion.div {...blurFade(0.06)} className="mb-10">
              <Image
                src="/media/logo para fondo oscuro.png"
                alt="PlayHouse"
                width={340}
                height={90}
                className="h-auto w-full max-w-[340px]"
              />
            </motion.div>

            {/* description */}
            <motion.div {...blurFade(0.12)} className="mb-8">
              <p
                className="text-[0.92rem] leading-[1.65] max-w-xs"
                style={{ fontFamily: GS, color: "rgba(255,255,255,0.38)" }}
              >
                A pioneering project in educational theatre in English that combines art, music, and pedagogy.
              </p>
            </motion.div>

            {/* copyright */}
            <motion.p
              {...blurFade(0.16)}
              className="text-[0.82rem] mb-10"
              style={{ fontFamily: GS, color: "rgba(255,255,255,0.22)" }}
            >
              © {year} PlayHouse — All rights reserved.
            </motion.p>

            {/* bottom divider */}
            <div className="h-px w-full bg-white/10 mb-6" />

            {/* socials row */}
            <motion.div {...blurFade(0.2)} className="flex flex-wrap gap-x-5 gap-y-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.82rem] font-medium transition-colors hover:text-white/80"
                  style={{ fontFamily: GS, color: "rgba(255,255,255,0.32)" }}
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ═══ RIGHT column ═══ */}
          <div className="flex flex-col">

            {/* FOLLOW US + ONLINE sub-row */}
            <div className="grid grid-cols-2 gap-8 mb-12">

              {/* Follow Us */}
              <div>
                <motion.div {...blurFade(0.06)} className="flex flex-col gap-3 mb-6">
                  <span
                    className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase"
                    style={{ fontFamily: GS, color: "rgba(255,255,255,0.28)" }}
                  >
                    Follow Us
                  </span>
                  <div className="h-px w-full bg-white/10" />
                </motion.div>
                <ul className="flex flex-col gap-3">
                  {SOCIALS.map((s, i) => (
                    <motion.li key={s.label} {...blurFade(0.1 + i * 0.04)}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[1rem] transition-colors hover:text-white"
                        style={{ fontFamily: GS, color: "rgba(255,255,255,0.62)" }}
                      >
                        {s.handle}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Online / Email */}
              <div>
                <motion.div {...blurFade(0.08)} className="flex flex-col gap-3 mb-6">
                  <span
                    className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase"
                    style={{ fontFamily: GS, color: "rgba(255,255,255,0.28)" }}
                  >
                    Online
                  </span>
                  <div className="h-px w-full bg-white/10" />
                </motion.div>
                <motion.div {...blurFade(0.14)}>
                  <a
                    href="mailto:vaplayhouse@gmail.com"
                    className="text-[1rem] font-medium transition-colors hover:text-[#c24040]"
                    style={{ fontFamily: GS, color: "#9E3030" }}
                  >
                    vaplayhouse@gmail.com
                  </a>
                </motion.div>
              </div>
            </div>

            {/* PHONE row */}
            <motion.div {...blurFade(0.12)} className="flex flex-col gap-3 mb-8">
              <span
                className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase"
                style={{ fontFamily: GS, color: "rgba(255,255,255,0.28)" }}
              >
                Phone
              </span>
              <div className="h-px w-full bg-white/10" />
            </motion.div>

            <div className="flex items-center justify-between">
              <motion.a
                {...blurFade(0.18)}
                href="tel:+593939576825"
                className="text-[clamp(2rem,4.5vw,3.2rem)] font-light leading-none tracking-tight transition-colors hover:text-white"
                style={{ fontFamily: GS, color: "rgba(255,255,255,0.82)" }}
              >
                0939 576 825
              </motion.a>

              {/* scroll to top arrow */}
              <motion.button
                {...blurFade(0.22)}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll to top"
                className="flex items-center justify-center transition-opacity hover:opacity-70"
                style={{ width: 48, height: 48 }}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" stroke="#9E3030" strokeWidth="2" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── final divider ── */}
        <div className="h-px w-full bg-white/10 mt-12" />
      </div>
    </footer>
  )
}
