import { useMemo } from "react";
import type { IncomeTransaction } from "./IncomeTransactions.tsx";
import { prepareCharData } from "../../utils/helper.tsx";
import CustomPieChart from "./CustomPieChart.tsx";
import { useTranslation } from "react-i18next";

interface RecentIncome {
  data: IncomeTransaction[];
}

const COLORS = ["#875cf5", "#cfbefb", "#a78bfa", "#c4b5fd"];

const Last60DaysIncome = ({ data }: RecentIncome) => {
  const { t } = useTranslation();

  const chartData = useMemo(() => {
    return prepareCharData(data);
  }, [data]);

  const totalIncome = useMemo(() => {
    return data.reduce((total, income) => total + Number(income.amount), 0);
  }, [data]);

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h5 className="mb-3 text-lg text-gray-950 dark:text-slate-50 md:mb-5">
          {t("income.common.last60Income")}
        </h5>
      </div>

      <CustomPieChart
        balance={chartData}
        label={t("dashboard.totalIncome")}
        amount={`$${totalIncome.toLocaleString()}`}
        colors={COLORS}
        showTextAnchor
      />
    </section>
  );
};

export default Last60DaysIncome;
