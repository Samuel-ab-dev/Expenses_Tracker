import { format, parseISO } from "date-fns";
import { type ExpenseTransaction } from "../pages/dashboard/ExpenseTransactions.tsx";
import type { IncomeTransaction } from "../pages/dashboard/IncomeTransactions.tsx";

export const getInitials = (userName: string) => {
  if (!userName) return "";

  const words = userName.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num: number) => {
  if (num === null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : `${formattedInteger}`;
};

export const prepareExpenseBarChartData = (data: ExpenseTransaction[]) => {
  const expensesByDate = new Map<string, { amount: number }>();

  for (const expense of data) {
    const date = new Date(expense.date).toISOString().slice(0, 10);

    const amount = Number(expense.amount);

    const existing = expensesByDate.get(date);

    if (existing) {
      existing.amount += amount;
    } else {
      expensesByDate.set(date, {
        amount,
      });
    }
  }

  return Array.from(expensesByDate.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, expense]) => ({
      date,
      amount: expense.amount,
      label: format(parseISO(date), "dd/MM"),
    }));
};

export const prepareIncomeBarChartData = (data: IncomeTransaction[]) => {
  const incomeByDate = new Map<string, number>();

  for (const income of data) {
    const date = new Date(income.date).toISOString().slice(0, 10);

    const amount = Number(income.amount);

    const existing = incomeByDate.get(date) ?? 0;

    incomeByDate.set(date, existing + amount);
  }

  return Array.from(incomeByDate, ([date, amount]) => ({
    date,
    label: date,
    amount,
  })).sort((a, b) => a.label.localeCompare(b.label));
};

export const prepareCharData = (data: IncomeTransaction[]) => {
  const incomeBySource = new Map<string, number>();

  for (const income of data) {
    const existingAmount = incomeBySource.get(income.source) ?? 0;

    const amount = Number(income.amount);

    incomeBySource.set(income.source, existingAmount + amount);
  }

  return Array.from(incomeBySource, ([name, value]) => ({
    name,
    value,
  }));
};

export const prepareExpenseLineChartData = (data: ExpenseTransaction[]) => {
  const expensesByDate = new Map<string, { amount: number }>();

  for (const expense of data) {
    const date = new Date(expense.date).toISOString().slice(0, 10);

    const amount = Number(expense.amount);

    const existing = expensesByDate.get(date);

    if (existing) {
      existing.amount += amount;
    } else {
      expensesByDate.set(date, {
        amount,
      });
    }
  }

  return Array.from(expensesByDate.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, expense]) => ({
      date,
      amount: expense.amount,
      label: format(parseISO(date), "dd/MM"),
    }));
};
