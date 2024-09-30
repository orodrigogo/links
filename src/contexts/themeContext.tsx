import React, { createContext, useState, ReactNode, useEffect } from "react"
import { themeStorage } from "@/storage/theme-storage"

import { darkColors } from "@/styles/dark-colors"
import { lightColors } from "@/styles/light-colors"

type ColorsTheme = typeof lightColors

type ThemeContext = {
  colors: ColorsTheme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<ColorsTheme>(lightColors)

  async function toggleTheme() {
    await themeStorage.save(colors === lightColors ? "dark" : "light")

    setColors((prev) => (prev === lightColors ? darkColors : lightColors))
  }

  async function getTheme() {
    const theme = await themeStorage.get()
    setColors(theme === "dark" ? darkColors : lightColors)
  }

  useEffect(() => {
    getTheme()
  }, [])

  return (
    <ThemeContext.Provider value={{ colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
