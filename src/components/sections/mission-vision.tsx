"use client";

import Image from "next/image";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  animate,
  useMotionValue,
} from "framer-motion";

/* ─────────────── tokens ─────────────── */
const ease = [0.34, 1.56, 0.64, 1] as const;
const GS = '"Google Sans", "Inter", sans-serif';
const PG = '"Play Grotesk", "Google Sans", sans-serif';

/* ─────────────── content ─────────────── */
const VALORES = [
  "Creativity",
  "Immersion",
  "Collaboration",
  "Expression",
  "Pedagogical Innovation",
  "Stage Confidence",
];

const CARDS = [
  {
    id: "mision",
    badge: "Mission",
    shortTitle: "What we do,\nand whom we do it for",
    expandedTitle: "Mission",
    expandedBody:
      "To promote English learning and artistic development through musical theatre, creating immersive and fun stage experiences that inspire children, youth, and adults to express themselves, communicate, and grow in a creative and bilingual environment.",
    image:
      "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
  },
  {
    id: "vision",
    badge: "Vision",
    shortTitle: "Where the stage\nis heading",
    expandedTitle: "Vision",
    expandedBody:
      "PLAYHOUSE - Educational Theatre will be a national benchmark in educational theatre in English, with annual productions reaching various cities. We stand out by combining art and pedagogy in innovative stage proposals, aiming to grow through strategic partnerships and our own educational materials.",
    image: "/media/test/Foto-muestra-4.jpg",
  },
];

/* ─────────────── animation helpers ─────────────── */
const blurFade = (delay = 0) => ({
  initial: { opacity: 0, y: 32, filter: "blur(14px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1.05, ease, delay },
});

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(16px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.05,
      ease: [0.34, 1.56, 0.64, 1] as const,
      delay: i * 0.22,
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};

const valoreItem = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] as const },
  },
};

function Magnet({ children, intensity = 1 }: { children: ReactNode; intensity?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [disableMagnet, setDisableMagnet] = useState(false);

  useEffect(() => {
    const updateDeviceMode = () => {
      const isMobileViewport = window.innerWidth < 768;
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      setDisableMagnet(isMobileViewport || isCoarsePointer);
    };

    updateDeviceMode();
    window.addEventListener("resize", updateDeviceMode);

    return () => {
      window.removeEventListener("resize", updateDeviceMode);
    };
  }, []);

  return (
    <motion.div
      style={{ ...(disableMagnet ? {} : { x, y, willChange: "transform" }), display: "inline-block" }}
      onHoverEnd={() => {
        if (disableMagnet) return;
        animate(x, 0, { type: "spring", stiffness: 400, damping: 20, mass: 3 });
        animate(y, 0, { type: "spring", stiffness: 400, damping: 20, mass: 3 });
      }}
      onPointerMove={(event) => {
        if (disableMagnet) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const nextX = (event.clientX - rect.left - rect.width / 2) * intensity;
        const nextY = (event.clientY - rect.top - rect.height / 2) * intensity;

        animate(x, nextX, { type: "tween", duration: 0.18, ease: [0, 0, 1, 1] });
        animate(y, nextY, { type: "tween", duration: 0.18, ease: [0, 0, 1, 1] });
      }}
    >
      {children}
    </motion.div>
  );
}

function ValorPill({
  valor,
}: {
  valor: string;
}) {
  return (
    <Magnet intensity={1}>
      <div
        style={{
          backgroundColor: "#5C1010",
          borderRadius: 9999,
          paddingLeft: 22,
          paddingRight: 22,
          height: 46,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.15)",
          cursor: "default",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: GS,
            fontWeight: 600,
            fontSize: "0.88rem",
            whiteSpace: "nowrap",
            letterSpacing: "0.02em",
            color: "#ffffff",
          }}
        >
          {valor}
        </span>
      </div>
    </Magnet>
  );
}

