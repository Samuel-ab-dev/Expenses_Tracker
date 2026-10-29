import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "../src/i18n/locales/translationKeys/CustomPieChartTranslationKey.ts";

interface LegendItem {
  value?: string | number;
  color?: string;
}

interface RenderLegendProps {
  payload?: LegendItem[];
}

export const RenderLegend = ({ payload }: RenderLegendProps) => {
  const { t } = useTranslation();

  const translateLabel = (value?: string | number) => {
    if (value === undefined) return "";

    const key = TRANSLATION_KEYS[String(value)];

    return key ? t(key) : String(value);
  };

  return (
    <ul className="flex justify-center gap-2">
      {payload?.map((entry) => (
        <li key={entry.value} className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>{translateLabel(entry.value)}</span>
        </li>
      ))}
    </ul>
  );
};
