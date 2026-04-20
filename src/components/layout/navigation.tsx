"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GradualBlur } from "@/components/ui/gradual-blur"

const navLinks = [
  { href: "#about", label: "About us", id: "about" },
  { href: "#team", label: "Our team", id: "team" },
  { href: "#shows", label: "Shows", id: "shows" },
  { href: "#workshops", label: "Workshops", id: "workshops" },
  { href: "#resources", label: "Resources", id: "resources" },
  { href: "#footer", label: "Contact", id: "footer" },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
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
      let mostVisibleEntry = entries.find((entry) => entry.isIntersecting)
      
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

  const leftLinks = navLinks.slice(0, 3)
  const rightLinks = navLinks.slice(3)

  return (
    <>
      {/* Gradual blur overlay — blurs page content beneath the header area */}
      <GradualBlur
        position="top"
        height="13rem"
        blurPx={14}
        zIndex={49}
      />

      <motion.nav
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed left-0 right-0 top-0 z-50 flex justify-center px-6 pt-4"
      >
        <div
          className={`flex items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "gap-5 border border-white/20 bg-[#181815] px-6 py-2.5 shadow-lg backdrop-blur-xl md:gap-8"
              : "gap-8 bg-[#5c1010]/80 px-10 py-3.5 backdrop-blur-md md:gap-12"
          }`}
        >
          {/* Left links */}
          <ul className="hidden gap-2 md:flex">
            {leftLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? "bg-[#5C1010] text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
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
          <ul className="hidden gap-2 md:flex">
            {rightLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? "bg-[#5C1010] text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </>
  )
}

