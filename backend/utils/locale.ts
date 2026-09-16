type ExportLocale = "en-US" | "pt-BR" | "ja-JP";

interface ExcelFormat {
  headers: { source: string; amount: string; date: string };
  currency: string;
  date: string;
}

export const excelFormats: Record<ExportLocale, ExcelFormat> = {
  "en-US": {
    headers: {
      source: "Source",

      amount: "Amount",
      date: "Date",
    },
    currency: "$ #,##0.00",
    date: "mm/dd/yyyy",
  },

  "pt-BR": {
    headers: {
      source: "Fonte",
      amount: "Valor",
      date: "Data",
    },
    currency: "R$ #,##0.00",
    date: "dd/mm/yyyy",
  },

  "ja-JP": {
    headers: {
      source: "資金源",
      amount: "金額",
      date: "日付",
    },
    currency: "¥#,##0.00",
    date: "yyyy/mm/dd",
  },
};
