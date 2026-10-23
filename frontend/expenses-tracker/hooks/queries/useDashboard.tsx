import api from "../../utils/axiosInstances.tsx";
import { useQuery } from "@tanstack/react-query";
import { API_PATHS } from "../../utils/apiPaths.ts";
import type RecentTransactions from "../../pages/dashboard/RecentTransactions.tsx";
import type { ExpenseTransaction } from "../../pages/dashboard/ExpenseTransactions.tsx";
import type { IncomeTransaction } from "../../pages/dashboard/IncomeTransactions.tsx";

export interface DashboardData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  expenseLast30Days: number;
  incomeLast60Days: number;
  expenseLast30DaysTransactions: ExpenseTransaction[];
  incomeLast60DaysTransactions: IncomeTransaction[];
  recentTransactions: RecentTransactions[];
}

const getDashboardData = async () => {
  const res = await api.get<DashboardData>(API_PATHS.DASHBOARD.GET_DATA);

  return res.data;
};

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    staleTime: 1000 * 60,
  });
};

export default useDashboard;
