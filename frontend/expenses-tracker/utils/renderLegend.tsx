interface LegendItem {
  value?: string | number;
  color?: string;
}

interface RenderLegendProps {
  payload?: LegendItem[];
}

export const RenderLegend = ({ payload }: RenderLegendProps) => {
  return (
    <ul className="flex justify-center gap-2">
      {payload?.map((entry) => (
        <li key={entry.value} className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};
