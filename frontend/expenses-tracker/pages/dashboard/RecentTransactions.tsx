import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard, {
  type TransactionIcons,
} from "../../src/components/Layouts/TransactionInfoCard.tsx";
import { useTranslation } from "react-i18next";

interface RecentTransactions {
  _id: string;
  type: "expense" | "income";
  category?: string;
  source?: string;
  icon: TransactionIcons;
  date?: Date;
  amount?: number;
}

interface RecentTranscationsProps {
  recentTransactions: RecentTransactions[];
  onSeeMore: () => void;
}

const RecentTransactions = ({
  recentTransactions,
  onSeeMore,
}: RecentTranscationsProps) => {
  const { t } = useTranslation();

  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{t("dashboard.recentTransactions")}</h5>

        <button className="card-btn" onClick={onSeeMore}>
          {t("common.seeMore")} <LuArrowRight className="text-base" />
        </button>
      </div>

      <article className="mt-6">
        {recentTransactions?.slice(0, 5)?.map((i) => (
          <TransactionInfoCard
            key={i._id}
            title={
              i.type == "expense"
                ? (i.category ?? "Expense")
                : (i.source ?? "Income")
            }
            icon={i.icon}
            date={i.date ? new Date(i.date) : new Date()}
            amount={i.amount ?? 0}
            type={i.type}
            hideDeleteBtn
          />
        ))}
      </article>
    </section>
  );
};

export default RecentTransactions;