function ProgressiveEdgeBlur({
  side,
  width = "4rem",
  blurPx = 12,
}: {
  side: "left" | "right";
  width?: string;
  blurPx?: number;
}) {
  const layers = useMemo(() => {
    const dir = side === "left" ? "to left" : "to right";

    return Array.from({ length: 8 }, (_, i) => {
      const blur = blurPx / Math.pow(2, 8 - i);
      const start = (i * 12.5).toFixed(1);
      const mid1 = (i * 12.5 + 12.5).toFixed(1);
      const mid2 = (i * 12.5 + 25).toFixed(1);
      const end = (i * 12.5 + 37.5).toFixed(1);
      const gradient = [
        `rgba(0,0,0,0) ${start}%`,
        `rgba(0,0,0,1) ${mid1}%`,
        `rgba(0,0,0,1) ${mid2}%`,
        `rgba(0,0,0,0) ${end}%`,
      ].join(", ");

      return {
        blur: `${blur.toFixed(3)}px`,
        mask: `linear-gradient(${dir}, ${gradient})`,
      };
    });
  }, [side, blurPx]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0"
      style={{ [side]: 0, width, overflow: "hidden" }}
    >
      {layers.map((layer, idx) => (
        <div
          key={`${side}-${idx}`}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: idx + 1,
            backdropFilter: `blur(${layer.blur})`,
            WebkitBackdropFilter: `blur(${layer.blur})`,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask,
          }}
        />
      ))}
    </div>
  );
}

function PillsMarqueeRow({
  values,
  reverse = false,
}: {
  values: string[];
  reverse?: boolean;
}) {
  const loopValues = [...values, ...values];

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex w-max items-center gap-3 py-1"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        {loopValues.map((valor, i) => (
          <div key={`${valor}-${i}`} className="flex-shrink-0">
            <ValorPill valor={valor} />
          </div>
        ))}
      </motion.div>

      <ProgressiveEdgeBlur side="left" />
      <ProgressiveEdgeBlur side="right" />
    </div>
  );
}

