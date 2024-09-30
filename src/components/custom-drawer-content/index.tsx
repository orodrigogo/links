import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer"
import { Text, View, Switch, useColorScheme } from "react-native"
import { themeStorage } from "@/storage/theme-storage"
import { useTranslation } from "react-i18next"

import { styles } from "./styles"
import { colors } from "@/styles/colors"
import { useEffect, useState } from "react"

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { t } = useTranslation("translation", { keyPrefix: "navigation" })

  const colorScheme = useColorScheme()
  console.log(colorScheme)

  async function getTheme() {
    const theme = await themeStorage.get()
    setIsDarkMode(theme === "dark")
  }

  async function handleChangeTheme() {
    await themeStorage.save(isDarkMode ? "light" : "dark")
    setIsDarkMode((prevState) => !prevState)
  }

  useEffect(() => {
    getTheme()
  }, [])

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <Text style={styles.label}>{t("label_light")}</Text>
        <Switch
          thumbColor={isDarkMode ? colors.green[300] : colors.gray[900]}
          trackColor={{ false: colors.gray[400], true: colors.gray[600] }}
          value={isDarkMode}
          onChange={handleChangeTheme}
        />
        <Text style={styles.label}>{t("label_dark")}</Text>
      </View>
    </View>
  )
}
