"use client"

import { motion } from "framer-motion"

/**
 * Theatrical ornamental section divider.
 *
 * Props:
 *   bg      – background color of this divider strip (match the section above it)
 *   opacity – opacity of the line + ornament (default 0.22)
 */
export default function SectionDivider({
  bg = "#fff",
  opacity = 0.22,
}: {
  bg?: string
  opacity?: number
}) {
  // Line and ornament color: white on dark, near-black on light
  const isDark =
    bg === "#181815" || bg === "#282830" || bg === "#000" || bg === "black"
  const color = isDark
    ? `rgba(255,255,255,${opacity})`
    : `rgba(0,0,0,${opacity})`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      aria-hidden
      style={{ background: bg, paddingTop: 0, paddingBottom: 0 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          maxWidth: 560,
          margin: "0 auto",
          padding: "18px 32px",
        }}
      >
        {/* left arm */}
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to right, transparent, ${color})`,
          }}
        />

        {/* 4-pointed star ornament */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M6 0 L7.2 4.8 L12 6 L7.2 7.2 L6 12 L4.8 7.2 L0 6 L4.8 4.8 Z"
            fill={color}
          />
        </svg>

        {/* right arm */}
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(to left, transparent, ${color})`,
          }}
        />
      </div>
    </motion.div>
  )
}
