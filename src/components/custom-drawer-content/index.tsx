import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer"
import { Text, View, Switch } from "react-native"
import { useTranslation } from "react-i18next"

import { useTheme } from "@/hooks/useTheme"

import { styles } from "./styles"
import { darkColors } from "@/styles/dark-colors"

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation("translation", { keyPrefix: "navigation" })
  const { colors, toggleTheme } = useTheme()

  const isDarkMode = colors === darkColors

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
          onChange={toggleTheme}
        />
        <Text style={styles.label}>{t("label_dark")}</Text>
      </View>
    </View>
  )
}
