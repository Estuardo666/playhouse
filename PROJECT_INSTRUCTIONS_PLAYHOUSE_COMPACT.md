# PlayHouse Compact Brief

## Purpose

Build a fast, premium, one-page marketing site for PlayHouse: educational theatre blending theatre, music, pedagogy, and English learning.

## Core Feel

- theatrical
- elegant
- warm
- immersive
- dynamic
- premium but accessible
- artistic without losing clarity

Avoid childish school aesthetics, generic corporate layouts, loud color chaos, and animation with no narrative purpose.

## Main Sections

1. Hero
2. About
3. Mission / Vision
4. Shows
5. Workshops
6. Artistic Residency
7. Materials
8. Gallery
9. Team
10. Contact / CTA

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion for most UI motion
- GSAP only for hero and complex theatrical sequences

## Design Tokens

- `#282830` dark charcoal
- `#5C1010` burgundy
- `#545454` medium gray
- `#181815` deep black
- Play Grotesk: H1/display
- Google Sans: H2-H4/body

## Build Rules

- Keep components modular, typed, and reusable.
- Separate content, presentation, animation, and utilities.
- Prefer content dictionaries over hardcoded mixed-language strings.
- Support `es` and `en` architecture from the start.
- Optimize images and animation impact on performance.
- Respect reduced motion and accessibility defaults.

## Editing Heuristics

- Prefer updating `src/content/playhouse/` for text/content structure.
- Use `src/components/` for reusable UI/layout pieces.
- Avoid large client-only sections unless interaction truly needs them.
- Keep GSAP targeted. Do not spread it everywhere.