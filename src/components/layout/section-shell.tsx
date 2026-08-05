"use client"

import { MotionSection } from "@/lib/animations/motion"
import { Container } from "./container"
import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface SectionShellProps {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  headingClassName?: string
  variant?: "default" | "hero" | "featured" | "gallery"
  compact?: boolean
}

export default function SectionShell({
  id,
  title,
  subtitle,
  children,
  className = "",
  headingClassName = "",
  variant = "default",
  compact = false,
}: SectionShellProps) {
  const baseClasses = "w-full"
  const variantClasses = {
    default: compact ? "py-16 lg:py-20" : "py-24 lg:py-32",
    hero: "min-h-screen flex items-center justify-center",
    featured: "py-32 bg-gradient-to-b from-warm-cream/30 to-white",
    gallery: "py-24 lg:py-32 bg-white",
  }

  return (
    <MotionSection id={id} className={cn(baseClasses, variantClasses[variant], className)}>
      <Container>
        <div className={cn("text-center max-w-4xl mx-auto", compact ? "mb-8" : "mb-16")}>
          <h2 className={cn(
            compact ? "text-4xl md:text-5xl font-display font-black" : "text-5xl md:text-7xl lg:text-8xl font-display font-black",
            variant === "hero" ? "text-white drop-shadow-2xl" : "bg-gradient-to-r from-deep-red to-gold bg-clip-text text-transparent",
            headingClassName
          )}>
            {title}
          </h2>
          {subtitle && (
            <p className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        <div className="w-full">
          {children}
        </div>
      </Container>
    </MotionSection>
  )
}
