import type { SupportedLocale } from "@/content/config"

export type BlogPost = {
  slug: string
  date: string
  title: string
  description: string
  intro: string
  sections: Array<{ heading: string; paragraphs: string[] }>
  cta: string
}

const posts: Record<string, Record<SupportedLocale, BlogPost>> = {
  "aprender-ingles-con-teatro-y-musica": {
    es: {
      slug: "aprender-ingles-con-teatro-y-musica", date: "2026-07-31",
      title: "Aprender inglés con teatro y música: por qué funciona",
      description: "Descubre cómo el teatro, la música y el movimiento ayudan a practicar inglés de forma activa y memorable.",
      intro: "Aprender un idioma no tiene que limitarse a memorizar listas de palabras. El teatro y la música crean situaciones donde el inglés se escucha, se repite y se usa con una intención real.",
      sections: [
        { heading: "El idioma entra en contexto", paragraphs: ["Una escena, una canción o una historia ofrecen contexto para comprender vocabulario y expresiones. El estudiante no aprende una palabra aislada: la relaciona con una acción, una emoción y una situación."] },
        { heading: "La práctica se vuelve participativa", paragraphs: ["Actuar, cantar y moverse reduce el miedo a equivocarse. La repetición aparece de manera natural y cada estudiante puede participar desde sus fortalezas."] },
        { heading: "Una experiencia para recordar", paragraphs: ["Cuando el aprendizaje está ligado a una experiencia emocional, es más fácil recuperar el lenguaje después. Por eso el teatro educativo puede complementar las clases de inglés y la vida escolar."] },
      ], cta: "Conoce nuestras experiencias de teatro en inglés.",
    },
    en: {
      slug: "aprender-ingles-con-teatro-y-musica", date: "2026-07-31",
      title: "Learning English through theatre and music",
      description: "See how theatre, music, and movement make English practice active and memorable.",
      intro: "Language learning does not have to stop at vocabulary lists. Theatre and music create situations where English is heard, repeated, and used with a real purpose.",
      sections: [
        { heading: "Language in context", paragraphs: ["A scene, song, or story gives vocabulary a context. Students connect words with action, emotion, and a situation."] },
        { heading: "Participation builds confidence", paragraphs: ["Acting, singing, and moving lower the fear of making mistakes. Repetition becomes natural and every student can participate through their strengths."] },
        { heading: "An experience that stays", paragraphs: ["When learning is connected to emotion, students can retrieve language more easily later. Educational theatre can complement English classes and school life."] },
      ], cta: "Explore our English theatre experiences.",
    },
  },
  "beneficios-del-teatro-en-ingles-para-ninos": {
    es: {
      slug: "beneficios-del-teatro-en-ingles-para-ninos", date: "2026-07-31",
      title: "Beneficios del teatro en inglés para niños",
      description: "Cinco beneficios de practicar inglés mediante actuación, canciones, movimiento y juego dramático.",
      intro: "El teatro en inglés combina comunicación, imaginación y colaboración. Es una actividad artística que también puede apoyar la confianza y la comprensión del idioma.",
      sections: [
        { heading: "Más confianza para hablar", paragraphs: ["Los personajes permiten probar nuevas palabras en un espacio seguro. Poco a poco, el niño se anima a expresarse con más claridad."] },
        { heading: "Escucha y pronunciación", paragraphs: ["Las canciones, diálogos y juegos de repetición ayudan a distinguir sonidos, ritmo y entonación sin convertir la práctica en un ejercicio mecánico."] },
        { heading: "Trabajo en equipo", paragraphs: ["Una escena necesita escucha, turnos y colaboración. Estas habilidades acompañan el aprendizaje lingüístico y la convivencia."] },
      ], cta: "Descubre actividades de teatro educativo en Loja.",
    },
    en: {
      slug: "beneficios-del-teatro-en-ingles-para-ninos", date: "2026-07-31",
      title: "Benefits of English theatre for children",
      description: "Five benefits of practising English through acting, songs, movement, and dramatic play.",
      intro: "English theatre combines communication, imagination, and collaboration. It is an artistic activity that can also support confidence and language comprehension.",
      sections: [
        { heading: "Confidence to speak", paragraphs: ["Characters give children a safe space to try new words. Gradually, they become more willing to express themselves clearly."] },
        { heading: "Listening and pronunciation", paragraphs: ["Songs, dialogue, and repetition games develop sound, rhythm, and intonation without making practice mechanical."] },
        { heading: "Teamwork", paragraphs: ["A scene requires listening, turn-taking, and collaboration. These skills support both language learning and community."] },
      ], cta: "Explore educational theatre activities in Loja.",
    },
  },
  "como-elegir-clases-de-teatro-en-loja": {
    es: {
      slug: "como-elegir-clases-de-teatro-en-loja", date: "2026-07-31",
      title: "Cómo elegir clases de teatro en Loja",
      description: "Guía breve para comparar clases de teatro según edad, objetivos, metodología y experiencia del grupo.",
      intro: "Elegir clases de teatro no depende únicamente del horario. También conviene revisar qué aprende el grupo, quién facilita el proceso y qué tipo de experiencia se quiere construir.",
      sections: [
        { heading: "Define el objetivo", paragraphs: ["Puede ser expresión, confianza, actuación, teatro musical, inglés, preparación para una presentación o simplemente explorar una nueva actividad."] },
        { heading: "Pregunta por las edades y el nivel", paragraphs: ["Una buena clase adapta ejercicios, lenguaje y ritmo. La propuesta debe explicar con claridad para quién está diseñada."] },
        { heading: "Busca una experiencia práctica", paragraphs: ["El teatro se aprende haciendo. Revisa si las sesiones incluyen voz, movimiento, improvisación, creación de personajes y trabajo colaborativo."] },
      ], cta: "Consulta por clases y talleres de teatro de Playhouse.",
    },
    en: {
      slug: "como-elegir-clases-de-teatro-en-loja", date: "2026-07-31",
      title: "How to choose theatre classes in Loja",
      description: "A short guide to comparing theatre classes by age, goals, methodology, and group experience.",
      intro: "Choosing theatre classes is not only about the schedule. It is also useful to understand what students learn and how the group process is facilitated.",
      sections: [
        { heading: "Define the goal", paragraphs: ["The goal may be expression, confidence, acting, musical theatre, English, preparation for a presentation, or simply exploring a new activity."] },
        { heading: "Ask about age and level", paragraphs: ["A strong class adapts exercises, language, and pace. The offer should clearly explain who it is designed for."] },
        { heading: "Look for practical experience", paragraphs: ["Theatre is learned by doing. Look for voice, movement, improvisation, character creation, and collaborative work."] },
      ], cta: "Ask about Playhouse theatre classes and workshops.",
    },
  },
}

export const BLOG_POSTS = Object.values(posts).map((localized) => localized)
export function getBlogPost(slug: string, lang: SupportedLocale) { return posts[slug]?.[lang] }
export function getBlogSlugs() { return Object.keys(posts) }
