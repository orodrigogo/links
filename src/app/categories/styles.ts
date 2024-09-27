import { StyleSheet } from "react-native"
import { colors } from "@/styles/colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
  },
  categoriesContent: {
    gap: 20,
    padding: 24,
    paddingBottom: 100,
  },
  categoryName: {
    color: colors.gray[100],
    fontWeight: "500",
    fontSize: 16,
  },
  search: {
    marginHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[600],
    paddingBottom: 24,
  },
  category: {
    flexDirection: "row",
  },
  footer: {
    padding: 24,
  },
})
