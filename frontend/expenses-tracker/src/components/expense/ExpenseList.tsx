import type { ExpenseOverviewData } from "./ExpenseOverview";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Layouts/TransactionInfoCard";
import { useTranslation } from "react-i18next";

interface ExpenseListProps {
  transactions: ExpenseOverviewData[];
  onDelete: (id: string) => void;
  onDownload: () => void;
}

const ExpenseList = ({
  transactions,
  onDelete,
  onDownload,
}: ExpenseListProps) => {
  const { t } = useTranslation();

  return (
    <section className="card text-lg text-gray-950 dark:text-slate-50">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{t("expense.expenseProps.expenseCategory")}</h5>

        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" />
          {t("common.download")}
        </button>
      </div>

      <div className="relative grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-4">
        <div
          aria-hidden="true"
          className="absolute inset-y-1 left-1/2 hidden w-px -translate-x-1/2 bg-gray-200 dark:bg-gray-700 md:block"
        />
        {transactions.map((expense) => (
          <TransactionInfoCard
            key={expense.id}
            title={expense.category}
            icon={expense.icon}
            date={expense.date}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ExpenseList;
