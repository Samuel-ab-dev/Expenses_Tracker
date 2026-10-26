import { useTranslation } from "react-i18next";

import {
  ResponsiveContainer,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  type TooltipContentProps,
  Area,
  ComposedChart,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface LineData {
  amount: number;
  date: Date | string;
  label: string;
}

interface CustomLineChartProps {
  data: LineData[];
}

const CustomLineChart = ({ data }: CustomLineChartProps) => {
  const { t } = useTranslation();

  const customToolTip = ({
    active,
    payload,
  }: TooltipContentProps<ValueType, NameType>) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const item = payload[0].payload as LineData;
    return (
      <div className="rounded-xl border border-gray-200 bg-slate-50 px-3 py-2 shadow-lg shadow-gray-900/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-black/20">
        <p className="mb-1 text-xs font-semibold text-purple-900  dark:text-purple-400">
          {item.label}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {`${t("common.amount")}:`}
          <span className="text-sm font-medium text-gray-950 dark:text-slate-50">
            {t("common.moneySymbol")}
            {item.amount}
          </span>
        </p>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={380}>
      <ComposedChart
        data={data}
        margin={{ top: 10, right: 12, left: 8, bottom: 0 }}
      >
        <defs>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#875cf5" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#875cf5" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="var(--chart-grid)"
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "var(--chart-axis)" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "var(--chart-axis)" }}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip content={customToolTip} />

        <Area
          type="monotone"
          dataKey="amount"
          stroke="none"
          fill="url(#expenseGradient)"
          fillOpacity={1}
          tooltipType="none"
          activeDot={false}
        />

        <Line
          type="monotone"
          dataKey="amount"
          stroke="#875cf5"
          strokeWidth={2}
          dot={{
            r: 3,
            fill: "#875cf5",
            stroke: "var(--chart-point-border)",
            strokeWidth: 1.5,
          }}
          activeDot={{
            r: 5,
            fill: "#875cf5",
            stroke: "var(--chart-point-border)",
            strokeWidth: 2,
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
