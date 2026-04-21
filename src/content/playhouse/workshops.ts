export interface Workshop {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  objectives: string[]
  methodology: string
  outcomes: string[]
  gallery: [string, string, string]
}

export const WORKSHOPS: Workshop[] = [
  {
    id: "musical-theatre",
    title: "Introduction to Musical Theatre",
    subtitle: "Acting, singing & movement in English",
    description:
      "Musical theatre combines acting, singing, and movement, making it a highly engaging multisensory experience. Its rhythmic nature supports vocabulary acquisition and pronunciation in English.",
    image: "/media/test/Foto-muestra-4.jpg",
    imageAlt: "Introduction to Musical Theatre workshop",
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
    gallery: [
      "/media/test/depositphotos_72162909-stock-photo-two-funny-children-acting-as.jpg",
      "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
      "/media/test/3editada-265.jpg",
    ],
  },
  {
    id: "artistic-residency",
    title: "Artistic Residency",
    subtitle: "Three-week immersive theatre and English experience",
    description:
      "PLAYHOUSE's three-week residency immerses students in theatre, storytelling, improvisation, musical theatre, and speaking clearly, culminating in a final stage performance at school.",
    image: "/media/test/teatro-infantil-La-Colmenita-wikipedia.jpg",
    imageAlt: "Artistic residency workshop",
    objectives: [
      "Strengthen pronunciation, fluency, vocabulary, and listening in performance contexts.",
      "Explore voice, body, improvisation, and character-building in English.",
      "Foster creativity and teamwork through collective creation of scenes and songs.",
    ],
    methodology:
      "A pedagogical progression guides students from theatrical exploration to collective production of a final stage piece presented at school.",
    outcomes: [
      "Linguistic improvement in clarity, pronunciation, and fluency in English.",
      "Full artistic process from rehearsals to final performance.",
      "Greater confidence, collaboration, and creative ownership.",
    ],
    gallery: [
      "/media/test/Foto-muestra-4.jpg",
      "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
      "/media/test/teatro-infantil-La-Colmenita-wikipedia.jpg",
    ],
  },
  {
    id: "introduction-to-theatre",
    title: "Introduction to Theatre",
    subtitle: "Voice, body, space and character in English",
    description:
      "This workshop introduces the foundations of theatre through games and expressive tools, helping students interact in English naturally and confidently.",
    image: "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
    imageAlt: "Introduction to theatre workshop",
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
    gallery: [
      "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
      "/media/test/depositphotos_72162909-stock-photo-two-funny-children-acting-as.jpg",
      "/media/test/3editada-265.jpg",
    ],
  },
  {
    id: "storytelling",
    title: "Storytelling",
    subtitle: "Narrative creation to strengthen English communication",
    description:
      "Storytelling connects emotion and language, helping students structure ideas, build narratives, and communicate clearly in English.",
    image: "/media/test/depositphotos_72162909-stock-photo-two-funny-children-acting-as.jpg",
    imageAlt: "Storytelling workshop",
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
    gallery: [
      "/media/test/depositphotos_72162909-stock-photo-two-funny-children-acting-as.jpg",
      "/media/test/Foto-muestra-4.jpg",
      "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
    ],
  },
  {
    id: "improv-theatre",
    title: "Improv Theatre",
    subtitle: "Spontaneity, listening and fluency through improv",
    description:
      "Improvisation boosts creativity and active listening, reducing anxiety while encouraging spontaneous use of English in meaningful situations.",
    image: "/media/test/3editada-265.jpg",
    imageAlt: "Improv theatre workshop",
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
    gallery: [
      "/media/test/3editada-265.jpg",
      "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
      "/media/test/Foto-muestra-4.jpg",
    ],
  },
  {
    id: "speaking-clearly",
    title: "Speaking Clearly",
    subtitle: "Pronunciation, diction and vocal projection",
    description:
      "This workshop gives students practical vocal tools to improve diction, intonation, projection, and confidence when speaking English in public.",
    image: "/media/test/teatro-infantil-La-Colmenita-wikipedia.jpg",
    imageAlt: "Speaking clearly workshop",
    objectives: [
      "Identify key obstacles in pronunciation and speech clarity.",
      "Develop breathing, diction, and vocal projection techniques.",
      "Encourage self-confidence when speaking English in front of others.",
    ],
    methodology:
      "Vocal drills, tongue twisters, dramatic readings, and projection games are used to apply theatre techniques for clearer spoken English.",
    outcomes: [
      "Greater clarity and precision in spoken English.",
      "Conscious use of breath and voice.",
      "Increased confidence when speaking in public.",
    ],
    gallery: [
      "/media/test/teatro-infantil-La-Colmenita-wikipedia.jpg",
      "/media/test/depositphotos_72162909-stock-photo-two-funny-children-acting-as.jpg",
      "/media/test/3editada-265.jpg",
    ],
  },
  {
    id: "students-on-stage",
    title: "Students on Stage",
    subtitle: "Performance-based learning in real audience settings",
    description:
      "Stage performance transforms language learning into a memorable real-world communication experience while reinforcing confidence and collaboration.",
    image: "/media/test/Foto-muestra-4.jpg",
    imageAlt: "Students on stage workshop",
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
    gallery: [
      "/media/test/Foto-muestra-4.jpg",
      "/media/test/teatro-infantil-La-Colmenita-wikipedia.jpg",
      "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
    ],
  },
  {
    id: "classroom-guest",
    title: "Classroom Guest",
    subtitle: "A visiting teaching artist experience",
    description:
      "An external theatre guest brings a fresh and memorable classroom dynamic, combining creativity, culture, and practical English interaction.",
    image: "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
    imageAlt: "Classroom guest workshop",
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
    gallery: [
      "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
      "/media/test/3editada-265.jpg",
      "/media/test/teatro-infantil-La-Colmenita-wikipedia.jpg",
    ],
  },
]
