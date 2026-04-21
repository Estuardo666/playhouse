"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import ShiftButton from "@/components/ui/shift-button"
import { FlipCardsBlock, ValorPillsBlock } from "@/components/sections/mission-vision"

const ease = [0.34, 1.56, 0.64, 1] as const
const GS = '"Google Sans", "Inter", sans-serif'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.9, ease, delay },
})

const topImages = [
  { src: "/media/test/3editada-265.jpg", alt: "PlayHouse performance 1" },
  { src: "/media/test/Foto-muestra-4.jpg", alt: "PlayHouse performance 2" },
  { src: "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg", alt: "PlayHouse workshop" },
]

const stackedImages = [
  { src: "/media/test/depositphotos_72162909-stock-photo-two-funny-children-acting-as.jpg", alt: "Cast on stage" },
  { src: "/media/test/cc05861322e903b3259ebb0cc0a134af.jpg", alt: "Children acting" },
]


export default function About() {
  return (
    <section
      id="about"
      className="bg-white px-4 py-24 md:px-10"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto flex flex-col items-center gap-12 text-center" style={{ maxWidth: "1260px" }}>

        {/* Pill */}
        <motion.div {...fadeUp(0)}>
          <span
            className="rounded-full px-5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white"
            style={{ background: "#5c1010", fontFamily: GS }}
          >
            Who We Are
          </span>
        </motion.div>

        {/* 3 top images */}
        <motion.div {...fadeUp(0.1)} className="flex gap-5">
          {topImages.map((img, i) => (
            <div
              key={i}
              className="relative h-24 w-24 overflow-hidden rounded-[2rem] bg-neutral-800 md:h-28 md:w-28"
            >
              <Image src={img.src} alt={img.alt} fill sizes="128px" className="object-cover" />
            </div>
          ))}
        </motion.div>

        {/* Main headline — section H2 for SEO */}
        <motion.h2
          id="about-heading"
          {...fadeUp(0.18)}
          className="max-w-4xl text-[1.9rem] font-light leading-[1.2] text-neutral-700 md:text-[2.2rem]"
          style={{ fontFamily: GS, letterSpacing: "-0.03em" }}
        >
          PLAYHOUSE – Educational Theatre is a pioneering project in educational theatre in English{” ”}
          <strong className="font-bold text-neutral-900">that combines art, music, and pedagogy</strong>{” ”}
          to offer immersive and creative learning experiences.
        </motion.h2>

        {/* Extended block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
          className="w-full rounded-[2rem] p-4 sm:p-6 md:p-12"
        >

          {/* Top grid: stacked images + text */}
          <div className="grid items-stretch gap-10 lg:grid-cols-[42%_1fr]">

            {/* Stacked images covering full height of adjacent column */}
            <motion.div
              className="flex flex-col gap-5"
              variants={{ hidden: { opacity: 0, y: 32, filter: "blur(12px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16,1,0.3,1] } } }}
            >
              {stackedImages.map((img) => (
                <div
                  key={img.src}
                  className="relative flex-1 min-h-[220px] overflow-hidden rounded-[2rem] bg-[#272c36]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>

            {/* Text column */}
            <div className="relative flex flex-col justify-start gap-7 text-left">
              <motion.h3
                className="text-4xl font-semibold leading-[1.05] text-neutral-900 md:text-5xl"
                style={{ fontFamily: '"MADE Grotesk", "Play Grotesk", "Google Sans", sans-serif', letterSpacing: "-0.025em" }}
                variants={{ hidden: { opacity: 0, y: 24, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.16,1,0.3,1] } } }}
              >
                Where theatre becomes<br />a living classroom
              </motion.h3>

              <motion.p
                style={{ fontFamily: GS, fontSize: "1rem", fontWeight: 400, color: "#545454" }}
                variants={{ hidden: { opacity: 0, y: 16, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16,1,0.3,1], delay: 0.08 } } }}
              >
                Art, pedagogy &amp; the English language on one stage
              </motion.p>

              <p
                className="text-[1.22rem] font-semibold text-neutral-800 text-justify"
                style={{ fontFamily: GS, lineHeight: 1.4 }}
              >
                PLAYHOUSE - Educational Theatre was founded with the mission of bringing together the performing arts and English learning on the same stage. We are a theatre production company committed to creating unique experiences that inspire, educate, and entertain audiences of all ages.
              </p>

              <p
                className="text-[1.22rem] text-neutral-700 text-justify"
                style={{ fontFamily: GS, lineHeight: 1.4 }}
              >
                We believe that theatre is a powerful bridge for learning: every play is an opportunity to dive into a new language, a culture, and a story. Through workshops, musicals and performances in English, we offer students, families, teachers, and art lovers a space where English comes to life in a natural, fun, and exciting way.
              </p>

              <p
                className="text-[1.22rem] text-neutral-700 text-justify"
                style={{ fontFamily: GS, lineHeight: 1.4 }}
              >
                Our work combines a passion for theatre with an innovative pedagogical approach. At PLAYHOUSE, we bring together actors, directors, musicians, choreographers, and creatives who share the same vision: to turn the stage into a living classroom and the audience into an active participant.
              </p>
            </div>
          </div>

          {/* Wide bottom paragraph */}
          <p
            className="mx-auto mt-16 max-w-4xl text-justify text-[1.18rem] leading-[1.55] text-neutral-800 md:text-[1.3rem] font-semibold"
            style={{ fontFamily: GS }}
          >
            With more than 15 years of experience in the performing arts and teaching, we promote an innovative
            proposal that unites entertainment and education, turning theatre into a powerful tool for linguistic,
            cultural, and social development. More than just shows, we create experiences that leave a mark, foster
            creativity, and build confidence in using English—all while celebrating the magic of theatre.
          </p>

          {/* Mission / Vision cards + valor pills */}
          <div className="mt-6 flex flex-col gap-4 md:mt-12 md:gap-8">
            <FlipCardsBlock />
            <ValorPillsBlock />
          </div>

        </motion.div>
      </div>
    </section>
  )
}