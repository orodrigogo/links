import { StyleSheet } from "react-native"
import { colors } from "@/styles/colors"

export const styles = StyleSheet.create({
  list: {
    height: 52,
    maxHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[600],
  },
  content: {
    gap: 16,
    paddingHorizontal: 24,
  },
})
