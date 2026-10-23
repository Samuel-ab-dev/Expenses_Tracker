import api from "../../utils/axiosInstances.tsx";
import { useQuery } from "@tanstack/react-query";
import { API_PATHS } from "../../utils/apiPaths.ts";
import { type TransactionIcons } from "../../src/components/Layouts/TransactionInfoCard.tsx";

export interface IncomeData {
  id: string;
  source: string;
  icon: TransactionIcons;
  date: Date | string;
  amount: number;
}

const getIncomeData = async () => {
  const res = await api.get<IncomeData[]>(API_PATHS.INCOME.GET_INCOME);

  return res.data;
};

export const useIncome = () => {
  return useQuery<IncomeData[]>({
    queryKey: ["income"],
    queryFn: getIncomeData,
    staleTime: 1000 * 60,
  });
};

export default useIncome;
