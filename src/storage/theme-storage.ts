import AsyncStorage from "@react-native-async-storage/async-storage"

const LINKS_THEME_STORAGE_KEY = "@links:theme"

async function get() {
  try {
    const response = await AsyncStorage.getItem(LINKS_THEME_STORAGE_KEY)

    return response
  } catch (error) {
    throw error
  }
}

async function save(theme: string) {
  try {
    await AsyncStorage.setItem(LINKS_THEME_STORAGE_KEY, theme)
  } catch (error) {
    throw error
  }
}

export const themeStorage = { get, save }
