import { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../utils/axiosInstances";
import { LuCheck, LuChevronDown, LuLanguages } from "react-icons/lu";

type Locale = "en-US" | "pt-BR" | "ja-JP";

const languages: {
  locale: Locale;
  label: string;
  flag: string;
}[] = [
  { locale: "en-US", label: "English", flag: "US" },
  { locale: "pt-BR", label: "Português", flag: "BR" },
  { locale: "ja-JP", label: "日本語", flag: "JP" },
];

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const currentLocale = languages.some(
    (language) => language.locale === i18n.language,
  )
    ? (i18n.language as Locale)
    : "en-US";

  const selectedLanguage = languages.find(
    (language) => language.locale === currentLocale,
  );

  const handleLanguageChange = async (locale: Locale) => {
    if (locale === currentLocale || isChanging) {
      setIsOpen(false);
      return;
    }

    setIsChanging(true);

    try {
      await api.patch("/api/v1/auth/locale", { locale });

      await i18n.changeLanguage(locale);

      setIsOpen(false);
    } catch (err) {
      console.error("Failed to change language: " + err);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        disabled={isChanging}
        aria-label={t("common.language")}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="inline-flex items-center justify-center gap-2
          rounded-xl border border-gray-200
          bg-white px-3 py-2 text-sm font-medium
          text-gray-700 shadow-sm transition
          hover:bg-gray-50
          disabled:cursor-wait disabled:opacity-60
          dark:border-gray-700 dark:bg-gray-800
          dark:text-gray-100 dark:hover:bg-gray-700"
      >
        <LuLanguages size={18} className="text-primary" />
        <span>{selectedLanguage?.label}</span>

        <LuChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-48
            overflow-hidden rounded-xl
            border border-gray-200 bg-white
            p-1 shadow-lg
            dark:border-gray-700 dark:bg-gray-800"
        >
          {languages.map((language) => {
            const isSelected = language.locale === currentLocale;

            return (
              <button
                key={language.locale}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                disabled={isChanging}
                onClick={() => handleLanguageChange(language.locale)}
                className={`
                  flex w-full items-center gap-3
                  rounded-lg px-3 py-2.5 text-sm
                  transition
                  ${
                    isSelected
                      ? "bg-violet-50 text-primary dark:bg-violet-950"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                <span aria-hidden="true">{language.flag}</span>
                <span className="flex-1 text-left">{language.label}</span>
                {isSelected && <LuCheck size={16} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
