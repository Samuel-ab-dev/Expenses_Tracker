import { useUserAuth } from "../../hooks/useUserAuth.tsx";
import { useDashboard } from "../../hooks/queries/useDashboard.tsx";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import InfoCard from "../../src/components/InfoCard.tsx";
import { addThousandsSeparator } from "../../utils/helper.tsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import RecentTransactions from "./RecentTransactions.tsx";
import FinanceOverview from "./FinanceOverview.tsx";
import ExpenseTransactions from "./ExpenseTransactions.tsx";
import Last30DaysExpenses from "./Last30DaysExpenses.tsx";
import IncomeTransactions from "./IncomeTransactions.tsx";
import Last60DaysIncome from "./Last60DaysIncome.tsx";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const { data: dashboardData, isLoading, isError } = useDashboard();
  if (isLoading) {
    return <div className="my-5 m-auto">{t("common.loading")}</div>;
  }

  if (isError) {
    return <div className="my-5 m-auto">{t("auth.errors.failBalance")}</div>;
  }

  return (
    <div className="my-5 mx-auto">
      {dashboardData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <InfoCard
              icon={IoMdCard}
              label={t("dashboard.totalBalance")}
              value={addThousandsSeparator(
                dashboardData.balance || 0,
                i18n.resolvedLanguage || "en-US",
              )}
              color="bg-primary"
            />

            <InfoCard
              icon={LuWalletMinimal}
              label={t("dashboard.totalIncome")}
              value={addThousandsSeparator(
                dashboardData.totalIncome || 0,
                i18n.resolvedLanguage || "en-US",
              )}
              color="bg-emerald-500"
            />

            <InfoCard
              icon={LuHandCoins}
              label={t("dashboard.totalExpense")}
              value={addThousandsSeparator(
                dashboardData.totalExpense || 0,
                i18n.resolvedLanguage || "en-US",
              )}
              color="bg-red-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransactions
              recentTransactions={dashboardData.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />

            <FinanceOverview
              totalBalance={dashboardData.balance || 0}
              totalIncome={dashboardData.totalIncome || 0}
              totalExpense={dashboardData.totalExpense || 0}
            />

            <Last30DaysExpenses
              data={dashboardData?.expenseLast30DaysTransactions ?? []}
            />

            <ExpenseTransactions
              transactions={dashboardData.expenseLast30DaysTransactions || []}
              onSeeMore={() => navigate("/expense")}
            />

            <IncomeTransactions
              data={dashboardData.incomeLast60DaysTransactions || []}
              onSeeMore={() => navigate("/income")}
            />

            <Last60DaysIncome
              data={dashboardData?.incomeLast60DaysTransactions ?? []}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
