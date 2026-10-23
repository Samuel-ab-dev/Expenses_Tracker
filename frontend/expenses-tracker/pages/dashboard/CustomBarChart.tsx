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
      <div className="rounded-xl border border-gray-100 bg-violet-50 px-3 py-2 shadow-lg">
        <p className="text-xs font-semibold text-purple-900 mb-1">
          {item.label}
        </p>
        <p className="text-sm text-gray-600">
          {`${t("common.amount")}:`}
          <span className="text-sm font-medium text-gray-900">
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
            stroke="#e5e7eb"
            strokeDasharray="4 4"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb", strokeWidth: 1 }}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb", strokeWidth: 1 }}
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
