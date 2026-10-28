import {
  PieChart,
  Pie,
  ResponsiveContainer,
  type TooltipContentProps,
  Legend,
  Tooltip,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import { RenderLegend } from "../../utils/renderLegend.tsx";
import { useTranslation } from "react-i18next";

type PieData = {
  name: string;
  value: number;
  fill?: string;
};

interface CustomPieChartProps {
  balance: { name: string; value: number }[];
  label: string;
  amount: string;
  colors: string[];
  showTextAnchor?: boolean;
}

const CustomPieChart = ({
  balance,
  label,
  amount,
  colors,
  showTextAnchor = false,
}: CustomPieChartProps) => {
  const { t, i18n } = useTranslation();

  const locale = i18n.resolvedLanguage ?? i18n.language;

  const formatNumber = (value: number) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const chartData = balance.map((entry, index) => ({
    ...entry,
    fill: colors.length > 0 ? colors[index % colors.length] : undefined,
  }));

  const customToolTip = ({
    active,
    payload,
  }: TooltipContentProps<ValueType, NameType>) => {
    if (!active || !payload || payload.length === 0) return null;

    const item = payload[0].payload as PieData;

    return (
      <div className="rounded-xl border border-gray-200 bg-slate-50 px-3 py-2 shadow-lg shadow-gray-900/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-black/20">
        <p className="text-xs font-semibold text-purple-900 dark:text-purple-400 mb-1">
          {t(
            item.name === "Total Income"
              ? "dashboard.totalIncome"
              : item.name === "Total Balance"
                ? "dashboard.totalBalance"
                : item.name === "Total Expense"
                  ? "dashboard.totalExpense"
                  : "Total Expense",
          )}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t("common.amount")}:{" "}
          <span className="text-sm font-medium text-gray-950 dark:text-slate-50">
            {t("common.moneySymbol")}
            {formatNumber(item.value)}
          </span>
        </p>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        />

        <Tooltip content={customToolTip} />
        <Legend content={<RenderLegend />} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="var(--chart-center-label)"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="var(--chart-center-value)"
              fontSize="24px"
              fontWeight={600}
            >
              {typeof amount === "number"
                ? `${t("common.moneySymbol")} ${formatNumber(amount)}`
                : amount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
