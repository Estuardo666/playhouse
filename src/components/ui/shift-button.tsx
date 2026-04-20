"use client"

import { motion } from "framer-motion"

const spring = { type: "spring" as const, stiffness: 300, damping: 20, mass: 1.25 }
const ICON = 44
const HOVER_BG = "#181815"

function ArrowIcon({ color = "#fff", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M4 10L10 4M10 4H5.5M10 4V8.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface ShiftButtonProps {
  label: string
  href?: string
  bgColor?: string
  textColor?: string
  fontSize?: number
  fontWeight?: number
  paddingX?: number
  paddingY?: number
}

export default function ShiftButton({
  label,
  href = "#contact",
  bgColor = "#8b0000",
  textColor = "#fff",
  fontSize = 19,
  fontWeight = 600,
  paddingX = 19,
  paddingY = 7,
}: ShiftButtonProps) {
  return (
    <motion.a
      href={href}
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      {/* Left arrow — in-flow at rest, collapses on hover */}
      <motion.span
        variants={{
          rest: { width: ICON, scale: 1, opacity: 1 },
          hover: { width: 0, scale: 0, opacity: 0 },
        }}
        transition={spring}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: ICON,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
        }}
        animate={{ backgroundColor: bgColor }}
        whileHover={{ backgroundColor: HOVER_BG }}
      >
        <ArrowIcon color={textColor} size={20} />
      </motion.span>

      {/* Pill — text label, rotates on hover */}
      <motion.span
        variants={{ rest: { rotate: 0 }, hover: { rotate: -6 } }}
        transition={spring}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          padding: `${paddingY}px ${paddingX}px`,
          overflow: "hidden",
          whiteSpace: "nowrap",
          zIndex: 2,
        }}
        animate={{ backgroundColor: bgColor }}
        whileHover={{ backgroundColor: HOVER_BG }}
      >
        <span
          style={{
            color: textColor,
            fontFamily: '"Figtree", "Inter", sans-serif',
            fontWeight,
            fontSize,
            letterSpacing: "-0.03em",
          }}
        >
          {label}
        </span>
      </motion.span>

      {/* Right arrow — hidden at rest, expands on hover */}
      <motion.span
        variants={{
          rest: { width: 0, scale: 0, opacity: 0 },
          hover: { width: ICON, scale: 1, opacity: 1 },
        }}
        transition={spring}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: ICON,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
        }}
        animate={{ backgroundColor: bgColor }}
        whileHover={{ backgroundColor: HOVER_BG }}
      >
        <ArrowIcon color={textColor} size={20} />
      </motion.span>
    </motion.a>
  )
}
