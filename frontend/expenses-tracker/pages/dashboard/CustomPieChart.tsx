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
  const { t } = useTranslation();

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
      <div className="rounded-xl border border-gray-100 bg-violet-50 px-3 py-2 shadow-lg">
        <p className="text-xs font-semibold text-purple-900 mb-1">
          {item.name}
        </p>
        <p className="text-sm text-gray-600">
          {`${t("common.amount")}:`}
          <span className="text-sm font-medium text-gray-900">
            {t("common.moneySymbol")}
            {item.value}
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
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight={600}
            >
              {amount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
