import { colors } from "@/styles/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  name: {
    color: colors.gray[100],
    fontWeight: "500",
    fontSize: 16,
    flex: 1,
  },
})
