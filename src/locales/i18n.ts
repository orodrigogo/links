import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { getLocales } from "expo-localization"

import en from "./en.json"
import pt from "./pt.json"

const language = getLocales()[0].languageCode ?? "en"

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: language,
  fallbackLng: "en",
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
