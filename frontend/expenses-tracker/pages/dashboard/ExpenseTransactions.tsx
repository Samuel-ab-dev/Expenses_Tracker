import TransactionInfoCard, {
  type TransactionIcons,
} from "../../src/components/Layouts/TransactionInfoCard.tsx";
import { LuArrowRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";

export interface ExpenseTransaction {
  id: string;
  category: string;
  icon: TransactionIcons;
  date: Date | string;
  amount: number;
}

interface ExpenseTransactionsProps {
  transactions: ExpenseTransaction[];
  onSeeMore: () => void;
}

const ExpenseTransactions = ({
  transactions,
  onSeeMore,
}: ExpenseTransactionsProps) => {
  const { t } = useTranslation();

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h5>{t("navigation.expense")}</h5>

        <button className="card-btn" onClick={onSeeMore}>
          {t("common.seeAll")} <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions.slice(0, 5).map((expense) => (
          <TransactionInfoCard
            key={expense.id}
            title={expense.category}
            icon={expense.icon}
            date={expense.date}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </section>
  );
};

export default ExpenseTransactions;