/* ─────────────── FlipCard ─────────────── */
function FlipCard({
  badge,
  shortTitle,
  expandedTitle,
  expandedBody,
  image,
  index,
  isActive,
  hasActive,
  onToggle,
}: {
  badge: string;
  shortTitle: string;
  expandedTitle: string;
  expandedBody: string;
  image: string;
  index: number;
  isActive: boolean;
  hasActive: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(16px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      whileHover={!isActive ? { scale: 1.02 } : {}}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        opacity: { duration: 0.9, delay: index * 0.18 },
        filter: { duration: 0.9, delay: index * 0.18 },
      }}
      data-cursor="card"
      onClick={onToggle}
      style={{
        cursor: "pointer",
        flex: isActive ? "1.65 1 0%" : hasActive ? "0.85 1 0%" : "1 1 0%",
        height: 480,
        minWidth: 0,
        transition: "flex 0.65s cubic-bezier(0.32, 0.72, 0, 1)",
      }}
      className="relative overflow-hidden rounded-[2rem]"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-x-0 inset-y-0"
        style={{ zIndex: 0 }}
      >
        <Image
          src={image}
          alt={expandedTitle}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
        <motion.div
          className="absolute inset-0 bg-black/10 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Base dark gradient — always on for legibility */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: isActive ? 0 : 0.82 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.50) 40%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      {/* Expanded: blur overlay */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 2,
          background: "rgba(0, 0, 0, 0.35)",
        }}
      />

      {/* Expanded: bottom reading gradient */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full"
        style={{
          zIndex: 3,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)",
        }}
      />

      {/* Card content — single AnimatePresence prevents overlap */}
      <AnimatePresence mode="wait">
        {!isActive ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-7"
          >
            {/* Badge */}
            <div>
              <div
                className="rounded-full border border-white/20 bg-[#5C1010] px-4 py-2 w-fit"
                style={{ fontFamily: GS }}
              >
                <span className="text-[0.78rem] font-semibold text-white/90 tracking-wide">
                  {badge}
                </span>
              </div>
            </div>

            {/* Short title */}
            <h3
              className="text-[1.95rem] font-normal leading-[1.08] text-white md:text-[2.35rem] text-left"
              style={{
                fontFamily: GS,
                letterSpacing: "-0.025em",
                whiteSpace: "pre-line",
              }}
            >
              {shortTitle}
            </h3>

            {/* Click indicator icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              whileHover={{ scale: 1.1 }}
              className="absolute bottom-6 right-6 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm p-2.5 border border-white/30 hover:bg-white/20 transition-colors"
              style={{ width: 40, height: 40 }}
            >
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </motion.svg>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-7 md:p-8"
          >
            <h3
              className="text-[2.45rem] font-semibold leading-[1.02] text-white md:text-[3rem] text-left"
              style={{ fontFamily: GS, letterSpacing: "-0.03em" }}
            >
              {expandedTitle}
            </h3>
            <div className="h-px w-8 bg-white/30" />
            <p
              className="w-full max-w-none text-[1rem] leading-[1.7] text-white md:text-[1.05rem] text-left"
              style={{ fontFamily: GS }}
            >
              {expandedBody}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────── exported sub-blocks ─────────────── */
export function FlipCardsBlock() {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <LayoutGroup id="flipcards-embedded">
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {CARDS.map((card, i) => (
          <FlipCard
            key={card.id}
            index={i}
            {...card}
            isActive={activeId === card.id}
            hasActive={activeId !== null && activeId !== card.id}
            onToggle={() => setActiveId(activeId === card.id ? null : card.id)}
          />
        ))}
      </div>
    </LayoutGroup>
  );
}

export function ValorPillsBlock() {
  const splitIndex = Math.ceil(VALORES.length / 2);
  const topValues = VALORES.slice(0, splitIndex);
  const bottomValues = VALORES.slice(splitIndex);

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative left-1/2 w-screen -translate-x-1/2 flex flex-col gap-2 px-0 md:hidden"
      >
        <PillsMarqueeRow values={topValues} />
        <PillsMarqueeRow values={bottomValues} reverse />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="hidden w-full flex-wrap items-center justify-between gap-3 md:flex"
      >
        {VALORES.map((valor, i) => (
          <motion.div key={`${valor}-${i}`} variants={valoreItem} className="flex-shrink-0">
            <ValorPill valor={valor} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

/* ─────────────── main component ─────────────── */
export default function MissionVision() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="purpose"
      className="relative overflow-hidden bg-[#0d0d11] px-6 py-28 md:px-10 lg:px-16"
    >
      {/* Stage curtain glow — top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,0,0,0.45), transparent 70%)",
        }}
      />

      {/* Stage curtain glow — bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 110%, rgba(139,0,0,0.35), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div className="mb-20 flex flex-col items-center gap-6 text-center">
          <motion.div {...blurFade(0)}>
            <span
              className="inline-block rounded-full border border-white/15 bg-white/[0.06] px-5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/60 backdrop-blur-sm"
              style={{ fontFamily: GS }}
            >
              Nuestra esencia
            </span>
          </motion.div>

          <motion.h2
            {...blurFade(0.12)}
            className="max-w-3xl text-[2.2rem] font-medium leading-[0.98] text-white md:text-[2.8rem] lg:text-[3.2rem]"
            style={{ fontFamily: PG, letterSpacing: "-0.045em" }}
          >
            An Artistic and Pedagogical Proposal with a Vision for National
            Growth
          </motion.h2>

          {/* Scenic divider */}
          <motion.div {...blurFade(0.22)} className="flex items-center gap-4">
            <div className="h-px w-16 bg-white/20" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#8b0000]" />
            <div className="h-px w-16 bg-white/20" />
          </motion.div>
        </div>

        {/* ── Mission / Vision cards ── */}
        <LayoutGroup id="flipcards">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:gap-8">
            {CARDS.map((card, i) => (
              <FlipCard
                key={card.id}
                index={i}
                {...card}
                isActive={activeId === card.id}
                hasActive={activeId !== null && activeId !== card.id}
                onToggle={() =>
                  setActiveId(activeId === card.id ? null : card.id)
                }
              />
            ))}
          </div>
        </LayoutGroup>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex w-full flex-wrap items-center justify-center gap-3"
        >
          {VALORES.map((valor, i) => (
            <motion.div key={`${valor}-${i}`} variants={valoreItem} className="flex-shrink-0">
              <ValorPill valor={valor} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
