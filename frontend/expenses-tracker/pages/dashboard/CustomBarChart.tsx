import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipContentProps,
  ResponsiveContainer,
  Rectangle,
  type BarShapeProps,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface ChartData {
  amount: number;
  date: Date | string;
  label: string;
}

interface CustomBarChartProps {
  data: ChartData[];
}

const CustomBarChart = ({ data }: CustomBarChartProps) => {
  const { t } = useTranslation();
  const getColor = (index: number) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomBar = (props: BarShapeProps) => {
    const { index } = props;

    return (
      <Rectangle {...props} fill={getColor(Number(index))} strokeWidth={2} />
    );
  };

  const customToolTip = ({
    active,
    payload,
  }: TooltipContentProps<ValueType, NameType>) => {
    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const item = payload[0].payload as ChartData;
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
    <article>
      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={data} barCategoryGap="15%">
          <CartesianGrid
            stroke="#d1d5db"
            strokeDasharray="4 4"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "#4b5563" }}
            axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#4b5563" }}
            axisLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
            tickLine={false}
          />

          <Tooltip content={customToolTip} cursor={false} />

          <Bar
            dataKey="amount"
            shape={CustomBar}
            radius={[8, 8, 0, 0]}
            activeBar={CustomBar}
            maxBarSize={90}
          />
        </BarChart>
      </ResponsiveContainer>
    </article>
  );
};

export default CustomBarChart;
