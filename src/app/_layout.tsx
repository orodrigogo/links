import { Suspense } from "react"
import { View } from "react-native"
import { Stack } from "expo-router"
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite"

import { migrateDbIfNeeded } from "@/database/migrateDbIfNeeded"

import { colors } from "@/styles/colors"
import { Loading } from "@/components/loading"

export default function Layout() {
  const backgroundColor = colors.gray[950]
  return (
    <View style={{ flex: 1, backgroundColor }}>
      <Suspense fallback={<Loading />}>
        <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor },
            }}
          >
            <Stack.Screen name="index/index" />
            <Stack.Screen name="add/index" />
            <Stack.Screen
              name="categories/index"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
          </Stack>
        </SQLiteProvider>
      </Suspense>
    </View>
  )
}
