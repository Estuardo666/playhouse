# PROJECT_INSTRUCTIONS.md

## Project name
PlayHouse — Educational Theatre One Page Website

## Project overview
This repository contains the marketing website for **PlayHouse**, an educational theatre project that combines **theatre, music, pedagogy, and English learning** through shows, workshops, artistic residencies, educational materials, and immersive experiences for children, youth, schools, teachers, and families.

The website must feel like a **living stage**: expressive, premium, playful, immersive, and emotionally engaging, while still being clear, structured, fast, and conversion-oriented.

Core brand foundations used in this repo:
- Educational theatre in English
- Shows, workshops, artistic residencies, and downloadable materials
- Bilingual communication (Spanish / English)
- Strong artistic identity with pedagogical credibility
- More than 15 years of experience in performing arts and teaching

Source content baseline for this repo comes from the PlayHouse project information provided by the client.

---

## Main objective
Build a **high-end interactive one page website** that presents PlayHouse as an innovative educational theatre brand and helps convert visitors into:
- schools interested in shows or residencies
- parents and families interested in workshops and performances
- teachers and institutions looking for educational materials
- collaborators or partners interested in the project

The site must not feel like a generic corporate template. It must feel **theatrical, musical, immersive, and modern**, while remaining usable and accessible.

---

## Primary website sections
The one page should be modular and built around these sections:

1. Hero / Opening stage moment
2. About PlayHouse
3. Mission / Vision
4. Our Shows
5. Workshops
6. Artistic Residency
7. Materials
8. Gallery
9. Meet the Team
10. Contact / CTA / Form / Social links

All sections must be architected as reusable blocks.

---

## Tech stack
Use this stack unless explicitly changed:

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion / Motion** for most UI and layout animations
- **GSAP** only for high-impact sequences, such as hero storytelling, parallax, stage reveals, or scroll-based choreography
- **Optional:** Lenis only if smooth scrolling is truly needed and does not hurt UX/performance

Do not over-engineer. The stack must stay clean and production-ready.

---

## Animation strategy
This project is animation-heavy, but animation must feel intentional.

### Use Motion for:
- entrance animations
- hover/tap states
- stagger reveals
- card transitions
- layout shifts
- section-level scroll reveals
- simple parallax or transforms when possible

### Use GSAP only for:
- hero opening sequence
- theatrical timeline sequences
- spotlight / curtain / layered stage effects
- advanced scroll choreography
- complex transforms or fine-tuned sequences

### Animation principles
- Animations must support storytelling, not distract from it
- Do not animate every single element excessively
- Favor layered depth, timing, rhythm, and theatrical reveal
- Motion should feel like stage transitions, set changes, light cues, and scene entrances
- Avoid cheap-looking effects, random bouncing, or gimmicky motion
- Respect reduced motion preferences

---

## Visual direction
The website should feel:
- theatrical
- elegant
- dynamic
- immersive
- warm
- creative
- premium but accessible
- artistic without losing clarity
- Play Grotesk for Titles H1
- Google Sans for H2, H3, H4 and body text
- Fonts are in /public/fonts

The UI should communicate the idea of a **modern stage experience**.

### Visual cues to explore
- curtain / stage opening feel
- dramatic lighting / spotlight accents
- poster-like sections for shows
- layered backgrounds with depth
- musical rhythm in transitions
- editorial typography with strong contrast
- immersive full-screen hero

### Avoid
- childish generic school aesthetics
- cluttered layouts
- loud color chaos
- animations with no narrative purpose
- overuse of glassmorphism unless subtle and justified

---

## Content and tone
The project is artistic and educational at the same time.

Tone must be:
- inspiring
- creative
- trustworthy
- expressive
- emotionally warm
- pedagogically credible

The copy should balance:
- theatrical emotion
- educational clarity
- professional credibility
- conversion intent

Do not make the site sound too corporate or too academic. It should feel human, artistic, and alive.

---

## Bilingual architecture
The website should be prepared for **Spanish and English** content.

Requirements:
- do not hardcode mixed bilingual text in the same UI component without structure
- content should be organized so language switching is possible later without rewriting UI
- prefer typed content objects or dictionaries by locale
- route-level i18n is optional initially, but architecture should allow it later

At minimum, design content in a way that can support:
- `es`
- `en`

---

## Architecture rules
Use a clean, scalable, modular structure.

Recommended approach:
- each main section as an isolated feature or block
- separate content, presentation, animation logic, and utility logic
- keep components small and composable
- centralize tokens and reusable UI primitives
- avoid giant monolithic page files

