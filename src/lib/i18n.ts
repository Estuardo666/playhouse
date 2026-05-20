import type { SupportedLocale } from "@/content/config"

export interface Dict {
  nav: {
    about: string
    team: string
    shows: string
    workshops: string
    materials: string
    contact: string
  }
  hero: {
    pill: string
    title: string
    subtitle: string
  }
  about: {
    pill: string
    headline: string
    h3: string
    subline: string
    p1: string
    p2: string
    p3: string
    bottom: string
  }
  mission: {
    pill: string
    heading: string
    missionBadge: string
    missionShortTitle: string
    missionExpandedTitle: string
    missionBody: string
    visionBadge: string
    visionShortTitle: string
    visionExpandedTitle: string
    visionBody: string
    valores: string[]
  }
  shows: {
    pill: string
    heading: string
    subheading: string
    intro: string
    scrollHint: string
    swipeHint: string
  }
  workshops: {
    pill: string
    heading: string
    subheading: string
    intro: string
    intro2: string
    bookingLine1: string
    bookingLine2: string
    bookCta: string
    learnMore: string
    tabs: {
      objectives: string
      methodology: string
      outcomes: string
    }
    closeLabel: string
    bookingNote: string
  }
  materials: {
    pill: string
    heading: string
    body: string
    unlockTitle: string
    unlockSubtitle: string
    unlockCta: string
    emailPlaceholder: string
    emailError: string
    unlockedMsg: string
    activityKitLabel: string
    downloadLabel: string
    youtubeLabel: string
    contactNote: string
    contactCta: string
  }
  team: {
    pill: string
    heading: string
    subheading: string
    description: string
    dragLabel: string
  }
  footer: {
    tagline: string
    description: string
    copyright: string
    followUs: string
    online: string
    phone: string
  }
}

const en: Dict = {
  nav: {
    about: "About us",
    team: "Our team",
    shows: "Shows",
    workshops: "Workshops",
    materials: "Resources",
    contact: "Contact",
  },
  hero: {
    pill: "Where English comes alive on stage",
    title: "Educational theatre that inspires learning and creates unforgettable experiences.",
    subtitle: "Theatre · Music · Pedagogy",
  },
  about: {
    pill: "Who We Are",
    headline:
      "PLAYHOUSE – Educational Theatre is a pioneering project in educational theatre in English that combines art, music, and pedagogy to offer immersive and creative learning experiences.",
    h3: "Where english comes\nalive on stage",
    subline: "Art, pedagogy & the English language on one stage",
    p1: "PLAYHOUSE - Educational Theatre was founded with the mission of bringing together the performing arts and English learning on the same stage. We are a theatre production company committed to creating unique experiences that inspire, educate, and entertain audiences of all ages.",
    p2: "We believe that theatre is a powerful bridge for learning: every play is an opportunity to dive into a new language, a culture, and a story. Through workshops, musicals and performances in English, we offer students, families, teachers, and art lovers a space where English comes to life in a natural, fun, and exciting way.",
    p3: "Our work combines a passion for theatre with an innovative pedagogical approach. At PLAYHOUSE, we bring together actors, directors, musicians, choreographers, and creatives who share the same vision: to turn the stage into a living classroom and the audience into an active participant.",
    bottom:
      "With more than 15 years of experience in the performing arts and teaching, we promote an innovative proposal that unites entertainment and education, turning theatre into a powerful tool for linguistic, cultural, and social development. More than just shows, we create experiences that leave a mark, foster creativity, and build confidence in using English—all while celebrating the magic of theatre.",
  },
  mission: {
    pill: "Our essence",
    heading: "An Artistic and Pedagogical Proposal with a Vision for National Growth",
    missionBadge: "Mission",
    missionShortTitle: "What we do,\nand whom we do it for",
    missionExpandedTitle: "Mission",
    missionBody:
      "To promote English learning and artistic development through musical theatre, creating immersive and fun stage experiences that inspire children, youth, and adults to express themselves, communicate, and grow in a creative and bilingual environment.",
    visionBadge: "Vision",
    visionShortTitle: "Where the stage\nis heading",
    visionExpandedTitle: "Vision",
    visionBody:
      "PLAYHOUSE - Educational Theatre will be a national benchmark in educational theatre in English, with annual productions reaching various cities. We stand out by combining art and pedagogy in innovative stage proposals, aiming to grow through strategic partnerships and our own educational materials.",
    valores: [
      "Creativity",
      "Immersion",
      "Collaboration",
      "Expression",
      "Pedagogical Innovation",
      "Stage Confidence",
    ],
  },
  shows: {
    pill: "Our Shows",
    heading: "Musical Shows in English for All Ages",
    subheading: "Musical productions in English for all ages",
    intro:
      "Each show is a unique world of music, movement, and language — designed to make English feel natural, exciting, and unforgettable.",
    scrollHint: "Scroll",
    swipeHint: "Swipe",
  },
  workshops: {
    pill: "Workshops",
    heading: "Theatre Workshops in English",
    subheading: "Hands-on learning through theatre and performance",
    intro:
      "At PLAYHOUSE - Educational Theatre, our workshops use the power of theatre to make learning English fun, creative, and memorable. Through games, improvisation, storytelling, music, and stage performance, students explore new ways of expressing themselves while building confidence in their language skills.",
    intro2:
      "Whether discovering the basics of theatre, creating original stories, trying out musical theatre, or learning to speak with clarity, each workshop is designed to inspire imagination, teamwork, and communication. From stepping onto the stage to welcoming a guest into the classroom, every experience is interactive, dynamic, and tailored to help students grow both as performers and as confident English speakers.",
    bookingLine1: "To book any of the workshops,",
    bookingLine2: "please fill out the following form:",
    bookCta: "Book a Workshop",
    learnMore: "Learn more",
    tabs: {
      objectives: "Specific Objectives",
      methodology: "Methodology",
      outcomes: "Expected Outcomes",
    },
    closeLabel: "Close",
    bookingNote: "To book any of the workshops, please fill out the following form:",
  },
  materials: {
    pill: "Resources",
    heading: "Teaching\nMaterials",
    body: "In this section you will find the materials you need to prepare your students for our shows. You will find an Activity Kit (which includes activities for before and after the show). Additionally, you will find the videos and songs to work with during your lessons.",
    unlockTitle: "Subscribe to unlock",
    unlockSubtitle: "Activity kits, songs & classroom videos — free.",
    unlockCta: "Unlock Resources",
    emailPlaceholder: "your@email.com",
    emailError: "Please enter a valid email address.",
    unlockedMsg: "Resources unlocked",
    activityKitLabel: "Activity Kit:",
    downloadLabel: "Download",
    youtubeLabel: "Youtube:",
    contactNote: "For further inquiries, please contact us through:",
    contactCta: "Contact Form",
  },
  team: {
    pill: "Our Team",
    heading: "The ensemble\nbehind the magic",
    subheading: "Founders, performers, educators & creators",
    description:
      "From founders to performers to educators — every member of the PlayHouse family brings a unique voice to the stage. Together, we shape the experiences that transform young artists.",
    dragLabel: "Drag",
  },
  footer: {
    tagline: "Immersive educational theatre\nthat inspires and transforms.",
    description:
      "A pioneering project in educational theatre in English that combines art, music, and pedagogy.",
    copyright: "PlayHouse — All rights reserved.",
    followUs: "Follow Us",
    online: "Online",
    phone: "Phone",
  },
}

