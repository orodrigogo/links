import { useContext } from "react"

import { ThemeContext } from "@/contexts/themeContext"

export function useTheme() {
  const context = useContext(ThemeContext)

  return context
}
