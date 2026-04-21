"use client"

import Image from "next/image"
import Link from "next/link"
import { MouseEvent, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GradualBlur } from "@/components/ui/gradual-blur"

const navLinks = [
  { href: "#about", label: "About us", id: "about" },
  { href: "#team", label: "Our team", id: "team" },
  { href: "#shows", label: "Shows", id: "shows" },
  { href: "#workshops", label: "Workshops", id: "workshops" },
  { href: "#resources", label: "Resources", id: "resources" },
  { href: "#footer", label: "Contact", id: "footer" },
]

/* ─── Hamburger icon ─── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
      <motion.span
        className="block h-[1.5px] w-5 rounded-full bg-white origin-center"
        animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="block h-[1.5px] w-5 rounded-full bg-white origin-center"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-[1.5px] w-5 rounded-full bg-white origin-center"
        animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      window.history.pushState(null, "", href)
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero")
      if (hero) {
        const { bottom } = hero.getBoundingClientRect()
        setScrolled(bottom <= 0)
      } else {
        setScrolled(window.scrollY > 64)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: [0, 0.25, 0.5],
      rootMargin: "-80px 0px 0px 0px",
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const mostVisibleEntry = entries.find((entry) => entry.isIntersecting)
      if (mostVisibleEntry) {
        setActiveSection(mostVisibleEntry.target.id)
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const leftLinks = navLinks.slice(0, 3)
  const rightLinks = navLinks.slice(3)

  return (
    <>
      {/* Gradual blur overlay */}
      <GradualBlur position="top" height="13rem" blurPx={14} zIndex={49} />

      <motion.nav
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed left-0 right-0 top-0 z-50 flex justify-center px-5 pt-4 md:px-6"
      >
        {/* ── Desktop pill ── */}
        <div
          className={`hidden md:flex items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "gap-5 border border-white/20 bg-[#181815] px-8 py-3 shadow-lg backdrop-blur-xl md:gap-8"
              : "gap-8 bg-[#5c1010]/80 px-12 py-4 backdrop-blur-md md:gap-12"
          }`}
        >
          {/* Left links */}
          <ul className="flex gap-2">
            {leftLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? "bg-[#5C1010] text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Center logo */}
          <Link href="/" className="flex shrink-0 items-center" aria-label="PlayHouse">
            <Image
              src="/media/logo para fondo oscuro.png"
              alt="PlayHouse"
              width={168}
              height={44}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          {/* Right links */}
          <ul className="flex gap-2">
            {rightLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? "bg-[#5C1010] text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Mobile: floating pill that expands into menu ── */}
        <motion.div
          layout
          animate={{ borderRadius: mobileOpen ? 28 : 9999 }}
          transition={{ layout: { duration: 0.42, ease: [0.22, 1, 0.36, 1] }, borderRadius: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } }}
          className="flex md:hidden w-full flex-col overflow-hidden shadow-2xl"
          style={{
            background: mobileOpen ? "#1a1a18" : scrolled ? "#181815" : "rgba(92,16,16,0.82)",
            border: (scrolled || mobileOpen) ? "1px solid rgba(255,255,255,0.12)" : "none",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            transition: "background 0.4s ease, border-color 0.4s ease",
          }}
        >
          {/* Top row — logo + hamburger */}
          <div className="flex items-center justify-between px-5 py-3">
            <Link href="/" className="flex shrink-0 items-center" aria-label="PlayHouse">
              <Image
                src="/media/logo para fondo oscuro.png"
                alt="PlayHouse"
                width={140}
                height={36}
                priority
                className="h-7 w-auto"
              />
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>

          {/* Expandable links */}
          <AnimatePresence initial={false}>
            {mobileOpen && (
              <motion.div
                key="links"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                {/* divider */}
                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "0 20px" }} />
                <ul className="flex flex-col py-2">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ delay: 0.06 + i * 0.04, duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="flex items-center justify-between px-5 py-3.5 text-[0.95rem] font-medium transition-colors"
                        style={{ color: activeSection === link.id ? "#ffffff" : "rgba(255,255,255,0.55)" }}
                      >
                        <span>{link.label}</span>
                        {activeSection === link.id && (
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#5C1010",
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <div style={{ height: 8 }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>
    </>
  )
}

