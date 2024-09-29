import { StyleSheet } from "react-native"

import { colors } from "@/styles/colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 62,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    color: colors.gray[200],
    fontSize: 24,
    fontWeight: "600",
  },
  form: {
    gap: 16,
    flex: 1,
  },
  removeButton: {
    marginBottom: 32,
  },
  remove: {
    color: colors.gray[400],
    fontWeight: "600",
    textAlign: "center",
  },
})
