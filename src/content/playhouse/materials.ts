export type YoutubeLink = {
  label: string
  url: string
}

export type MaterialItem = {
  id: string
  logo: string
  title: string
  activityKitUrl: string
  youtubeLinks: YoutubeLink[]
}

export const MATERIALS: MaterialItem[] = [
  {
    id: "three-little-pigs",
    logo: "/media/three little pigs logo 2.png",
    title: "THE THREE LITTLE PIGS",
    activityKitUrl: "#",
    youtubeLinks: [
      { label: "Songs Playlist", url: "#" },
      { label: "Story Read-Aloud", url: "#" },
      { label: "Classroom Activities", url: "#" },
    ],
  },
]
