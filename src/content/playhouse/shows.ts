import type { SupportedLocale } from "@/content/config"

export interface ShowGalleryImage {
  src: string
  alt: string
}

export interface ShowTranslation {
  subtitle: string
  description: string
}

export interface Show {
  id: string
  title: string
  en: ShowTranslation
  es: ShowTranslation
  gallery: ShowGalleryImage[]
}

export type LocalizedShow = Omit<Show, "en" | "es"> & ShowTranslation

export function getLocalizedShow(show: Show, locale: SupportedLocale): LocalizedShow {
  const { en: _en, es: _es, ...base } = show
  return { ...base, ...show[locale] }
}

export const SHOWS: Show[] = [
  {
    id: "three-little-pigs",
    title: "The Three Little Pigs",
    en: {
      subtitle: "A Musical Tale for the Whole Family",
      description:
        "In this heartwarming and humorous reimagining of the classic tale, The Three Little Pigs – A Musical Tale tells the story of three pig siblings who must face the challenges of growing up, building their own homes, and outsmarting a hungry wolf. With catchy original songs and a fresh moral twist, this stage musical brings the timeless fable to life in a way that speaks to children and adults alike. Through music, teamwork, and quick thinking, the pigs find a way to face the Wolf. But something unexpected happens: the Wolf starts to question his own behavior.\n\nWill the Wolf blow down the Piggies' house? Will the pigs escape one more time? Can a Big Bad Wolf ever truly change?",
    },
    es: {
      subtitle: "Un cuento musical familiar",
      description:
        "En esta entrañable y humorística reinvención del cuento clásico, The Three Little Pigs – A Musical Tale presenta a tres hermanos cerditos que deben enfrentar los retos de crecer, construir sus propios hogares y burlar a un lobo hambriento. Con canciones originales y un enfoque renovado, la historia conecta con niños y adultos por igual. A través de la música, el trabajo en equipo y el ingenio, los cerditos encuentran la manera de enfrentarse al Lobo. Pero algo inesperado ocurre: el Lobo empieza a cuestionar su propio comportamiento.\n\n¿Derribará el lobo la casa de los cerditos? ¿Lograrán escapar una vez más? ¿Puede un Gran Lobo Feroz cambiar de verdad?",
    },
    gallery: [
      { src: "/media/test/depositphotos_72162909-stock-photo-two-funny-children-acting-as.jpg", alt: "The Three Little Pigs — scene 1" },
      { src: "/media/test/depositphotos_74798951-stock-photo-group-of-children-enjoying-drama.jpg", alt: "The Three Little Pigs — scene 2" },
      { src: "/media/test/3editada-265.jpg", alt: "The Three Little Pigs — scene 3" },
      { src: "/media/test/teatro-infantil-La-Colmenita-wikipedia.jpg", alt: "The Three Little Pigs — scene 4" },
      { src: "/media/test/Foto-muestra-4.jpg", alt: "The Three Little Pigs — scene 5" },
    ],
  },
  {
    id: "trash-talk",
    title: "The Trash Talk",
    en: {
      subtitle: "A Comedy About Words, Respect & Second Chances",
      description:
        "When two very different students are stuck with community service, they're sent to clean up a polluted park by the river. Jake, the eco-obsessed overachiever, takes the task seriously, while Leo, the class clown, would rather make jokes than sort bottles and cans. Under the watchful eye of Mr. Torres, the park worker who has seen it all, the two clash over recycling bins, sarcasm, and responsibility.\n\nBut as they witness the impact of litter on the river and its wildlife, their bickering turns into teamwork. What began as punishment transforms into a plan: start a clean-up challenge that inspires others to care.\n\n\"The Trash Talk\" is a humorous 15-minute play that shows how even small actions—like picking up one bottle—can spark real change for our environment.",
    },
    es: {
      subtitle: "Teatro breve con conciencia ambiental",
      description:
        "Dos estudiantes muy distintos reciben servicio comunitario y son enviados a limpiar un parque contaminado junto al río. Jake, obsesionado con el medio ambiente, se toma la tarea en serio. Leo, el bromista de la clase, preferiría hacer chistes antes que separar botellas y latas. Bajo la mirada del Sr. Torres, ambos pasan del conflicto al trabajo en equipo.\n\nAl ser testigos del impacto de la basura en el río y su fauna, sus peleas se convierten en colaboración. Lo que comenzó como castigo se transforma en un plan: iniciar un reto de limpieza que inspire a otros a cuidar el entorno.\n\n\"The Trash Talk\" es una obra humorística de 15 minutos que muestra cómo acciones pequeñas —como recoger una botella— pueden generar cambios reales para nuestro medio ambiente.",
    },
    gallery: [
      { src: "/media/test/photo-1667386428097-74781c692dfb.jpg", alt: "The Trash Talk — scene 1" },
      { src: "/media/test/6905e7822c8617aecdfbaaaca9f5649d.jpg", alt: "The Trash Talk — scene 2" },
      { src: "/media/test/a59b7af9b27da8dd1fd72c96134dfc7e.jpg", alt: "The Trash Talk — scene 3" },
      { src: "/media/test/c9c5db18825ebcfa1b9882dac62be4ca.jpg", alt: "The Trash Talk — scene 4" },
      { src: "/media/test/cc05861322e903b3259ebb0cc0a134af.jpg", alt: "The Trash Talk — scene 5" },
    ],
  },
]
