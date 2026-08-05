"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MATERIALS, type MaterialItem } from "@/content/playhouse/materials"
import type { Dict } from "@/lib/i18n"
import type { SupportedLocale } from "@/content/config"

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
function MaterialCard({ item, dict }: { item: MaterialItem; dict: Dict["materials"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-[2rem] bg-card dark:bg-black/60 border border-border/20 shadow-xl"
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
            color: "hsl(var(--foreground))",
          }}
        >
          {item.title}
        </h3>
      </div>

      {/* Resources row */}
      <div className="grid grid-cols-1 gap-8 px-8 pb-10 sm:grid-cols-2">
        {/* Activity Kit */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-muted-foreground" style={{ fontFamily: GS, fontSize: "0.92rem", fontWeight: 500 }}>
            Activity Kit:
          </p>
          <a
            href={item.activityKitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-80"
            style={{ fontFamily: GS }}
          >
            <DownloadIcon />
            Download
          </a>
        </div>

        {/* YouTube links */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-muted-foreground" style={{ fontFamily: GS, fontSize: "0.92rem", fontWeight: 500 }}>
            Youtube:
          </p>
          <ul className="space-y-1">
            {item.youtubeLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary dark:text-red-400 underline decoration-primary/40 dark:decoration-red-400/40 transition-colors hover:text-foreground dark:hover:text-white"
                  style={{ fontFamily: GS }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-b-[2rem] bg-muted dark:bg-black/90 px-6 py-4">
        <p className="text-muted-foreground" style={{ fontFamily: GS, fontSize: "0.9rem" }}>
          {dict.contactNote}
        </p>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-foreground px-5 py-2 text-xs font-bold uppercase tracking-widest text-background transition-opacity hover:opacity-80"
          style={{ fontFamily: GS, whiteSpace: "nowrap" }}
        >
          {dict.contactCta}
        </a>
      </div>
    </motion.div>
  )
}

/* ── Email gate form ───────────────────────────────────────── */
function UnlockForm({ onUnlock, dict }: { onUnlock: () => void; dict: Dict["materials"] }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function validate(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return

    if (!validate(email)) {
      setError(dict.emailError)
      inputRef.current?.focus()
      return
    }

    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || "Failed to subscribe")
      }

      localStorage.setItem(STORAGE_KEY, "1")
      onUnlock()
    } catch (err: any) {
      console.error("Subscription failed:", err)
      setError(dict.emailError || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="rounded-[1.6rem] bg-card p-6 md:p-8">
        <p
          style={{ fontFamily: PG, fontWeight: 700, fontSize: "clamp(1.5rem,2.6vw,2rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
          className="text-foreground"
        >
          {dict.unlockTitle}
        </p>
        <p
          className="text-muted-foreground"
          style={{ fontFamily: GS, fontWeight: 400, fontSize: "1rem", marginTop: "0.35rem" }}
        >
          {dict.unlockSubtitle}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            ref={inputRef}
            type="email"
            autoComplete="email"
            placeholder={dict.emailPlaceholder}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError("") }}
            disabled={loading}
            aria-label="Email address"
            aria-invalid={!!error}
            aria-describedby={error ? "unlock-error" : undefined}
            className="min-w-0 flex-1 rounded-full border border-border bg-background px-6 py-3.5 text-base outline-none ring-primary focus:ring-2 disabled:opacity-50"
            style={{ fontFamily: GS }}
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 flex items-center justify-center min-w-[160px]"
            style={{ fontFamily: GS }}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              dict.unlockCta
            )}
          </button>
        </div>

        {error && (
          <p id="unlock-error" role="alert" className="text-error" style={{ fontFamily: GS, fontSize: "0.82rem", marginTop: "0.5rem" }}>
            {error}
          </p>
        )}
      </div>
    </form>
  )
}

/* ── Section ───────────────────────────────────────────────── */
interface MaterialsProps {
  lang: SupportedLocale
  dict: Dict["materials"]
}

export default function Materials({ lang, dict }: MaterialsProps) {
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
      className="mx-auto max-w-[1400px] rounded-[2.5rem] bg-background/50 px-6 pb-8 pt-20 dark:bg-black/40 border border-border/10 md:px-12 md:pb-12 md:pt-28"
    >
      {/* ── Intro row ── */}
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
        {/* Left: text + form */}
        <div className="flex flex-col gap-5">
          <motion.div {...blurFade(0)}>
            <span
              className="inline-flex items-center rounded-full bg-primary px-5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground"
              style={{ fontFamily: GS }}
            >
              {dict.pill}
            </span>
          </motion.div>

          <motion.h2
            {...blurFade(0.07)}
            id="materials-heading"
            className="text-foreground"
            style={{
              fontFamily: PG,
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
            }}
          >
            {dict.heading.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </motion.h2>

          <motion.p
            {...blurFade(0.12)}
            className="text-muted-foreground"
            style={{
              fontFamily: GS,
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              lineHeight: 1.55,
            }}
          >
            {dict.body}
          </motion.p>

          <motion.div {...blurFade(0.17)}>
            {unlocked ? (
              <div className="flex justify-center md:justify-start">
                <motion.p
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 dark:bg-white/10 px-5 py-2.5 text-sm font-semibold text-primary dark:text-white"
                  style={{ fontFamily: GS }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {dict.unlockedMsg}
                </motion.p>
              </div>
            ) : (
              <UnlockForm onUnlock={() => setUnlocked(true)} dict={dict} />
            )}
          </motion.div>
        </div>

        {/* Right: image */}
        <motion.div
          {...blurFade(0.1)}
          className="relative h-[420px] overflow-hidden rounded-[2rem] md:h-[520px]"
        >
          <Image
            src="/media/updated/materials.jpg"
            alt="Playhouse theatre workshop performance"
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
              <MaterialCard key={item.id} item={item} dict={dict} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
