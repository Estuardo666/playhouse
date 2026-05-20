"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface WhatsAppFloatProps {
  label: string
}

const WHATSAPP_NUMBER = "593939576825"

const containerVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 3,
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
      staggerChildren: 0.03,
      delayChildren: 3.3,
    },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17.472 14.382c-.297-.15-1.767-.867-2.04-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13 13 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.016-1.42.249-.699.249-1.297.174-1.42-.074-.123-.272-.198-.57-.347m-5.421-7.702L12 2C6.486 2 2 6.486 2 12c0 2.1.588 4.062 1.608 5.74L2 22l4.354-1.558A9.96 9.96 0 0012 22c5.514 0 10-4.486 10-10S17.514 2 12 2z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function WhatsAppFloat({ label }: WhatsAppFloatProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const letters = label.split("")

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full border border-[#5C1010] px-5 py-3 text-white shadow-lg will-change-transform"
      style={{ backgroundColor: "#282830" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.05,
        backgroundColor: "#3a3a45",
        transition: { duration: 0.25 },
      }}
      whileTap={{
        scale: 0.95,
        backgroundColor: "#128C7E",
        transition: { duration: 0.15 },
      }}
    >
      <WhatsAppIcon size={22} />
      <span className="flex overflow-hidden" aria-label={label}>
        {letters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={letterVariants}
            className="inline-block whitespace-pre"
            style={{
              fontFamily: '"Google Sans", "Inter", sans-serif',
              fontWeight: 500,
              fontSize: 15,
              letterSpacing: "-0.01em",
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </motion.a>
  )
}
