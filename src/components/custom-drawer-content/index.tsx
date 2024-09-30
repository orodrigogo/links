import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer"
import { Text, View, Switch, useColorScheme } from "react-native"
import { useTranslation } from "react-i18next"

import { styles } from "./styles"
import { colors } from "@/styles/colors"
import { useState } from "react"

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { t } = useTranslation("translation", { keyPrefix: "navigation" })

  const colorScheme = useColorScheme()
  console.log(colorScheme)

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
          onChange={() => setIsDarkMode((prev) => !prev)}
        />
        <Text style={styles.label}>{t("label_dark")}</Text>
      </View>
    </View>
  )
}
