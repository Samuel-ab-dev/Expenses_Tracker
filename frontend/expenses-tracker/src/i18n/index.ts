import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ptBR from "./locales/pt-BR/translation.json";
import enUS from "./locales/en-US/translation.json";
import jaJP from "./locales/ja-JP/translation.json";

const resources = {
  "pt-BR": {
    translation: ptBR,
  },
  "en-US": {
    translation: enUS,
  },
  "ja-JP": {
    translation: jaJP,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    fallbackLng: "en-US",

    supportedLngs: ["en-US", "pt-BR", "ja-JP"],

    detection: {
      order: ["localStorage", "navigator"],

      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
