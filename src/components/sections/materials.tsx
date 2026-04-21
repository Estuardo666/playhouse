"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MATERIALS, type MaterialItem } from "@/content/playhouse/materials"

const PG = '"Play Grotesk", "Google Sans", sans-serif'
const GS = '"Google Sans", "Inter", sans-serif'
const STORAGE_KEY = "ph_materials_unlocked"
const FORM_URL = "https://forms.gle/ePJY7c7sok2NaBWBA"

const blurFade = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay },
})

/* ── Download icon ─────────────────────────────────────────── */
function DownloadIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v13m0 0l-4-4m4 4l4-4M5 20h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── Individual material card ──────────────────────────────── */
function MaterialCard({ item }: { item: MaterialItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-[2rem] bg-[#f5f3f0]"
    >
      {/* Header — logo + title */}
      <div className="flex flex-col items-center gap-3 px-8 py-10">
        <div className="relative h-20 w-40">
          <Image
            src={item.logo}
            alt={`${item.title} logo`}
            fill
            className="object-contain"
            sizes="160px"
          />
        </div>
        <h3
          style={{
            fontFamily: PG,
            fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#181815",
          }}
        >
          {item.title}
        </h3>
      </div>

      {/* Resources row */}
      <div className="grid grid-cols-1 gap-8 px-8 pb-10 sm:grid-cols-2">
        {/* Activity Kit */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p style={{ fontFamily: GS, fontSize: "0.92rem", color: "#545454", fontWeight: 500 }}>
            Activity Kit:
          </p>
          <a
            href={item.activityKitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#5C1010] px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-80"
            style={{ fontFamily: GS }}
          >
            <DownloadIcon />
            Download
          </a>
        </div>

        {/* YouTube links */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p style={{ fontFamily: GS, fontSize: "0.92rem", color: "#545454", fontWeight: 500 }}>
            Youtube:
          </p>
          <ul className="space-y-1">
            {item.youtubeLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline transition-opacity hover:opacity-70"
                  style={{ fontFamily: GS, color: "#5C1010" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-b-[2rem] bg-[#ece9e6] px-6 py-4">
        <p style={{ fontFamily: GS, fontSize: "0.9rem", color: "#545454" }}>
          <span style={{ fontWeight: 700, color: "#181815" }}>For further inquiries,</span>{" "}
          please contact us through:
        </p>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-[#181815] px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-80"
          style={{ fontFamily: GS, whiteSpace: "nowrap" }}
        >
          Contact Form
        </a>
      </div>
    </motion.div>
  )
}

/* ── Email gate form ───────────────────────────────────────── */
function UnlockForm({ onUnlock }: { onUnlock: () => void }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  function validate(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate(email)) {
      setError("Please enter a valid email address.")
      inputRef.current?.focus()
      return
    }
    setError("")
    localStorage.setItem(STORAGE_KEY, "1")
    onUnlock()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="rounded-[1.6rem] bg-[#f5f3f0] p-6 md:p-8">
        <p
          style={{ fontFamily: PG, fontWeight: 700, fontSize: "clamp(1.5rem,2.6vw,2rem)", color: "#181815", lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          Subscribe to unlock
        </p>
        <p
          style={{ fontFamily: GS, fontWeight: 400, fontSize: "1rem", color: "#545454", marginTop: "0.35rem" }}
        >
          Activity kits, songs &amp; classroom videos — free.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            ref={inputRef}
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError("") }}
            aria-label="Email address"
            aria-invalid={!!error}
            aria-describedby={error ? "unlock-error" : undefined}
            className="min-w-0 flex-1 rounded-full border border-black/15 bg-white px-6 py-3.5 text-base outline-none ring-[#5C1010] focus:ring-2"
            style={{ fontFamily: GS }}
          />
          <button
            type="submit"
            className="rounded-full bg-[#5C1010] px-8 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C1010]"
            style={{ fontFamily: GS }}
          >
            Unlock Resources
          </button>
        </div>

        {error && (
          <p id="unlock-error" role="alert" style={{ fontFamily: GS, fontSize: "0.82rem", color: "#5C1010", marginTop: "0.5rem" }}>
            {error}
          </p>
        )}
      </div>
    </form>
  )
}

/* ── Section ───────────────────────────────────────────────── */
export default function Materials() {
  const [unlocked, setUnlocked] = useState(false)
  const materialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true)
  }, [])

  useEffect(() => {
    if (!unlocked) return
    const timer = setTimeout(() => {
      const el = materialsRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: "smooth" })
    }, 380)
    return () => clearTimeout(timer)
  }, [unlocked])

  return (
    <section
      id="materials"
      aria-labelledby="materials-heading"
      className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28"
    >
      {/* ── Intro row ── */}
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
        {/* Left: text + form */}
        <div className="flex flex-col gap-5">
          <motion.div {...blurFade(0)}>
            <span
              className="inline-flex items-center rounded-full px-5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em]"
              style={{ fontFamily: GS, background: "#5C1010", color: "#fff" }}
            >
              Resources
            </span>
          </motion.div>

          <motion.h2
            {...blurFade(0.07)}
            id="materials-heading"
            style={{
              fontFamily: PG,
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
              color: "#181815",
            }}
          >
            Teaching<br />Materials
          </motion.h2>

          <motion.p
            {...blurFade(0.12)}
            style={{
              fontFamily: GS,
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "#282830",
              lineHeight: 1.55,
            }}
          >
            In this section you will find the materials you need to prepare your students for our
            shows. You will find an{" "}
            <strong>Activity Kit</strong> (which includes activities for before and after the show).
            Additionally, you will find the <strong>videos and songs</strong> to work with during
            your lessons.
          </motion.p>

          <motion.div {...blurFade(0.17)}>
            {unlocked ? (
              <p
                className="inline-flex items-center gap-2 rounded-full bg-[#f5f3f0] px-5 py-2.5 text-sm font-semibold"
                style={{ fontFamily: GS, color: "#5C1010" }}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="#5C1010" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Resources unlocked
              </p>
            ) : (
              <UnlockForm onUnlock={() => setUnlocked(true)} />
            )}
          </motion.div>
        </div>

        {/* Right: image */}
        <motion.div
          {...blurFade(0.1)}
          className="relative h-[420px] overflow-hidden rounded-[2rem] md:h-[520px]"
        >
          <Image
            src="/media/test/3editada-265.jpg"
            alt="PlayHouse theatre workshop performance"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            priority={false}
          />
        </motion.div>
      </div>

      {/* ── Unlocked materials ── */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            ref={materialsRef}
            initial={{ opacity: 0, y: 36, scale: 0.97, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 16, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            className="mt-14 space-y-8"
          >
            {MATERIALS.map((item) => (
              <MaterialCard key={item.id} item={item} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
