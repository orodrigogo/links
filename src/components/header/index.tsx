import { Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"

import { styles } from "./styles"
import { colors } from "@/styles/colors"

type Props = {
  title: string
}

export function Header({ title }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
