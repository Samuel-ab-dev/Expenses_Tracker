import type { Request, Response } from "express";
import Income from "../models/Income.ts";
import ExcelJS from "@ayocore/exceljs";
import { RouteError } from "../utils/routeError.ts";
import { excelFormats } from "../utils/locale.ts";

const IncomeData = (income: InstanceType<typeof Income>) => {
  return {
    id: income._id.toString(),
    icon: income.icon,
    source: income.source,
    amount: income.amount,
    date: income.date,
  };
};

export const addIncome = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { icon, source, amount, date } = req.body;

  const newIncome = await Income.create({
    userId,
    icon,
    source,
    amount,
    date,
  });
  res.status(201).json({
    message: `Income Successfully saved!`,
    income: IncomeData(newIncome),
  });
};

export const getAllIncome = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const incomes = await Income.find({ userId }).sort({ date: -1 });

  const formattedIncomes = incomes.map(IncomeData);
  res.json(formattedIncomes);
};

export const deleteIncome = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const incomeId = req.params.id;

  const deletedIncome = await Income.findOneAndDelete({
    _id: incomeId,
    userId,
  });

  if (!deletedIncome) {
    throw new RouteError(404, "Income data not found");
  }

  res.json({ message: "Income successfully deleted!" });
};

export const downloadExcelIncome = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const locale = req.user.locale;
  const format = excelFormats[req.user.locale];

  const incomes = await Income.find(
    { userId },
    {
      source: 1,
      amount: 1,
      date: 1,
    },
  ).sort({ date: -1 });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Income");

  worksheet.columns = [
    {
      header: format.headers.source,
      key: "source",
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

  for (const income of incomes) {
    worksheet.addRow({
      source: income.source,
      amount: income.amount,
      date: income.date,
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
    'attachment; filename="income_details.xlsx"',
  );

  res.send(buffer);
};
