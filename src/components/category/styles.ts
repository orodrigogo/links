import { colors } from "@/styles/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.gray[400],
    borderRadius: 5,
    borderStyle: "dashed",
  },
  containerSelected: {
    backgroundColor: colors.green[300],
    borderColor: "transparent",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[400],
  },
  nameSelected: {
    color: colors.gray[950],
  },
})
