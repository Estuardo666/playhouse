"use client";

import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const getDeviceType = () => {
  if (typeof window === "undefined") return "desktop";
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    );
  if (isMobile) {
    const isTablet =
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        userAgent
      );
    return isTablet ? "tablet" : "mobile";
  }
  return "desktop";
};

interface DirectionalCursorProps {
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  keepBrowserCursor?: boolean;
  controlMode?: "beginner" | "advanced";
  followSpeed?: number;
  cursorSize?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
  restDelta?: number;
  keepTextCursor?: boolean;
  keepPointerCursor?: boolean;
  style?: React.CSSProperties;
  color?: string;
}

export function DirectionalCursor({
  hideOnMobile = false,
  hideOnTablet = false,
  keepBrowserCursor = false,
  controlMode = "beginner",
  followSpeed = 50,
  cursorSize = 1,
  damping = 45,
  stiffness = 400,
  mass = 1,
  restDelta = 0.001,
  keepTextCursor = true,
  keepPointerCursor = true,
  style,
  color = "#09090b", // "oscuro playhouse"
}: DirectionalCursorProps) {
  const cursorHotspotVector = { x: 0, y: 17 };

  const emitCursorTipPosition = useCallback((x: number, y: number) => {
    window.dispatchEvent(
      new CustomEvent("playhouse:cursor-tip", { detail: { x, y } })
    );
  }, []);

  const initialPosition = useMemo(
    () => ({
      x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
      y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    }),
    []
  );

  const springConfig = useMemo(
    () => ({ damping, stiffness, mass, restDelta }),
    [damping, stiffness, mass, restDelta]
  );

  const [deviceType, setDeviceType] = useState("desktop");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setDeviceType(getDeviceType());
    setIsMounted(true);
  }, []);

  const shouldHideCursor = useMemo(() => {
    if (deviceType === "mobile" && hideOnMobile) return true;
    if (deviceType === "tablet" && hideOnTablet) return true;
    return false;
  }, [deviceType, hideOnMobile, hideOnTablet]);

  const [isMoving, setIsMoving] = useState(false);
  const targetScale = useRef(1);
  const isMovingRef = useRef(false);
  const moveEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastMousePos = useRef(initialPosition);
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const directionalEnabledRef = useRef(true);
  const justReenabledDirectionalRef = useRef(false);

  const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  const positionSpringConfig = useMemo(() => {
    if (controlMode === "beginner" && keepBrowserCursor) {
      let calculatedStiffness, calculatedDamping;
      if (followSpeed <= 50) {
        calculatedStiffness = mapRange(followSpeed, 0, 50, 50, 400);
        calculatedDamping = mapRange(followSpeed, 0, 50, 15, 45);
      } else {
        calculatedStiffness = mapRange(followSpeed, 50, 100, 400, 8000);
        calculatedDamping = mapRange(followSpeed, 50, 100, 45, 200);
      }
      return {
        stiffness: calculatedStiffness,
        damping: calculatedDamping,
        mass: springConfig.mass,
        restDelta: springConfig.restDelta,
      };
    } else {
      return springConfig;
    }
  }, [followSpeed, springConfig, controlMode, keepBrowserCursor]);

  const cursorX = useSpring(initialPosition.x, positionSpringConfig);
  const cursorY = useSpring(initialPosition.y, positionSpringConfig);
  const cursorOffsetX = useSpring(0, positionSpringConfig);
  const cursorOffsetY = useSpring(0, positionSpringConfig);

  const rotation = useSpring(0, {
    ...positionSpringConfig,
    damping: 60,
    stiffness: 300,
  });
  const baseScale = useSpring(1, {
    ...positionSpringConfig,
    stiffness: 500,
    damping: 35,
  });

  const combinedScale = useTransform(
    baseScale,
    (value) => value * (cursorSize || 1)
  );

  const positionCursorAtTip = useCallback(
    (angle: number, currentPos: { x: number; y: number }) => {
      const radians = (angle * Math.PI) / 180;
      const scale = (cursorSize || 1) * targetScale.current;
      const rotatedX =
        cursorHotspotVector.x * Math.cos(radians) -
        cursorHotspotVector.y * Math.sin(radians);
      const rotatedY =
        cursorHotspotVector.x * Math.sin(radians) +
        cursorHotspotVector.y * Math.cos(radians);

      cursorOffsetX.set(-rotatedX * scale);
      cursorOffsetY.set(-rotatedY * scale);
      emitCursorTipPosition(currentPos.x, currentPos.y);
    },
    [cursorOffsetX, cursorOffsetY, cursorHotspotVector.x, cursorHotspotVector.y, cursorSize, emitCursorTipPosition]
  );

  const positionCenteredCursor = useCallback(
    (currentPos: { x: number; y: number }) => {
      positionCursorAtTip(0, currentPos);
    },
    [positionCursorAtTip]
  );

  // ── Interactive hover state ──────────────────────────────────────────────
  const fillColor = useMotionValue(color);
  const strokeColor = useMotionValue("white");
  const ringOpacity = useSpring(0, { stiffness: 300, damping: 28 });
  const ringDiameter = useSpring(44, { stiffness: 300, damping: 28 });
  const ringGlow = useSpring(0, { stiffness: 300, damping: 28 });

  const cursorElement = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
    >
      <g filter="url(#filter0_d_91_7928)">
        <motion.path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          style={{ fill: fillColor as any }}
        />
        <motion.path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          style={{ stroke: strokeColor as any }}
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );

  useEffect(() => {
    if (keepBrowserCursor) return;
    const cssId = "smooth-cursor-css";
    let existingStyle = document.getElementById(cssId);
    if (!existingStyle) {
      existingStyle = document.createElement("style");
      existingStyle.id = cssId;
      document.head.appendChild(existingStyle);
    }
    let css = `* { cursor: none !important; }`;
    if (keepTextCursor) {
      css += `
        input, textarea, select, [contenteditable="true"] {
            cursor: text !important;
        }
      `;
    }
    if (keepPointerCursor) {
      css += `
        button, button *, a, a *, [role="button"], [role="button"] *,
        [onclick], [onclick] *, .clickable, .clickable *,
        [data-clickable], [data-clickable] *, input[type="button"],
        input[type="submit"], input[type="reset"], label[for], label[for] * {
            cursor: pointer !important;
        }
      `;
    }
    existingStyle.innerHTML = css;
    return () => {
      const styleElement = document.getElementById(cssId);
      if (styleElement) styleElement.remove();
    };
  }, [keepBrowserCursor, keepTextCursor, keepPointerCursor]);

  useEffect(() => {
    if (shouldHideCursor) return;

    const smoothMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };
      const deltaX = currentPos.x - lastMousePos.current.x;
      const deltaY = currentPos.y - lastMousePos.current.y;
      const distanceSquared = deltaX * deltaX + deltaY * deltaY;

      lastMousePos.current = currentPos;

      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      // In interactive link/button state, keep a neutral cursor (no directional rotation).
      if (!directionalEnabledRef.current) {
        rotation.set(0);
        positionCenteredCursor(currentPos);
        return;
      }

      if (distanceSquared > 0.25) {
        const currentAngle =
          Math.atan2(deltaY, deltaX) * (180 / Math.PI) +
          90;

        if (justReenabledDirectionalRef.current) {
          previousAngle.current = currentAngle;
          accumulatedRotation.current = rotation.get();
          justReenabledDirectionalRef.current = false;
        }

        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        positionCursorAtTip(currentAngle, currentPos);

        baseScale.set(targetScale.current * 0.95);
        setIsMoving(true);
        isMovingRef.current = true;

        if (moveEndTimeoutRef.current) {
          clearTimeout(moveEndTimeoutRef.current);
        }

        moveEndTimeoutRef.current = setTimeout(() => {
          baseScale.set(targetScale.current);
          setIsMoving(false);
          isMovingRef.current = false;
          moveEndTimeoutRef.current = null;
        }, 150);
        return;
      }

      positionCursorAtTip(previousAngle.current, currentPos);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const overCard = !!target?.closest?.('[data-cursor="card"]');
      const overInteractive = !!target?.closest?.(
        'a, button, [role="button"], input[type="submit"], input[type="button"], .clickable, [data-clickable], label[for]'
      );

      if (overCard) {
        if (!directionalEnabledRef.current) {
          justReenabledDirectionalRef.current = true;
        }
        directionalEnabledRef.current = true;
        targetScale.current = 1.55;
        positionCursorAtTip(previousAngle.current, lastMousePos.current);
        if (!isMovingRef.current) baseScale.set(1.55);
        animate(fillColor, "#ffffff", { duration: 0.2, ease: "easeOut" });
        animate(strokeColor, "white", { duration: 0.2, ease: "easeOut" });
        ringOpacity.set(1);
        ringDiameter.set(70);
        ringGlow.set(1);
      } else if (overInteractive) {
        directionalEnabledRef.current = false;
        justReenabledDirectionalRef.current = false;
        previousAngle.current = 0;
        accumulatedRotation.current = 0;
        rotation.set(0);
        targetScale.current = 1.3;
        positionCenteredCursor(lastMousePos.current);
        if (!isMovingRef.current) baseScale.set(1.3);
        animate(fillColor, "#ffffff", { duration: 0.2, ease: "easeOut" });
        animate(strokeColor, "#282830", { duration: 0.2, ease: "easeOut" });
        ringOpacity.set(1);
        ringDiameter.set(44);
        ringGlow.set(0);
      } else {
        if (!directionalEnabledRef.current) {
          justReenabledDirectionalRef.current = true;
        }
        directionalEnabledRef.current = true;
        targetScale.current = 1;
        positionCursorAtTip(previousAngle.current, lastMousePos.current);
        if (!isMovingRef.current) baseScale.set(1);
        animate(fillColor, color, { duration: 0.25, ease: "easeOut" });
        animate(strokeColor, "white", { duration: 0.25, ease: "easeOut" });
        ringOpacity.set(0);
        ringDiameter.set(44);
        ringGlow.set(0);
      }
    };

    let rafId = 0;
    let latestMouseEvent: MouseEvent | null = null;

    const throttledMouseMove = (e: MouseEvent) => {
      latestMouseEvent = e;
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const nextMouseEvent = latestMouseEvent;
        latestMouseEvent = null;
        rafId = 0;

        if (nextMouseEvent) {
          smoothMouseMove(nextMouseEvent);
        }
      });
    };

    window.addEventListener("mousemove", throttledMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
      if (moveEndTimeoutRef.current) {
        clearTimeout(moveEndTimeoutRef.current);
        moveEndTimeoutRef.current = null;
      }
    };
  }, [
    cursorX,
    cursorY,
    rotation,
    baseScale,
    cursorOffsetX,
    cursorOffsetY,
    shouldHideCursor,
    fillColor,
    ringOpacity,
    ringDiameter,
    ringGlow,
    color,
    cursorSize,
    emitCursorTipPosition,
    positionCursorAtTip,
    positionCenteredCursor,
  ]);

  const ringBoxShadow = useTransform(
    ringGlow,
    [0, 1],
    ["0 0 0px 0px rgba(255,255,255,0)", "0 0 18px 4px rgba(255,255,255,0.18)"]
  );

  if (!isMounted || shouldHideCursor) {
    return null;
  }

  return (
    <>
      {/* Interactive ring indicator */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringDiameter,
          height: ringDiameter,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.55)",
          boxShadow: ringBoxShadow,
          opacity: ringOpacity,
          zIndex: 9998,
          pointerEvents: "none",
          willChange: "transform, opacity, width, height",
        }}
      />
      {/* Arrow cursor */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          x: cursorOffsetX,
          y: cursorOffsetY,
          rotate: rotation,
          scale: combinedScale,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
          ...style,
        }}
      >
        {cursorElement}
      </motion.div>
    </>
  );
}
