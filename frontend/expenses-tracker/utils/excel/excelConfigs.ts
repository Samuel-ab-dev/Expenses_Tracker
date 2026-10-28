import type { IncomeData } from "../../hooks/queries/useIncome";
import type { ExpenseData } from "../../hooks/queries/useExpense";

import type { ExcelColumn } from "./exportToExcel";
import { getExcelLocaleConfig } from "./excelLocale.ts";

export const getIncomeExcelColumns = (
  locale: string,
): ExcelColumn<IncomeData>[] => {
  const config = getExcelLocaleConfig(locale);

  return [
    {
      header: config.source,
      key: "source",
      width: 30,
    },
    {
      header: config.amount,
      key: "amount",
      width: 18,
      numFmt: config.currencyFormat,
    },
    {
      header: config.date,
      key: "date",
      width: 18,
      numFmt: config.dateFormat,
    },
  ];
};

export const getExpenseExcelColumns = (
  locale: string,
): ExcelColumn<ExpenseData>[] => {
  const config = getExcelLocaleConfig(locale);

  return [
    {
      header: config.category,
      key: "category",
      width: 30,
    },
    {
      header: config.amount,
      key: "amount",
      width: 18,
      numFmt: config.currencyFormat,
    },
    {
      header: config.date,
      key: "date",
      width: 18,
      numFmt: config.dateFormat,
    },
  ];
};

export const getIncomeExcelConfig = (locale: string) => ({
  sheetName: "Income",
  fileName: "income.xlsx",
  columns: getIncomeExcelColumns(locale),
});

export const getExpenseExcelConfig = (locale: string) => ({
  sheetName: "Expenses",
  fileName: "expenses.xlsx",
  columns: getExpenseExcelColumns(locale),
});
