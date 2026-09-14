import type { Request, Response } from "express";
import ExcelJS from "@ayocore/exceljs";
import { RouteError } from "../utils/routeError.ts";
import { excelFormats } from "../utils/locale.ts";
import Expense from "../models/Expenses.ts";

const ExpenseData = (expense: InstanceType<typeof Expense>) => {
  return {
    id: expense._id.toString(),
    icon: expense.icon,
    category: expense.category,
    amount: expense.amount,
    date: expense.date,
  };
};

export const addExpense = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { icon, category, amount, date } = req.body;

  const newExpense = await Expense.create({
    userId,
    icon,
    category,
    amount,
    date,
  });
  res.status(201).json({
    message: `Expense successfully saved!`,
    expense: ExpenseData(newExpense),
  });
};

export const getAllExpense = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const expenses = await Expense.find({ userId }).sort({ date: -1 });

  const formattedExpenses = expenses.map(ExpenseData);
  res.json(formattedExpenses);
};

export const deleteExpense = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const expenseId = req.params.id;

  const deletedExpense = await Expense.findOneAndDelete({
    _id: expenseId,
    userId,
  });

  if (!deletedExpense) {
    throw new RouteError(404, "Expense data not found");
  }

  res.json({ message: "Expense successfully deleted!" });
};

export const downloadExcelExpense = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const locale = req.user.locale;
  const format = excelFormats[req.user.locale];

  const expenses = await Expense.find(
    { userId },
    {
      category: 1,
      amount: 1,
      date: 1,
    },
  ).sort({ date: -1 });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Expense");

  worksheet.columns = [
    {
      header: format.headers.category,
      key: "category",
      width: 30,
    },
    {
      header: format.headers.amount,
      key: "amount",
      width: 20,
    },
    {
      header: format.headers.date,
      key: "date",
      width: 25,
    },
  ];

  for (const expense of expenses) {
    worksheet.addRow({
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
    });
  }

  const headerRow = worksheet.getRow(1);

  headerRow.font = {
    bold: true,
  };

  headerRow.alignment = {
    horizontal: "center",
  };

  worksheet.getColumn("amount").numFmt = format.currency;
  worksheet.getColumn("date").numFmt = format.date;

  const buffer = await workbook.xlsx.writeBuffer();

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );

  res.setHeader(
    "Content-Disposition",
    'attachment; filename="expense_details.xlsx"',
  );

  res.send(buffer);
};
