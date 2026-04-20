"use client"

import { useEffect } from "react"

type ThumbStyle = "solid" | "gradient"
type TrackStyle = "transparent" | "colored"

type CustomScrollbarProProps = {
  thumbStyle?: ThumbStyle
  thumbColor?: string
  thumbGradientStart?: string
  thumbGradientEnd?: string
  trackStyle?: TrackStyle
  trackColor?: string
  scrollbarSize?: number
  borderRadius?: number
  autoHide?: boolean
  autoHideDelay?: number
}

export default function CustomScrollbarPro({
  thumbStyle = "gradient",
  thumbColor = "#5C1010",
  thumbGradientStart = "#7A1515",
  thumbGradientEnd = "#3D0A0A",
  trackStyle = "transparent",
  trackColor = "rgba(92, 16, 16, 0.14)",
  scrollbarSize = 12,
  borderRadius = 10,
  autoHide = false,
  autoHideDelay = 2,
}: CustomScrollbarProProps) {
  useEffect(() => {
    if (typeof window === "undefined") return

    const style = document.createElement("style")
    style.setAttribute("data-custom-scrollbar-pro", "true")

    const trackBackground = trackStyle === "transparent" ? "transparent" : trackColor
    const thumbBackground =
      thumbStyle === "gradient"
        ? `linear-gradient(180deg, ${thumbGradientStart}, ${thumbGradientEnd})`
        : thumbColor

    style.textContent = `
      body::-webkit-scrollbar {
        width: ${scrollbarSize}px;
      }

      body::-webkit-scrollbar-track {
        background: ${trackBackground};
        border-radius: ${borderRadius}px;
      }

      body::-webkit-scrollbar-thumb {
        background: ${thumbBackground};
        border-radius: ${borderRadius}px;
      }

      @supports not selector(::-webkit-scrollbar) {
        html {
          scrollbar-color: ${thumbStyle === "gradient" ? thumbGradientStart : thumbColor} ${trackBackground};
          scrollbar-width: auto;
        }
      }
    `

    document.head.appendChild(style)

    let scrollTimeout: number | undefined

    const removeDynamicStyle = () => {
      const existing = document.getElementById("dynamic-scrollbar-width")
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing)
      }
    }

    const setDynamicWidth = (width: number) => {
      removeDynamicStyle()

      const dynamicStyle = document.createElement("style")
      dynamicStyle.id = "dynamic-scrollbar-width"
      dynamicStyle.textContent = `
        body::-webkit-scrollbar {
          width: ${width}px !important;
        }
      `

      document.head.appendChild(dynamicStyle)
    }

    const hideScrollbar = () => setDynamicWidth(0)

    const handleScroll = () => {
      setDynamicWidth(scrollbarSize)

      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout)
      }

      scrollTimeout = window.setTimeout(() => {
        hideScrollbar()
      }, autoHideDelay * 1000)
    }

    if (autoHide) {
      window.addEventListener("scroll", handleScroll, { passive: true })

      scrollTimeout = window.setTimeout(() => {
        hideScrollbar()
      }, autoHideDelay * 1000)
    }

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }

      removeDynamicStyle()

      if (autoHide) {
        window.removeEventListener("scroll", handleScroll)
      }

      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout)
      }
    }
  }, [
    autoHide,
    autoHideDelay,
    borderRadius,
    scrollbarSize,
    thumbColor,
    thumbGradientEnd,
    thumbGradientStart,
    thumbStyle,
    trackColor,
    trackStyle,
  ])

  return null
}