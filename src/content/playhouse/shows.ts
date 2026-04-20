export interface ShowGalleryImage {
  src: string
  alt: string
}

export interface Show {
  id: string
  title: string
  subtitle: string
  description: string
  gallery: ShowGalleryImage[]
}

export const SHOWS: Show[] = [
  {
    id: "three-little-pigs",
    title: "The Three Little Pigs",
    subtitle: "A Musical Tale for the Whole Family",
    description:
      "In this heartwarming and humorous reimagining of the classic tale, The Three Little Pigs – A Musical Tale tells the story of three pig siblings who must face the challenges of growing up, building their own homes, and outsmarting a hungry wolf. With catchy original songs and a fresh moral twist, this stage musical brings the timeless fable to life in a way that speaks to children and adults alike. Through music, teamwork, and quick thinking, the pigs find a way to face the Wolf. But something unexpected happens: the Wolf starts to question his own behavior.\n\nWill the Wolf blow down the Piggies' house? Will the pigs escape one more time? Can a Big Bad Wolf ever truly change?",
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
    subtitle: "A Comedy About Words, Respect & Second Chances",
    description:
      "When two very different students are stuck with community service, they're sent to clean up a polluted park by the river. Jake, the eco-obsessed overachiever, takes the task seriously, while Leo, the class clown, would rather make jokes than sort bottles and cans. Under the watchful eye of Mr. Torres, the park worker who has seen it all, the two clash over recycling bins, sarcasm, and responsibility.\n\nBut as they witness the impact of litter on the river and its wildlife, their bickering turns into teamwork. What began as punishment transforms into a plan: start a clean-up challenge that inspires others to care.\n\n\"The Trash Talk\" is a humorous 15-minute play that shows how even small actions—like picking up one bottle—can spark real change for our environment.",
    gallery: [
      { src: "/media/test/photo-1667386428097-74781c692dfb.jpg", alt: "The Trash Talk — scene 1" },
      { src: "/media/test/6905e7822c8617aecdfbaaaca9f5649d.jpg", alt: "The Trash Talk — scene 2" },
      { src: "/media/test/a59b7af9b27da8dd1fd72c96134dfc7e.jpg", alt: "The Trash Talk — scene 3" },
      { src: "/media/test/c9c5db18825ebcfa1b9882dac62be4ca.jpg", alt: "The Trash Talk — scene 4" },
      { src: "/media/test/cc05861322e903b3259ebb0cc0a134af.jpg", alt: "The Trash Talk — scene 5" },
    ],
  },
]