### Suggested folder direction
```txt
src/
  app/
    (marketing)/
      page.tsx
      layout.tsx
  components/
    ui/
    layout/
    motion/
  features/
    playhouse/
      hero/
      about/
      shows/
      workshops/
      residency/
      materials/
      gallery/
      team/
      contact/
  content/
    playhouse/
      site-content.ts
      navigation.ts
  lib/
    animation/
    utils/
    seo/
  styles/
```

This is guidance, not a rigid requirement. The repo may evolve, but must remain organized.

---

## Component rules
All components must:
- be fully typed with TypeScript
- accept explicit props interfaces
- be reusable
- avoid tight coupling
- avoid magic numbers when a token or constant is more appropriate
- keep logic readable and maintainable
- support responsive behavior from the start
- be accessible by default

If a component becomes too large, split it.

---

## Styling rules
- Use Tailwind cleanly and consistently
- Centralize reusable design decisions where possible
- Use spacing, radius, shadows, and typography systematically
- Prefer semantic utility composition over messy inline duplication
- Keep a premium visual rhythm and good whitespace

Do not ship inconsistent spacing or ad hoc styling.

---

## Performance rules
This is a visual website, but it still must be fast.

Requirements:
- optimize images and media
- lazy load heavy sections where appropriate
- do not block initial render with unnecessary animation logic
- keep GSAP usage targeted
- avoid excessive client-only rendering unless necessary
- minimize layout shift
- keep Lighthouse-minded decisions in place

Animation quality must not destroy performance.

---

## Accessibility rules
Accessibility is required.

Requirements:
- semantic HTML
- keyboard-friendly navigation
- good color contrast
- visible focus states
- reduced motion support
- alt text for meaningful imagery
- proper heading hierarchy

Do not sacrifice usability for visual effects.

---

## SEO rules
Even though this is a one page experience, it must still be SEO-conscious.

Requirements:
- clear metadata
- structured headings
- descriptive section copy
- accessible text content, not only decorative visuals
- shareable Open Graph setup
- clean semantic structure

Potential keyword territories include:
- educational theatre
- theatre in English
- English learning through theatre
- workshops in English
- musical theatre for students
- artistic residency for schools

---

## Forms and CTA rules
The website should help users take action.

Primary CTAs may include:
- book a show
- request information
- contact us
- book a workshop
- access materials

All forms and CTA areas must feel easy and visible, not buried.

Contact references provided by the client include phone, email, social links, and Google Forms links.

---

## Media handling
This project may rely heavily on:
- show photography
- rehearsal photography
- cast and team photos
- posters
- educational materials
- embedded or linked video

Media should be architected so it can evolve later into:
- CMS-driven content
- cloud storage-backed content
- downloadable educational material blocks

Do not hardcode media in ways that make future updates painful.

---

## Engineering principles
Follow these engineering principles:
- clarity over cleverness
- modularity over shortcuts
- maintainability over hacks
- progressive enhancement over fragile spectacle
- production readiness over demo-only code

When implementing new features:
1. define the purpose clearly
2. keep contracts typed
3. isolate complexity
4. preserve performance
5. preserve accessibility
6. avoid technical debt

---

## What the AI assistant working on this repo must do
When generating or editing code in this repository, the assistant must:
- preserve the architecture and modularity of the repo
- avoid large, bloated files
- avoid mixing content, animation logic, and UI structure carelessly
- prefer reusable section components
- keep animations elegant and purposeful
- preserve bilingual readiness
- optimize for performance and accessibility
- write production-ready code, not quick prototypes
- explain major structural decisions briefly in comments or commit notes when useful

The assistant must not:
- create giant page files with all sections inline
- overuse GSAP where Motion is enough
- introduce unnecessary dependencies
- add fragile animation hacks
- break responsive layout for desktop-only aesthetics
- hardcode scattered content everywhere

---

## Initial build priorities
When starting the repo, prioritize this order:

1. Project setup
2. Global layout and design foundation
3. Navigation and section shell
4. Hero section with premium first impression
5. Core sections scaffolded with placeholder content structure
6. Animation system / reusable motion helpers
7. Content refinement
8. CTA and contact integration
9. Performance / accessibility pass
10. SEO pass

---

## Definition of done
A task is not done unless:
- code is typed and readable
- sections are modular
- responsive behavior works
- animations feel polished and intentional
- accessibility basics are covered
- performance remains reasonable
- the result feels premium and aligned with the PlayHouse identity

---

## Final quality bar
This site should feel like:
- a modern promotional website
- a theatrical digital experience
- an educational brand with artistic depth
- a polished production, not a generic template

The final result should make users feel that PlayHouse is creative, professional, memorable, and worth contacting.
