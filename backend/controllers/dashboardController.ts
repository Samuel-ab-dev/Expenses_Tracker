import Income from "../models/Income.ts";
import Expense from "../models/Expenses.ts";
import { Types } from "mongoose";
import { RouteError } from "../utils/routeError.ts";
import type { Request, Response } from "express";

export const getDashboardData = async (req: Request, res: Response) => {
  const userId = req.user.id;

  if (!Types.ObjectId.isValid(userId)) {
    throw new RouteError(400, "Invalid user id");
  }

  const userObjectId = new Types.ObjectId(userId);

  const now = Date.now();

  const sixtyDaysAgo = new Date(now - 60 * 24 * 60 * 60 * 1000);

  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const [
    incomeResult,
    expenseResult,
    last60DaysIncomeTransactions,
    last30DaysExpenseTransactions,
    lastIncomeTransactions,
    lastExpenseTransactions,
  ] = await Promise.all([
    Income.aggregate([
      {
        $match: {
          userId: userObjectId,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]),

    Expense.aggregate([
      {
        $match: {
          userId: userObjectId,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]),

    Income.find({
      userId: userObjectId,
      date: {
        $gte: sixtyDaysAgo,
      },
    }).sort({ date: -1 }),

    Expense.find({
      userId: userObjectId,
      date: {
        $gte: thirtyDaysAgo,
      },
    }).sort({ date: -1 }),

    Income.find({
      userId: userObjectId,
    })
      .sort({ date: -1 })
      .limit(5),

    Expense.find({
      userId: userObjectId,
    })
      .sort({ date: -1 })
      .limit(5),
  ]);

  const totalIncome = incomeResult[0]?.total ?? 0;
  const totalExpense = expenseResult[0]?.total ?? 0;

  const incomeLast60Days = last60DaysIncomeTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  const expenseLast30Days = last30DaysExpenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  const recentTransactions = [
    ...lastIncomeTransactions.map((transaction) => ({
      ...transaction.toObject(),
      type: "income" as const,
    })),

    ...lastExpenseTransactions.map((transaction) => ({
      ...transaction.toObject(),
      type: "expense" as const,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const balance = totalIncome - totalExpense;

  res.status(200).json({
    totalIncome,
    totalExpense,
    balance,
    incomeLast60Days,
    expenseLast30Days,
    expenseLast30DaysTransactions: last30DaysExpenseTransactions,
    incomeLast60DaysTransactions: last60DaysIncomeTransactions,
    recentTransactions,
  });
};
