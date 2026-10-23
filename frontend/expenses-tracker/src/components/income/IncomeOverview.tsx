import { useMemo } from "react";
import { LuPlus } from "react-icons/lu";
import { type TransactionIcons } from "../Layouts/TransactionInfoCard";
import { prepareIncomeBarChartData } from "../../../utils/helper";
import CustomBarChart from "../../../pages/dashboard/CustomBarChart";
import { useTranslation } from "react-i18next";

export interface IncomeOverviewData {
  id: string;
  source: string;
  icon: TransactionIcons;
  date: Date | string;
  amount: number;
}

export interface IncomeOverviewProps {
  transactions: IncomeOverviewData[];
  onAddIncome: () => void;
}

const IncomeOverview = ({ transactions, onAddIncome }: IncomeOverviewProps) => {
  const { t } = useTranslation();
  const chartData = useMemo(() => {
    return prepareIncomeBarChartData(transactions);
  }, [transactions]);

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">{t("income.incomeProps.incomeOverview")}</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            {t("income.incomeProps.incomeParagraph")}
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          {t("income.common.addIncome")}
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </section>
  );
};

export default IncomeOverview;
