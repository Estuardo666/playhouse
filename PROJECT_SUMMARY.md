# PlayHouse Marketing Website

Web marketing para **PlayHouse**, compañía de teatro educativo que combina teatro, música, pedagogía y aprendizaje de inglés para niños y jóvenes.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Lenguaje | TypeScript (strict) |
| UI | React 18.3 |
| Estilos | Tailwind CSS 3.4 + PostCSS |
| Animaciones | Framer Motion 11 + GSAP 3.12 (ScrollTrigger) |
| Componentes UI | Radix UI, CVA (class-variance-authority) |
| Iconos | Lucide React |
| Build | Next.js (turbopack en dev) |
| Linting | ESLint + eslint-config-next |
| Base de datos | Ninguna — contenido estático |
| Package manager | npm |

## Línea Gráfica

- **Fondo oscuro** `#181815` (casi negro, cálido)
- **Dorado** `#d4af37` — acento primario, CTAs, hover states
- **Rojo profundo** `#8b0000` — badges, pills, scrollbar, CTAs secundarios
- **Crema** `#fdf6e3` — fondos de secciones claras
- **Tipografía:** Play Grotesk (H1/display), Google Sans (body/UI), Inter (fallback), Playfair Display (serif accent)
- **Efectos visuales:** Grain overlay (SVG noise), red tint radial, stage lighting dorado, curtain clip-path transitions, spotlight glow
- **Letter-spacing apretado** en headings (h1: `-0.065em`)
- **Sistema de diseño:** shadcn/ui pattern — tokens HSL en CSS variables, CVA variants, `cn()` utility
- **Cursor custom** SVG con rotación direccional + ring interactivo en hover
- **Smooth scroll** custom con física smoothDamp (no Lenis)
- **Scrollbar custom** con gradiente rojo, auto-hide

### Botones (5 variantes)

| Variante | Color |
|---|---|
| primary | Gold |
| secondary | Gold bordered |
| ghost | Transparente |
| outline | Deep red |
| destructive | Deep red fill |

CTA signature: `ShiftButton` — pill animado con flecha que colapsa/expande en hover.

### Filosofía de Animación

- **Patrón signature:** `blur(10-14px) + opacity(0) + y(28px)` → `blur(0) + opacity(1) + y(0)` con spring easing `[0.34, 1.56, 0.64, 1]`
- Framer Motion: entrance, hover/tap, stagger, scroll-triggered, layout, parallax
- GSAP: hero opening (scale+blur en scroll), ScrollTrigger parallax
- Soporte `prefers-reduced-motion` implementado

## Estado Actual

### Secciones completas

| Sección | Archivo |
|---|---|
| Layout raíz (fonts, cursor, nav, grain) | `src/app/layout.tsx` |
| Navegación pill fija con blur backdrop | `src/components/layout/navigation.tsx` |
| Hero fullscreen (GSAP parallax, image bg) | `src/components/layout/hero.tsx` |
| About (blur text reveal, image grid) | `src/components/sections/about.tsx` |
| Mission/Vision (flip cards, valor pills magnet) | `src/components/sections/mission-vision.tsx` |
| Team (wave carousel, 11 miembros reales) | `src/components/sections/team.tsx` |
| Loading page | `src/app/(marketing)/loading.tsx` |
| 404 page | `src/app/(marketing)/not-found.tsx` |

### Secciones pendientes (placeholder vacío)

- Shows
- Workshops
- Artistic Residency
- Materials
- Gallery
- Contact

### Contenido listo pero no conectado

- Contenido bilingüe (ES/EN) completo en `src/content/playhouse/index.ts`
- Componente `FanCarousel` (construido, sin usar)
- `SectionShell` layout component
- SEO utility (`generateSeo`)

## Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css              # Tailwind + fonts + CSS vars + overlays
│   ├── layout.tsx               # Root layout
│   └── (marketing)/
│       ├── page.tsx             # Página principal
│       ├── loading.tsx
│       └── not-found.tsx
├── components/
│   ├── layout/
│   │   ├── container.tsx
│   │   ├── custom-scrollbar-pro.tsx
│   │   ├── hero.tsx
│   │   ├── navigation.tsx
│   │   ├── section-shell.tsx
│   │   └── sexy-scroll.tsx
│   ├── sections/
│   │   ├── about.tsx
│   │   ├── mission-vision.tsx
│   │   └── team.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── directional-cursor.tsx
│       ├── fan-carousel.tsx
│       ├── gradual-blur.tsx
│       ├── shift-button.tsx
│       └── wave-carousel.tsx
├── content/
│   ├── config.ts                # Locale config (es/en)
│   └── playhouse/
│       ├── index.ts             # Contenido bilingüe completo
│       └── team.ts              # 11 miembros del equipo
└── lib/
    ├── animations/
    │   ├── gsap.ts              # Hero timeline, parallax, stagger
    │   └── motion.tsx           # MotionContainer, FadeIn, Stagger
    ├── seo.ts
    └── utils.ts                 # cn(), safeQuerySelector, prefersReducedMotion
```

## Fase del Proyecto

**Fase 1-3 completas** (fundación, layout, secciones core). **Fase 4-5 pendientes** (secciones de features, integración, contenido bilingüe, SEO, optimización).

---

*Última actualización: 2026-04-19*
