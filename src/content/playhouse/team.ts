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
    image: "/media/updated/team/andres-velez.png",
    category: "leadership",
  },
  {
    id: "luis-velez",
    name: "Luis Vélez",
    role: "Co-Founder & Producer",
    secondaryRole: "Performer",
    image: "/media/updated/team/luis-velez.png",
    category: "leadership",
  },
  {
    id: "karla-espinosa",
    name: "Karla Espinosa",
    role: "Music Director & Vocal Coach",
    image: "/media/updated/team/karla-espinosa.png",
    category: "performer",
  },
  {
    id: "josselyn-llacxaguanga",
    name: "Josselyn Llacxaguanga",
    role: "Choreographer & Dance Coach",
    image: "/media/updated/team/josselyn-llacxaguanga.png",
    category: "performer",
  },
  {
    id: "alexia-montoya",
    name: "Alexia Montoya",
    role: "Performer",
    image: "/media/updated/team/alexia-montoya.png",
    category: "performer",
  },
  {
    id: "siromani-anazco",
    name: "Siromani Añazco",
    role: "Performer",
    image: "/media/updated/team/siromani-anazco.png",
    category: "performer",
  },
  {
    id: "fernando-silva",
    name: "Fernando Silva",
    role: "Performer",
    image: "/media/updated/team/fernando-silva.png",
    category: "performer",
  },
  {
    id: "pablo-sanchez",
    name: "Pablo Sánchez",
    role: "Performer",
    image: "/media/updated/team/pablo-sanchez.png",
    category: "performer",
  },
  {
    id: "michelle-lopez",
    name: "Michelle López",
    role: "Academic Team",
    image: "/media/updated/team/michelle-lopez.jpg",
    category: "academic",
  },
  {
    id: "gabriela-jimenez",
    name: "Gabriela Jiménez",
    role: "Academic Team",
    image: "/media/updated/team/gabriela-jimenez.png",
    category: "academic",
  },
  {
    id: "jose-antonio-mora",
    name: "José Antonio Mora",
    role: "Productor musical",
    image: "/media/updated/team/jose-antonio-mora.png",
    category: "leadership",
  },
  {
    id: "gustavo-vasconez",
    name: "Gustavo Vásconez",
    role: "Productor",
    image: "/media/updated/team/Gustavo Vásconez - Productor.png",
    category: "leadership",
  },
]

