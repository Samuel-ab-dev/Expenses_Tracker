import axios from "axios";
import type { TFunction } from "i18next";

export function getApiTranslatedErrors(
  error: unknown,
  t: TFunction,
  translations: Record<string, string>,
): string {
  if (!axios.isAxiosError(error)) {
    return t("auth.login.serverError");
  }

  const errorCode = error.response?.data?.code;

  if (typeof errorCode !== "string") {
    return t("auth.login.serverError");
  }

  const translationKey = translations[errorCode];

  if (!translationKey) {
    return t("auth.login.serverError");
  }

  return t(translationKey);
}
