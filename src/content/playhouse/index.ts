export interface PlayhouseContent {
  hero: {
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
  }
  about: {
    title: string
    description: string
    stats: Array<{ label: string; value: string }>
  }
  mission: {
    title: string
    visionTitle: string
    mission: string
    vision: string
  }
  shows: Array<{
    title: string
    subtitle: string
    ageRange: string
    duration: string
    image: string
    description: string
  }>
  workshops: Array<{
    title: string
    description: string
    duration: string
    ageRange: string
    image: string
  }>
  residency: {
    title: string
    description: string
    benefits: string[]
    cta: string
  }
  materials: Array<{
    title: string
    type: string
    description: string
    image: string
  }>
  gallery: Array<{
    image: string
    alt: string
    caption: string
  }>
  team: Array<{
    name: string
    role: string
    image: string
    bio: string
  }>
  contact: {
    title: string
    subtitle: string
    email: string
    phone: string
    address: string
  }
}

export const playhouseContent = {
  en: {
    hero: {
      title: "Playhouse",
      subtitle: "Interactive educational theatre blending music, pedagogy, and English learning",
      ctaPrimary: "Discover Our Shows",
      ctaSecondary: "Book a Workshop",
    },
    about: {
      title: "About Playhouse",
      description: "Playhouse creates immersive theatrical experiences that transform English learning into an artistic adventure. Our methodology combines drama techniques, music, and pedagogy to engage children and youth in meaningful language acquisition.",
      stats: [
        { label: "Shows Created", value: "25+" },
        { label: "Workshops Delivered", value: "150+" },
        { label: "Children Impacted", value: "5,000+" },
        { label: "Years Experience", value: "8" },
      ],
    },
    mission: {
      title: "Mission & Vision",
      visionTitle: "Why We Exist",
      mission:
        "To turn language learning into a living, creative, and emotionally memorable experience through theatre, music, and play.",
      vision:
        "To become a leading educational theatre platform for schools, families, and cultural institutions seeking meaningful bilingual learning experiences.",
    },
    shows: [
      {
        title: "The Singing Forest",
        subtitle: "A musical journey in English",
        ageRange: "5-9 years",
        duration: "45 min",
        image: "/media/shows/singing-forest.jpg",
        description:
          "An immersive show where children sing, move, and solve small stage challenges while discovering new English vocabulary.",
      },
      {
        title: "Captain Word and the Lost Map",
        subtitle: "Adventure theatre for schools",
        ageRange: "7-12 years",
        duration: "50 min",
        image: "/media/shows/captain-word.jpg",
        description:
          "A playful theatrical expedition that mixes storytelling, audience participation, and classroom-friendly English content.",
      },
    ],
    workshops: [
      {
        title: "Drama & English Lab",
        description:
          "A hands-on workshop where students build confidence through improvisation, movement, and spoken English.",
        duration: "60-90 min",
        ageRange: "6-14 years",
        image: "/media/workshops/drama-lab.jpg",
      },
      {
        title: "Storytelling in Motion",
        description:
          "Creative sessions that connect body expression, rhythm, and bilingual storytelling for schools and families.",
        duration: "90 min",
        ageRange: "5-10 years",
        image: "/media/workshops/storytelling-motion.jpg",
      },
    ],
    residency: {
      title: "Artistic Residency",
      description:
        "A deeper collaboration format for schools and institutions that integrates theatre-making, teacher support, and a final staged experience.",
      benefits: [
        "Custom educational design",
        "Teacher collaboration",
        "Student-led creative process",
        "Final public presentation",
      ],
      cta: "Plan a Residency",
    },
    materials: [
      {
        title: "Teacher Guides",
        type: "Downloadable PDF",
        description:
          "Pedagogical support materials to extend the theatrical experience into the classroom.",
        image: "/media/materials/teacher-guides.jpg",
      },
      {
        title: "Activity Cards",
        type: "Printable Resource",
        description:
          "Ready-to-use creative prompts for English practice, movement, and dramatic play.",
        image: "/media/materials/activity-cards.jpg",
      },
    ],
    gallery: [
      {
        image: "/media/gallery/gallery-1.jpg",
        alt: "Children participating in a Playhouse performance",
        caption: "Stage moments that invite participation and imagination.",
      },
      {
        image: "/media/gallery/gallery-2.jpg",
        alt: "Workshop session with movement and music",
        caption: "Workshops designed around rhythm, language, and collaboration.",
      },
    ],
    team: [
      {
        name: "Playhouse Creative Team",
        role: "Artists, educators, and facilitators",
        image: "/media/team/team-1.jpg",
        bio: "A multidisciplinary team with experience in theatre, music education, and bilingual pedagogy.",
      },
      {
        name: "Partner Teaching Network",
        role: "School and community collaborators",
        image: "/media/team/team-2.jpg",
        bio: "Educators and institutions that help adapt each experience to its local learning context.",
      },
    ],
    contact: {
      title: "Bring Playhouse to Your Community",
      subtitle: "We collaborate with schools, cultural spaces, teachers, and families.",
      email: "hello@Playhouse.com",
      phone: "+34 600 000 000",
      address: "Barcelona, Spain",
    },
  } as const,
  es: {
    hero: {
      title: "Playhouse",
      subtitle: "Teatro educativo interactivo que combina música, pedagogía y aprendizaje de inglés",
      ctaPrimary: "Descubre Nuestros Shows",
      ctaSecondary: "Reserva un Taller",
    },
    about: {
      title: "Sobre Playhouse",
      description: "Playhouse crea experiencias teatrales inmersivas que transforman el aprendizaje del inglés en una aventura artística. Nuestra metodología combina técnicas dramáticas, música y pedagogía para involucrar a niños y jóvenes en la adquisición significativa del idioma.",
      stats: [
        { label: "Shows Creados", value: "25+" },
        { label: "Talleres Realizados", value: "150+" },
        { label: "Niños Impactados", value: "5,000+" },
        { label: "Años de Experiencia", value: "8" },
      ],
    },
    mission: {
      title: "Misión y Visión",
      visionTitle: "Por Qué Existimos",
      mission:
        "Transformar el aprendizaje del inglés en una experiencia viva, creativa y emocionalmente memorable a través del teatro, la música y el juego.",
      vision:
        "Ser una plataforma referente de teatro educativo para escuelas, familias e instituciones culturales que buscan experiencias bilingües con impacto real.",
    },
    shows: [
      {
        title: "El Bosque que Canta",
        subtitle: "Un viaje musical en inglés",
        ageRange: "5-9 años",
        duration: "45 min",
        image: "/media/shows/singing-forest.jpg",
        description:
          "Un show inmersivo donde niños y niñas cantan, se mueven y resuelven desafíos escénicos mientras descubren vocabulario en inglés.",
      },
      {
        title: "Captain Word y el Mapa Perdido",
        subtitle: "Aventura teatral para escuelas",
        ageRange: "7-12 años",
        duration: "50 min",
        image: "/media/shows/captain-word.jpg",
        description:
          "Una expedición teatral participativa que mezcla storytelling, humor y contenidos de inglés adaptados al entorno escolar.",
      },
    ],
    workshops: [
      {
        title: "Laboratorio de Drama & English",
        description:
          "Un taller práctico donde el alumnado gana confianza mediante improvisación, movimiento y expresión oral en inglés.",
        duration: "60-90 min",
        ageRange: "6-14 años",
        image: "/media/workshops/drama-lab.jpg",
      },
      {
        title: "Storytelling en Movimiento",
        description:
          "Sesiones creativas que conectan expresión corporal, ritmo y narración bilingüe para escuelas y familias.",
        duration: "90 min",
        ageRange: "5-10 años",
        image: "/media/workshops/storytelling-motion.jpg",
      },
    ],
    residency: {
      title: "Residencia Artística",
      description:
        "Un formato de colaboración profunda para escuelas e instituciones que integra creación escénica, acompañamiento docente y una experiencia final compartida.",
      benefits: [
        "Diseño educativo a medida",
        "Trabajo conjunto con docentes",
        "Proceso creativo con protagonismo estudiantil",
        "Presentación final abierta",
      ],
      cta: "Diseñar una Residencia",
    },
    materials: [
      {
        title: "Guías para Docentes",
        type: "PDF descargable",
        description:
          "Material pedagógico para extender la experiencia teatral dentro del aula.",
        image: "/media/materials/teacher-guides.jpg",
      },
      {
        title: "Tarjetas de Actividades",
        type: "Recurso imprimible",
        description:
          "Propuestas listas para usar en práctica de inglés, movimiento y juego dramático.",
        image: "/media/materials/activity-cards.jpg",
      },
    ],
    gallery: [
      {
        image: "/media/gallery/gallery-1.jpg",
        alt: "Niños participando en una función de Playhouse",
        caption: "Escenas pensadas para activar imaginación, escucha y participación.",
      },
      {
        image: "/media/gallery/gallery-2.jpg",
        alt: "Taller con música y movimiento",
        caption: "Talleres donde el idioma se aprende con cuerpo, ritmo y juego.",
      },
    ],
    team: [
      {
        name: "Equipo Creativo Playhouse",
        role: "Artistas, educadores y facilitadores",
        image: "/media/team/team-1.jpg",
        bio: "Un equipo multidisciplinar con experiencia en artes escénicas, educación musical y pedagogía bilingüe.",
      },
      {
        name: "Red de Docentes Aliados",
        role: "Colaboradores escolares y comunitarios",
        image: "/media/team/team-2.jpg",
        bio: "Profesionales e instituciones que ayudan a adaptar cada experiencia a su contexto educativo.",
      },
    ],
    contact: {
      title: "Lleva Playhouse a Tu Comunidad",
      subtitle: "Colaboramos con escuelas, espacios culturales, docentes y familias.",
      email: "hola@playhouse.com",
      phone: "+34 600 000 000",
      address: "Barcelona, España",
    },
  } as const,
} satisfies Record<string, PlayhouseContent>

export type Locale = keyof typeof playhouseContent

export function getContent(locale: Locale = "es"): PlayhouseContent {
  return playhouseContent[locale]
}
