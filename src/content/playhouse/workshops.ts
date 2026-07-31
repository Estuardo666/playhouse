import type { SupportedLocale } from "@/content/config"

export interface WorkshopTranslation {
  subtitle: string
  description: string
  objectives: string[]
  methodology: string
  outcomes: string[]
}

export interface Workshop {
  id: string
  title: string
  image: string
  imageAlt: string
  gallery: [string, string, string]
  en: WorkshopTranslation
  es: WorkshopTranslation
}

export type LocalizedWorkshop = Omit<Workshop, "en" | "es"> & WorkshopTranslation

export function getLocalizedWorkshop(w: Workshop, locale: SupportedLocale): LocalizedWorkshop {
  const { en: _en, es: _es, ...base } = w
  return { ...base, ...w[locale] }
}

export function getLocalizedWorkshops(workshops: Workshop[], locale: SupportedLocale): LocalizedWorkshop[] {
  return workshops.map((w) => getLocalizedWorkshop(w, locale))
}

export const WORKSHOPS: Workshop[] = [
  {
    id: "introduction-to-theatre",
    title: "Introduction to Theatre",
    image: "/media/updated/workshops/workshop-01.jpg",
    imageAlt: "Introduction to theatre workshop",
    gallery: [
      "/media/updated/workshops/workshop-01.jpg",
      "/media/updated/workshops/workshop-01.jpg",
      "/media/updated/workshops/workshop-01.jpg",
    ],
    en: {
      subtitle: "Voice, body, space and character in English",
      description:
        "This workshop introduces the foundations of theatre through games and expressive tools, helping students interact in English naturally and confidently.",
      objectives: [
        "Learn and experience the fundamentals of theatre: voice, body, space, and character.",
        "Encourage collaborative work in English through theatre games.",
        "Develop confidence and spontaneity in oral communication.",
      ],
      methodology:
        "Warm-up exercises, theatre games, and small-group improvisations are used, with short scene performances in English when time allows.",
      outcomes: [
        "Active and confident participation in theatre-based activities in English.",
        "Initial development of simple characters and scenes.",
        "Increased confidence in oral expression.",
      ],
    },
    es: {
      subtitle: "Voz, cuerpo, espacio y personaje en inglés",
      description:
        "Un taller ideal para que los estudiantes se acerquen al inglés de manera lúdica usando cuerpo, voz y emociones como herramientas expresivas.",
      objectives: [
        "Aprender los fundamentos del teatro: voz, cuerpo, espacio y personaje.",
        "Fomentar el trabajo colaborativo en inglés a través de juegos teatrales.",
        "Desarrollar confianza y espontaneidad en la comunicación oral.",
      ],
      methodology:
        "Se utilizan ejercicios de calentamiento, juegos teatrales e improvisaciones en grupos pequeños, con representaciones escénicas cortas en inglés cuando el tiempo lo permite.",
      outcomes: [
        "Participación activa y confiada en actividades teatrales en inglés.",
        "Desarrollo inicial de personajes y escenas simples.",
        "Mayor seguridad en la expresión oral.",
      ],
    },
  },
  {
    id: "storytelling",
    title: "Storytelling",
    image: "/media/updated/workshops/workshop-02.jpg",
    imageAlt: "Storytelling workshop",
    gallery: [
      "/media/updated/workshops/workshop-02.jpg",
      "/media/updated/workshops/workshop-02.jpg",
      "/media/updated/workshops/workshop-02.jpg",
    ],
    en: {
      subtitle: "Narrative creation to strengthen English communication",
      description:
        "Storytelling connects emotion and language, helping students structure ideas, build narratives, and communicate clearly in English.",
      objectives: [
        "Identify story structure: beginning, conflict, climax, and resolution.",
        "Create original characters and plots in English.",
        "Develop oral and performance-based storytelling skills.",
      ],
      methodology:
        "Students use improvisation games, dramatization of known stories, and collective creation to build original narratives for class sharing.",
      outcomes: [
        "Creation of short stories in English.",
        "Improved ability to structure and communicate ideas clearly.",
        "Enhanced imagination and creative storytelling.",
      ],
    },
    es: {
      subtitle: "Narración creativa para fortalecer la comunicación en inglés",
      description:
        "La narración fortalece el inglés desde la emoción y la estructura de las historias. Este taller ayuda a construir personajes, tramas y relatos originales en inglés.",
      objectives: [
        "Identificar la estructura narrativa: inicio, conflicto, clímax y resolución.",
        "Crear personajes y tramas originales en inglés.",
        "Desarrollar habilidades de narración oral y performativa.",
      ],
      methodology:
        "Los estudiantes usan juegos de improvisación, dramatización de historias conocidas y creación colectiva para construir narrativas originales.",
      outcomes: [
        "Creación de historias breves en inglés.",
        "Mejor organización y expresión de ideas.",
        "Desarrollo de imaginación y creatividad.",
      ],
    },
  },
  {
    id: "improv-theatre",
    title: "Improv Theatre",
    image: "/media/updated/workshops/workshop-03.jpg",
    imageAlt: "Improv theatre workshop",
    gallery: [
      "/media/updated/workshops/workshop-03.jpg",
      "/media/updated/workshops/workshop-03.jpg",
      "/media/updated/workshops/workshop-03.jpg",
    ],
    en: {
      subtitle: "Spontaneity, listening and fluency through improv",
      description:
        "Improvisation boosts creativity and active listening, reducing anxiety while encouraging spontaneous use of English in meaningful situations.",
      objectives: [
        "Strengthen reaction and improvisation skills in English.",
        "Encourage creativity and spontaneous language use.",
        "Build confidence in spoken interactions.",
      ],
      methodology:
        "Pair and group improv activities follow core rules like 'yes, and...' and culminate in short on-the-spot scenes.",
      outcomes: [
        "Increased fluency in spoken English.",
        "Development of imagination and group collaboration.",
        "Positive attitude toward mistakes and learning.",
      ],
    },
    es: {
      subtitle: "Fluidez y espontaneidad en inglés",
      description:
        "La improvisación fortalece reacción, escucha activa y creatividad. En inglés, ayuda a reducir el miedo al error y mejora la fluidez hablada.",
      objectives: [
        "Fortalecer la capacidad de reacción e improvisación en inglés.",
        "Estimular la creatividad y el uso espontáneo del idioma.",
        "Construir confianza en la interacción oral.",
      ],
      methodology:
        "Las actividades de improvisación en pareja y grupo siguen reglas básicas como 'sí, y...' y culminan en escenas cortas de improvisación.",
      outcomes: [
        "Mayor fluidez en inglés hablado.",
        "Desarrollo de imaginación y colaboración grupal.",
        "Actitud positiva frente al error y al aprendizaje.",
      ],
    },
  },
  {
    id: "musical-theatre",
    title: "Introduction to Musical Theatre",
    image: "/media/updated/workshops/workshop-04.jpg",
    imageAlt: "Introduction to Musical Theatre workshop",
    gallery: [
      "/media/updated/workshops/workshop-04.jpg",
      "/media/updated/workshops/workshop-04.jpg",
      "/media/updated/workshops/workshop-04.jpg",
    ],
    en: {
      subtitle: "Acting, singing & movement in English",
      description:
        "Musical theatre combines acting, singing, and movement, making it a highly engaging multisensory experience. Its rhythmic nature supports vocabulary acquisition and pronunciation in English.",
      objectives: [
        "Explore basic techniques in singing, movement, and acting.",
        "Become familiar with simple musical theatre repertoire in English.",
        "Encourage group coordination and expressive integration.",
      ],
      methodology:
        "Physical and vocal warm-ups will be followed by the preparation of a short musical number or song, including staging.",
      outcomes: [
        "Performance of short musical theatre segments in English.",
        "Improved intonation and pronunciation through singing.",
        "Increased self-confidence and teamwork skills.",
      ],
    },
    es: {
      subtitle: "Voz, movimiento y actuación en inglés",
      description:
        "El teatro musical integra actuación, canto y movimiento en una experiencia multisensorial ideal para aprender inglés de manera dinámica.",
      objectives: [
        "Explorar técnicas básicas de canto, movimiento y actuación.",
        "Familiarizarse con repertorio sencillo de teatro musical en inglés.",
        "Fomentar la coordinación grupal y la expresión artística.",
      ],
      methodology:
        "Calentamientos físicos y vocales dan paso a la preparación de un número musical o canción corta, incluyendo puesta en escena.",
      outcomes: [
        "Presentación de segmentos cortos de teatro musical en inglés.",
        "Mejora en entonación y pronunciación mediante el canto.",
        "Aumento de la autoconfianza y el trabajo en equipo.",
      ],
    },
  },
  {
    id: "students-on-stage",
    title: "Students on Stage",
    image: "/media/updated/workshops/workshop-05.jpg",
    imageAlt: "Students on stage workshop",
    gallery: [
      "/media/updated/workshops/workshop-05.jpg",
      "/media/updated/workshops/workshop-05.jpg",
      "/media/updated/workshops/workshop-05.jpg",
    ],
    en: {
      subtitle: "Performance-based learning in real audience settings",
      description:
        "Stage performance transforms language learning into a memorable real-world communication experience while reinforcing confidence and collaboration.",
      objectives: [
        "Experience theatrical performance in English.",
        "Strengthen personal confidence in public settings.",
        "Integrate skills acquired in other workshops.",
      ],
      methodology:
        "Students prepare and perform short scenes in English, developing stage presence, confidence, and collaborative practice.",
      outcomes: [
        "Confident performance of theatrical scenes in English.",
        "Development of presentation and communication skills.",
        "Creation of positive memories linked to language learning.",
      ],
    },
    es: {
      subtitle: "Experiencia escénica real en inglés",
      description:
        "La experiencia de presentarse frente a un público convierte el inglés en una vivencia real y memorable.",
      objectives: [
        "Vivir la experiencia de actuación en inglés.",
        "Fortalecer la confianza en contextos públicos.",
        "Integrar habilidades adquiridas en otros talleres.",
      ],
      methodology:
        "Los estudiantes preparan y presentan escenas cortas en inglés, desarrollando presencia escénica, confianza y práctica colaborativa.",
      outcomes: [
        "Presentación confiada de escenas en inglés.",
        "Desarrollo de habilidades de comunicación y escena.",
        "Memorias positivas vinculadas al aprendizaje del idioma.",
      ],
    },
  },
  {
    id: "classroom-guest",
    title: "Classroom Guest",
    image: "/media/updated/workshops/workshop-06.jpg",
    imageAlt: "Classroom guest workshop",
    gallery: [
      "/media/updated/workshops/workshop-06.jpg",
      "/media/updated/workshops/workshop-06.jpg",
      "/media/updated/workshops/workshop-06.jpg",
    ],
    en: {
      subtitle: "A visiting teaching artist experience",
      description:
        "An external theatre guest brings a fresh and memorable classroom dynamic, combining creativity, culture, and practical English interaction.",
      objectives: [
        "Provide students with a different and memorable classroom experience.",
        "Expose students to innovative theatrical and linguistic dynamics.",
        "Reinforce English learning in a practical and fun way.",
      ],
      methodology:
        "The session adapts to teacher and group needs through theatre activities, language games, and participatory English dynamics for short-term impact.",
      outcomes: [
        "Students feel motivated and excited about learning English.",
        "Increased participation and engagement during the session.",
        "Positive feedback from both students and teachers.",
      ],
    },
    es: {
      subtitle: "Intervención en aula con artista docente",
      description:
        "La presencia de un artista docente introduce una dinámica novedosa en clase y activa una experiencia corta, creativa y motivadora en inglés.",
      objectives: [
        "Brindar una experiencia distinta y memorable en el aula.",
        "Exponer a los estudiantes a dinámicas teatrales y lingüísticas innovadoras.",
        "Reforzar el aprendizaje del inglés de manera práctica y divertida.",
      ],
      methodology:
        "La sesión se adapta a las necesidades del docente y el grupo a través de actividades teatrales, juegos de lenguaje y dinámicas participativas en inglés.",
      outcomes: [
        "Mayor motivación hacia el aprendizaje del inglés.",
        "Más participación y compromiso en la sesión.",
        "Retroalimentación positiva de estudiantes y docentes.",
      ],
    },
  },
]
