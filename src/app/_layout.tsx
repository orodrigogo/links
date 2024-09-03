import { View } from "react-native"
import { Stack } from "expo-router"
import { colors } from "@/styles/colors"

export default function Layout() {
  const backgroundColor = colors.gray[950]
  return (
    <View style={{ flex: 1, backgroundColor }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor },
        }}
      />
    </View>
  )
}