const es: Dict = {
  nav: {
    about: "Nosotros",
    team: "Equipo",
    shows: "Espectáculos",
    workshops: "Talleres",
    materials: "Recursos",
    contact: "Contacto",
  },
  hero: {
    pill: "Donde el inglés cobra vida en el escenario",
    title: "Teatro educativo que inspira el aprendizaje y crea experiencias inolvidables.",
    subtitle: "Teatro · Música · Pedagogía",
  },
  about: {
    pill: "Quiénes somos",
    headline:
      "PLAYHOUSE – Teatro Educativo es un proyecto pionero en teatro educativo en inglés que combina arte, música y pedagogía para ofrecer experiencias de aprendizaje inmersivas y creativas.",
    h3: "Donde el inglés\nse vive en escena",
    subline: "Arte, pedagogía e inglés en un mismo escenario",
    p1: "PlayHouse fue fundada con la misión de integrar el teatro y el aprendizaje del inglés en una sola experiencia. Somos una productora teatral comprometida con crear propuestas que inspiran, educan y entretienen a públicos de todas las edades.",
    p2: "Creemos que el teatro es un puente poderoso para aprender. Cada obra es una oportunidad para sumergirse en un idioma, una cultura y una historia. A través de talleres, musicales y actuaciones en inglés, ofrecemos un espacio donde el idioma cobra vida de forma natural, divertida y emocionante.",
    p3: "Nuestro trabajo combina pasión por el teatro con un enfoque pedagógico innovador. Reunimos actores, directores, músicos, coreógrafos y creativos que comparten una misma visión: convertir el escenario en un aula viva y al público en un participante activo.",
    bottom:
      "Con más de 15 años de experiencia en artes escénicas y enseñanza, promovemos una propuesta innovadora que une el entretenimiento y la educación, convirtiendo el teatro en una herramienta poderosa para el desarrollo lingüístico, cultural y social. Más que espectáculos, creamos experiencias que dejan huella, fomentan la creatividad y fortalecen la confianza para comunicarse en inglés mientras celebran la magia del teatro.",
  },
  mission: {
    pill: "Nuestra esencia",
    heading: "Una propuesta artística y pedagógica con visión de crecimiento nacional",
    missionBadge: "Misión",
    missionShortTitle: "Lo que hacemos\ny para quién lo hacemos",
    missionExpandedTitle: "Misión",
    missionBody:
      "Promover el aprendizaje del inglés y el desarrollo artístico a través del teatro musical, creando experiencias escénicas inmersivas y divertidas que inspiran a niños, jóvenes y adultos a expresarse, comunicarse y crecer en un entorno creativo y bilingüe.",
    visionBadge: "Visión",
    visionShortTitle: "Hacia dónde\navanza el escenario",
    visionExpandedTitle: "Visión",
    visionBody:
      "Ser un referente nacional en teatro educativo en inglés, con producciones anuales que lleguen a diversas ciudades, destacándose por combinar arte y pedagogía en propuestas escénicas innovadoras y creciendo mediante alianzas estratégicas y materiales educativos propios.",
    valores: [
      "Creatividad",
      "Inmersión",
      "Colaboración",
      "Expresión",
      "Innovación pedagógica",
      "Confianza escénica",
    ],
  },
  shows: {
    pill: "Nuestros espectáculos",
    heading: "Espectáculos musicales en inglés para todas las edades",
    subheading: "Producciones musicales en inglés para todas las edades",
    intro:
      "Cada espectáculo es un mundo único de música, movimiento e idioma — diseñado para que el inglés se sienta natural, emocionante e inolvidable.",
    scrollHint: "Desplazar",
    swipeHint: "Deslizar",
  },
  workshops: {
    pill: "Talleres",
    heading: "Talleres de teatro en inglés",
    subheading: "Aprendizaje práctico a través del teatro y la actuación",
    intro:
      "En PLAYHOUSE – Teatro Educativo, nuestros talleres usan el poder del teatro para hacer del aprendizaje del inglés una experiencia divertida, creativa y memorable. A través de juegos, improvisación, narración, música y actuación, los estudiantes descubren nuevas formas de expresarse mientras fortalecen sus habilidades comunicativas.",
    intro2:
      "Ya sea descubriendo los fundamentos del teatro, creando historias originales, explorando el teatro musical o aprendiendo a hablar con claridad, cada taller está diseñado para inspirar imaginación, trabajo en equipo y comunicación. Desde subir al escenario hasta recibir un invitado en el aula, cada experiencia es interactiva, dinámica y pensada para que los estudiantes crezcan como intérpretes y como hablantes de inglés con confianza.",
    bookingLine1: "Para reservar cualquiera de los talleres,",
    bookingLine2: "completa el siguiente formulario:",
    bookCta: "Reservar un taller",
    learnMore: "Ver más",
    tabs: {
      objectives: "Objetivos específicos",
      methodology: "Metodología",
      outcomes: "Resultados esperados",
    },
    closeLabel: "Cerrar",
    bookingNote: "Para reservar cualquiera de los talleres, completa el siguiente formulario:",
  },
  materials: {
    pill: "Recursos",
    heading: "Materiales\neducativos",
    body: "En esta sección encontrarás los materiales necesarios para preparar a tus estudiantes para nuestros espectáculos. Encontrarás un Activity Kit (con actividades para antes y después del show) y también los videos y canciones para trabajar en clase.",
    unlockTitle: "Suscríbete para acceder",
    unlockSubtitle: "Activity kits, canciones y videos para el aula — gratis.",
    unlockCta: "Acceder a recursos",
    emailPlaceholder: "tu@correo.com",
    emailError: "Por favor, ingresa un correo electrónico válido.",
    unlockedMsg: "Recursos disponibles",
    activityKitLabel: "Activity Kit:",
    downloadLabel: "Descargar",
    youtubeLabel: "Youtube:",
    contactNote: "Para más información, contáctanos a través de:",
    contactCta: "Formulario de contacto",
  },
  team: {
    pill: "Nuestro equipo",
    heading: "El elenco\ndetrás de la magia",
    subheading: "Fundadores, intérpretes, educadores y creativos",
    description:
      "Desde los fundadores hasta los intérpretes y educadores — cada miembro de la familia PlayHouse aporta una voz única al escenario. Juntos, damos forma a las experiencias que transforman a los jóvenes artistas.",
    dragLabel: "Arrastra",
  },
  footer: {
    tagline: "Teatro educativo inmersivo\nque inspira y transforma.",
    description:
      "Un proyecto pionero en teatro educativo en inglés que combina arte, música y pedagogía.",
    copyright: "PlayHouse — Todos los derechos reservados.",
    followUs: "Síguenos",
    online: "Online",
    phone: "Teléfono",
  },
}

export const dictionaries: Record<SupportedLocale, Dict> = { en, es }

export function getDict(locale: SupportedLocale): Dict {
  return dictionaries[locale]
}
