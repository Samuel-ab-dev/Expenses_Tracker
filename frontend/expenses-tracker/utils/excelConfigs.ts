import type { IncomeData } from "../hooks/queries/useIncome";
import type { ExpenseData } from "../hooks/queries/useExpense";

import type { ExcelColumn } from "./exportToExcel";

export const incomeExcelColumns: ExcelColumn<IncomeData>[] = [
  { header: "Source", key: "source", width: 30 },
  {
    header: "Amount",
    key: "amount",
    width: 18,
    numFmt: '"R$" #,##0.00',
  },
  {
    header: "Date",
    key: "date",
    width: 18,
    numFmt: "dd/mm/yyyy",
  },
];

export const expenseExcelColumns: ExcelColumn<ExpenseData>[] = [
  { header: "Category", key: "category", width: 30 },
  {
    header: "Amount",
    key: "amount",
    width: 18,
    numFmt: '"R$" #,##0.00',
  },
  {
    header: "Date",
    key: "date",
    width: 18,
    numFmt: "dd/mm/yyyy",
  },
];

export const incomeExcelConfig = {
  sheetName: "Income",
  fileName: "income.xlsx",
  columns: incomeExcelColumns,
};

export const expenseExcelConfig = {
  sheetName: "Expenses",
  fileName: "expenses.xlsx",
  columns: expenseExcelColumns,
};
