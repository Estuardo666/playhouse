"use client"

import { motion } from "framer-motion"

/**
 * Theatrical ornamental section divider.
 *
 * Props:
 *   opacity – opacity of the line + ornament (default 0.22)
 */
export default function SectionDivider({
  opacity = 0.22,
}: {
  opacity?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      aria-hidden
      className="bg-background"
      style={{ paddingTop: 0, paddingBottom: 0 }}
    >
      <div
        className="flex items-center gap-[18px] mx-auto px-8 py-[18px]"
        style={{ maxWidth: 560 }}
      >
        {/* left arm */}
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(to right, transparent, hsl(var(--foreground) / ${opacity}))`,
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
            fill={`hsl(var(--foreground) / ${opacity})`}
          />
        </svg>

        {/* right arm */}
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(to left, transparent, hsl(var(--foreground) / ${opacity}))`,
          }}
        />
      </div>
    </motion.div>
  )
}
