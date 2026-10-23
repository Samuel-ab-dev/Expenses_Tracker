import { useTranslation } from "react-i18next";
import TransactionInfoCard, {
  type TransactionIcons,
} from "../../src/components/Layouts/TransactionInfoCard.tsx";
import { LuArrowRight } from "react-icons/lu";

export interface IncomeTransaction {
  id: string;
  source: string;
  icon: TransactionIcons;
  date: Date | string;
  amount: number;
}

interface RecentIncomeProps {
  data: IncomeTransaction[];
  onSeeMore: () => void;
}

const IncomeTransactions = ({ data, onSeeMore }: RecentIncomeProps) => {
  const { t } = useTranslation();

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h5>{t("navigation.income")}</h5>

        <button className="card-btn" onClick={onSeeMore}>
          {t("common.seeAll")} <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {data.slice(0, 5).map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.source}
            icon={income.icon}
            date={income.date}
            amount={income.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </section>
  );
};

export default IncomeTransactions;
