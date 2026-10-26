import { useMemo } from "react";
import { LuPlus } from "react-icons/lu";
import { type TransactionIcons } from "../Layouts/TransactionInfoCard";
import { prepareExpenseLineChartData } from "../../../utils/helper";
import CustomLineChart from "../../../pages/dashboard/CustomLineChart";
import { useTranslation } from "react-i18next";

export interface ExpenseOverviewData {
  id: string;
  category: string;
  icon: TransactionIcons;
  date: Date | string;
  amount: number;
}

export interface ExpenseOverviewProps {
  transactions: ExpenseOverviewData[];
  onAddExpense: () => void;
}

const ExpenseOverview = ({
  transactions,
  onAddExpense,
}: ExpenseOverviewProps) => {
  const { t } = useTranslation();
  const chartData = useMemo(() => {
    return prepareExpenseLineChartData(transactions);
  }, [transactions]);

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg ext-gray-950 dark:text-slate-50">
            {t("expense.expenseProps.expenseOverview")}
          </h5>
          <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
            {t("expense.expenseProps.expenseParagraph")}
          </p>
        </div>

        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className="text-lg" />
          {t("expense.common.addExpense")}
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </section>
  );
};

export default ExpenseOverview;
