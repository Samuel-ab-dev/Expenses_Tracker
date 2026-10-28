export type AppLocale = "en-US" | "pt-BR" | "ja-JP";

interface ExcelLocaleSettings {
  currency: string;
  source: string;
  category: string;
  amount: string;
  date: string;
  currencyFormat: string;
  dateFormat: string;
}

const excelLocaleConfig = {
  "en-US": {
    currency: "USD",
    source: "Source",
    category: "Category",
    amount: "Amount",
    date: "Date",
    currencyFormat: "$#,##0.00;[Red]-$#,##0.00",
    dateFormat: "mm/dd/yyyy",
  },
  "pt-BR": {
    currency: "BRL",
    source: "Fonte",
    category: "Categoria",
    amount: "Valor",
    date: "Data",
    currencyFormat: '"R$" #,##0.00;[Red]-"R$" #,##0.00',
    dateFormat: "dd/mm/yyyy",
  },
  "ja-JP": {
    currency: "JPY",
    source: "収入源",
    category: "カテゴリ",
    amount: "金額",
    date: "日付",
    currencyFormat: '"¥"#,##0;[Red]-"¥"#,##0',
    dateFormat: "yyyy/mm/dd",
  },
} satisfies Record<AppLocale, ExcelLocaleSettings>;

export const getExcelLocaleConfig = (locale: string) => {
  const normalizedLocale: AppLocale =
    locale in excelLocaleConfig ? (locale as AppLocale) : "en-US";

  return {
    locale: normalizedLocale,
    ...excelLocaleConfig[normalizedLocale],
  };
};
