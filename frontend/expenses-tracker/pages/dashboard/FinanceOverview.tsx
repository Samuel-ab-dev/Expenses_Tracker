import { useTranslation } from "react-i18next";
import CustomPieChart from "./CustomPieChart.tsx";

interface FinanceOverviewData {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

const COLORS = ["#875CF5", "#00BC7D", "#a8a8a8"];

const FinanceOverview = ({
  totalBalance,
  totalIncome,
  totalExpense,
}: FinanceOverviewData) => {
  const { t } = useTranslation();
  const balance = [
    { name: "Total Balance", value: totalBalance },
    { name: "Total Income", value: totalIncome },
    { name: "Total Expense", value: totalExpense },
  ];

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg text-gray-950 dark:text-slate-50">
          {t("dashboard.financialOverview")}
        </h5>
      </div>

      <CustomPieChart
        balance={balance}
        label={t("dashboard.totalBalance")}
        amount={`${t("common.moneySymbol") + totalBalance.toLocaleString()}`}
        colors={COLORS}
        showTextAnchor
      />
    </section>
  );
};

export default FinanceOverview;
