export interface WorkshopObjectiveCard {
  image: string
  alt: string
  text: string
}

export interface WorkshopTab {
  key: "objectives" | "methodology" | "outcomes"
  label: string
  items?: WorkshopObjectiveCard[]
  image?: string
  imageAlt?: string
  text?: string
}

export interface Workshop {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  tabs: WorkshopTab[]
}

export const WORKSHOPS: Workshop[] = [
  {
    id: "musical-theatre",
    title: "Introduction to\nMusical Theatre",
    subtitle: "Acting, singing & movement in English",
    description:
      "Musical theatre combines acting, singing, and movement, making it a highly engaging multisensory experience. Its rhythmic nature supports vocabulary acquisition and pronunciation in English.",
    image: "/media/test/Foto-muestra-4.jpg",
    imageAlt: "Introduction to Musical Theatre workshop",
    tabs: [
      {
        key: "objectives",
        label: "Specific Objectives",
        items: [
          {
            image: "/media/test/depositphotos_72162909-stock-photo-two-funny-children-acting-as.jpg",
            alt: "Singing and movement techniques",
            text: "Explore basic techniques in singing, movement, and acting.",
          },
          {
            image: "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
            alt: "Musical theatre repertoire",
            text: "Become familiar with simple musical theatre repertoire in English.",
          },
          {
            image: "/media/test/3editada-265.jpg",
            alt: "Group coordination",
            text: "Encourage group coordination and expressive integration.",
          },
        ],
      },
      {
        key: "methodology",
        label: "Methodology",
        image: "/media/test/teatro-infantil-La-Colmenita-wikipedia.jpg",
        imageAlt: "Methodology — musical staging",
        text: "Physical and vocal warm-ups will be followed by the preparation of a short musical number or song, including staging.",
      },
      {
        key: "outcomes",
        label: "Expected Outcomes",
        items: [
          {
            image: "/media/test/depositphotos_72162909-stock-photo-two-funny-children-acting-as.jpg",
            alt: "Musical theatre performance",
            text: "Performance of short musical theatre segments in English.",
          },
          {
            image: "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg",
            alt: "Intonation and pronunciation",
            text: "Improved intonation and pronunciation through singing.",
          },
          {
            image: "/media/test/3editada-265.jpg",
            alt: "Self-confidence and teamwork",
            text: "Increased self-confidence and teamwork skills.",
          },
        ],
      },
    ],
  },
]
