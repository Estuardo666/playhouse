export type TeamMember = {
  id: string
  name: string
  /** Primary role shown as the main tag */
  role: string
  /** Secondary role shown as a sub-tag (optional, for people with two areas) */
  secondaryRole?: string
  image: string
  category: "leadership" | "performer" | "academic"
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "andres-velez",
    name: "Andrés Vélez",
    role: "Founder & General Director",
    secondaryRole: "Performer",
    image: "/media/team/andres-velez.jpg",
    category: "leadership",
  },
  {
    id: "luis-velez",
    name: "Luis Vélez",
    role: "Co-Founder & Producer",
    secondaryRole: "Performer",
    image: "/media/team/luis-velez.jpg",
    category: "leadership",
  },
  {
    id: "karla-espinosa",
    name: "Karla Espinosa",
    role: "Music Director & Vocal Coach",
    image: "/media/team/karla-espinosa.jpg",
    category: "performer",
  },
  {
    id: "josselyn-llacxaguanga",
    name: "Josselyn Llacxaguanga",
    role: "Choreographer & Dance Coach",
    image: "/media/team/josselyn-llacxaguanga.jpg",
    category: "performer",
  },
  {
    id: "alexia-montoya",
    name: "Alexia Montoya",
    role: "Performer",
    image: "/media/team/alexia-montoya.jpg",
    category: "performer",
  },
  {
    id: "siromani-anazco",
    name: "Siromani Añazco",
    role: "Performer",
    image: "/media/team/siromani-anazco.jpg",
    category: "performer",
  },
  {
    id: "fernando-silva",
    name: "Fernando Silva",
    role: "Performer",
    image: "/media/team/fernando-silva.jpg",
    category: "performer",
  },
  {
    id: "pablo-sanchez",
    name: "Pablo Sánchez",
    role: "Performer",
    image: "/media/team/pablo-sanchez.jpg",
    category: "performer",
  },
  {
    id: "michelle-lopez",
    name: "Michelle López",
    role: "Academic Team",
    image: "/media/team/michelle-lopez.jpg",
    category: "academic",
  },
  {
    id: "gabriela-jimenez",
    name: "Gabriela Jiménez",
    role: "Academic Team",
    image: "/media/team/gabriela-jimenez.jpg",
    category: "academic",
  },
  {
    id: "jacob-ramirez",
    name: "Jacob Ramírez",
    role: "Academic Team",
    image: "/media/team/jacob-ramirez.jpg",
    category: "academic",
  },
]
