"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import type { ShowGalleryImage } from "@/content/playhouse/shows"

interface ParallaxGalleryProps {
  images: ShowGalleryImage[]
}

export default function ParallaxGallery({ images }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // each image row gets a different parallax speed
  const speeds = [-80, -40, -60, -30, -70]

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ height: "clamp(320px, 45vw, 520px)" }}
    >
      {/* two-row masonry-style parallax grid */}
      <div className="absolute inset-0 flex flex-col gap-2 px-1">
        {/* top row — 3 images */}
        <div className="flex gap-2 flex-1 min-h-0">
          {images.slice(0, 3).map((img, i) => {
            const y = useTransform(scrollYProgress, [0, 1], [speeds[i], -speeds[i]])
            return (
              <motion.div
                key={img.src}
                className="relative flex-1 min-w-0 overflow-hidden rounded-xl"
                style={{ y }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            )
          })}
        </div>
        {/* bottom row — 2 wider images */}
        <div className="flex gap-2 flex-[1.2] min-h-0">
          {images.slice(3, 5).map((img, i) => {
            const y = useTransform(scrollYProgress, [0, 1], [speeds[i + 3], -speeds[i + 3]])
            return (
              <motion.div
                key={img.src}
                className="relative flex-1 min-w-0 overflow-hidden rounded-xl"
                style={{ y }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
