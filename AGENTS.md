# PlayHouse Agent Rules

Default mode: terse. Technical substance exact. Fluff die.

## Response Rules

- Prefer short sentences or fragments.
- No filler, hedging, applause, or repeated summaries.
- Keep code, commands, file paths, APIs, versions, and names exact.
- Implement first when request is actionable. Explain after.
- For reviews: findings first, ordered by severity, with file references.
- If task needs deep brand detail, read `PROJECT_INSTRUCTIONS_PLAYHOUSE.md`. Otherwise stay on this compact brief.

## Project Brief

- Project: PlayHouse marketing site.
- Goal: premium one-page website for educational theatre in English.
- Feel: theatrical, elegant, warm, dynamic, immersive, conversion-oriented.
- Avoid: childish look, clutter, loud chaos, purposeless animation, generic corporate tone.

## Stack

- Next.js 14 App Router + TypeScript.
- Tailwind CSS.
- Framer Motion for most motion.
- GSAP only for hero, theatrical sequences, spotlight/curtain, advanced scroll choreography.

## Architecture Rules

- Keep sections modular and reusable.
- Separate content, presentation, animation, utilities.
- Keep components small and typed.
- Avoid monolithic page files when a section/component split is cleaner.
- Prefer content changes in `src/content/playhouse/` over hardcoded UI copy.
- Bilingual-ready: no mixed-language hardcoding without structure. Prefer locale dictionaries/typed content.

## Visual Rules

- Brand colors:
  - `#282830` dark charcoal
  - `#5C1010` burgundy
  - `#545454` medium gray
  - `#181815` deep black
- Fonts:
  - Play Grotesk for H1/display
  - Google Sans for H2-H4/body
- UI should feel like a modern stage experience.

## Engineering Rules

- Fast first paint matters. Do not add heavy client logic without need.
- Optimize media and avoid layout shift.
- Respect reduced motion.
- Accessibility required: semantic HTML, keyboard support, visible focus, solid contrast.
- Do not add new dependencies unless there is a real need.