import { type TransactionIcons } from "../../src/components/Layouts/TransactionInfoCard.tsx";
import api from "../../utils/axiosInstances.tsx";
import { API_PATHS } from "../../utils/apiPaths.ts";
import { useQuery } from "@tanstack/react-query";

export interface ExpenseData {
  id: string;
  category: string;
  icon: TransactionIcons;
  date: Date | string;
  amount: number;
}

const getExpenseData = async () => {
  const res = await api.get<ExpenseData[]>(API_PATHS.EXPENSE.GET_EXPENSE);

  return res.data;
};

export const useExpense = () => {
  return useQuery<ExpenseData[]>({
    queryKey: ["expense"],
    queryFn: getExpenseData,
    staleTime: 1000 * 60,
  });
};

export default useExpense;
