import { StyleSheet } from "react-native"

import { colors } from "@/styles/colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[950],
    paddingTop: 62,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    color: colors.gray[200],
    fontSize: 24,
    fontWeight: "600",
  },
  form: {
    padding: 24,
    gap: 16,
  },
})
