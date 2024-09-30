import "@/locales/i18n"

import { Suspense } from "react"
import { Stack } from "expo-router"
import { SQLiteProvider } from "expo-sqlite"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { migrateDbIfNeeded } from "@/database/migrateDbIfNeeded"

import { colors } from "@/styles/colors"

import { Loading } from "@/components/loading"

export default function Layout() {
  const backgroundColor = colors.gray[950]

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<Loading />}>
        <SQLiteProvider databaseName="links.db" onInit={migrateDbIfNeeded}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor },
            }}
          />
        </SQLiteProvider>
      </Suspense>
    </GestureHandlerRootView>
  )
}
