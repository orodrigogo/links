import "@/locales/i18n"

import { Suspense } from "react"
import { Drawer } from "expo-router/drawer"
import { SQLiteProvider } from "expo-sqlite"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useTranslation } from "react-i18next"
import { Feather } from "@expo/vector-icons"

import { migrateDbIfNeeded } from "@/database/migrateDbIfNeeded"

import { colors } from "@/styles/colors"

import { Loading } from "@/components/loading"
import { CustomDrawerContent } from "@/components/custom-drawer-content"
import { ThemeProvider } from "@/contexts/themeContext"

export default function Layout() {
  const { t } = useTranslation("translation", { keyPrefix: "navigation" })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<Loading />}>
        <SQLiteProvider databaseName="links.db" onInit={migrateDbIfNeeded}>
          <ThemeProvider>
            <Drawer
              drawerContent={CustomDrawerContent}
              screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: "transparent",
                drawerActiveTintColor: colors.green[300],
                drawerInactiveTintColor: colors.gray[400],
                drawerContentStyle: {
                  backgroundColor: colors.gray[800],
                },
              }}
            >
              <Drawer.Screen
                name="index/index"
                options={{
                  title: t("route_index"),
                  drawerIcon: ({ color, size }) => (
                    <Feather name="home" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="new-category/index"
                options={{ drawerLabel: () => null }}
              />

              <Drawer.Screen
                name="save/index"
                options={{ drawerLabel: () => null }}
              />
            </Drawer>
          </ThemeProvider>
        </SQLiteProvider>
      </Suspense>
    </GestureHandlerRootView>
  )
}
