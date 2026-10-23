import type { IncomeOverviewData } from "./IncomeOverview";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Layouts/TransactionInfoCard";
import { useTranslation } from "react-i18next";

interface IncomeListProps {
  transactions: IncomeOverviewData[];
  onDelete: (id: string) => void;
  onDownload: () => void;
}

const IncomeList = ({
  transactions,
  onDelete,
  onDownload,
}: IncomeListProps) => {
  const { t } = useTranslation();

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{t("income.incomeProps.incomeSource")}</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" />
          {t("common.download")}
        </button>
      </div>

      <div className="relative grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-4">
        <div
          aria-hidden="true"
          className="absolute inset-y-1 left-1/2 hidden w-px -translate-x-1/2 bg-gray-200 md:block"
        />
        {transactions.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.source}
            icon={income.icon}
            date={income.date}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default IncomeList;
