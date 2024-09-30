import { StyleSheet } from "react-native"

import { colors } from "@/styles/colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
    backgroundColor: colors.gray[950],
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  search: {
    padding: 24,
  },
  links: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[600],
    marginTop: 24,
  },
  linksContent: {
    gap: 20,
    padding: 24,
    paddingBottom: 100,
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  modalContent: {
    backgroundColor: colors.gray[900],
    borderTopWidth: 1,
    borderTopColor: colors.gray[800],
    paddingBottom: 32,
    padding: 24,
  },
  category: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray[400],
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[200],
  },
  url: {
    fontSize: 14,
    color: colors.gray[400],
  },
  footer: {
    marginTop: 32,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.gray[600],
    paddingVertical: 14,
  },
  categoryList: {
    height: 42,
    maxHeight: 42,
  },
  categoryContent: {
    gap: 16,
    paddingHorizontal: 24,
  },
  emptyList: {
    fontSize: 16,
    color: colors.gray[400],
  },
})
