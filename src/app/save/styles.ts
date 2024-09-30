import { StyleSheet } from "react-native"

import { colors } from "@/styles/colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
    backgroundColor: colors.gray[950],
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
  modalContent: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.gray[950],
    paddingBottom: 32,
  },
  label: {
    color: colors.gray[400],
    fontSize: 14,
    paddingHorizontal: 24,
  },
  form: {
    padding: 24,
    gap: 16,
  },
  categoriesContent: {
    gap: 20,
    paddingTop: 24,
    paddingBottom: 100,
  },
  modalHeader: {
    width: "100%",
    paddingTop: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  search: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[600],
    paddingVertical: 24,
  },
  modalNewCategory: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalNewCategoryTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray[400],
  },
})
