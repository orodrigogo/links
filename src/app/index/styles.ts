import { StyleSheet } from "react-native"

import { colors } from "@/styles/colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[950],
    paddingTop: 62,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  logo: {
    height: 32,
    width: 38,
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
  modalContent: {
    backgroundColor: colors.gray[900],
    borderTopWidth: 1,
    borderTopColor: colors.gray[800],
    paddingBottom: 32,
    padding: 24,
  },
  modalClose: {
    alignItems: "flex-end",
  },
  name: {
    fontSize: 16,
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
})
