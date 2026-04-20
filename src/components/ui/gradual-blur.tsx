"use client"

import { useMemo } from "react"

interface GradualBlurProps {
  /** Which edge the blur is strongest at */
  position?: "top" | "bottom"
  /** Max blur in px (stacked additively across layers) */
  blurPx?: number
  /** Height of the overlay element */
  height?: string
  zIndex?: number
  className?: string
}

/**
 * ProgressiveBlur — ports the Framer ProgressiveBlur algorithm.
 *
 * 8 layers, each with blur = blurPx / 2^(8-i).
 * Each layer's mask is a wide (37.5% window) gradient offset by i*12.5%,
 * so windows overlap heavily and blur stacks additively → true smooth gradient.
 *
 * At the strong edge all 8 layers are active; at the clear edge none are.
 */
export function GradualBlur({
  position = "top",
  blurPx = 12,
  height = "4rem",
  zIndex = 49,
  className = "",
}: GradualBlurProps) {
  const layers = useMemo(() => {
    // "to top"   → 0% = bottom of element, 100% = top
    //               → layer 7 peaks at top edge = strongest blur at top
    // "to bottom"→ 0% = top, 100% = bottom
    //               → layer 7 peaks at bottom edge
    const dir = position === "top" ? "to top" : "to bottom"

    return Array.from({ length: 8 }, (_, i) => {
      const b = blurPx / Math.pow(2, 8 - i) // range: blurPx/256 → blurPx/2
      const start = (i * 12.5).toFixed(1)
      const mid1 = (i * 12.5 + 12.5).toFixed(1)
      const mid2 = (i * 12.5 + 25).toFixed(1)
      const end = (i * 12.5 + 37.5).toFixed(1)
      const gradient = [
        `rgba(0,0,0,0) ${start}%`,
        `rgba(0,0,0,1) ${mid1}%`,
        `rgba(0,0,0,1) ${mid2}%`,
        `rgba(0,0,0,0) ${end}%`,
      ].join(", ")
      const mask = `linear-gradient(${dir}, ${gradient})`
      return { blur: `${b.toFixed(3)}px`, mask }
    })
  }, [position, blurPx])

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex,
        height,
        width: "100%",
        left: 0,
        right: 0,
        [position]: 0,
        overflow: "hidden",
      }}
    >
      {layers.map((layer, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: idx + 1,
            backdropFilter: `blur(${layer.blur})`,
            WebkitBackdropFilter: `blur(${layer.blur})`,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  )
}
