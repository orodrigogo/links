import { MaterialIcons } from "@expo/vector-icons"

export type Categories = {
  id: string
  name: string
  icon: keyof typeof MaterialIcons.glyphMap
}[]

export const categories: Categories = [
  { id: "1", name: "Curso", icon: "code" },
  { id: "2", name: "Site", icon: "language" },
  { id: "3", name: "Artigo", icon: "language" },
  { id: "4", name: "Vídeo", icon: "description" },
  { id: "5", name: "Documentação", icon: "content-paste" },
]
