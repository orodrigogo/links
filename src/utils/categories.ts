import { MaterialIcons } from "@expo/vector-icons"

export type Categories = {
  id: string
  name: string
  icon: keyof typeof MaterialIcons.glyphMap
}[]

export const categories: Categories = [
  { id: "1", name: "Curso", icon: "code" },
  { id: "2", name: "Projeto", icon: "folder" },
  { id: "3", name: "Site", icon: "language" },
  { id: "4", name: "Artigo", icon: "newspaper" },
  { id: "5", name: "Vídeo", icon: "movie" },
  { id: "6", name: "Documentação", icon: "content-paste" },
]
