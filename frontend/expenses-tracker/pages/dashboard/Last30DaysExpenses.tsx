import { useMemo } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper.tsx";
import CustomBarChart from "./CustomBarChart.tsx";
import type { ExpenseTransaction } from "./ExpenseTransactions.tsx";
import { useTranslation } from "react-i18next";

interface Last30DaysExpensesProps {
  data: ExpenseTransaction[];
}

const Last30DaysExpenses = ({ data }: Last30DaysExpensesProps) => {
  const { t } = useTranslation();
  const chartData = useMemo(() => {
    return prepareExpenseBarChartData(data);
  }, [data]);

  return (
    <section className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg mb-3 md:mb-5">
          {t("expense.common.last30Expense")}
        </h5>
      </div>

      <CustomBarChart data={chartData} />
    </section>
  );
};

export default Last30DaysExpenses;
