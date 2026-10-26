import type { IconType } from "react-icons";

type StatsInfoCardProps = {
  icon: IconType;
  label: string;
  value: string | number;
  color?: string;
};

const StatsInfoCard = ({
  icon: Icon,
  label,
  value,
  color,
}: StatsInfoCardProps) => {
  return (
    <div
      className="
        z-20 flex gap-6 rounded-xl
        border border-gray-200/50
        bg-violet-50 p-4
        shadow-md shadow-purple-400/10
        transition-colors duration-200
        dark:border-gray-700
        dark:bg-gray-900
        dark:shadow-black/20
      "
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-violet-50 drop-shadow-xl ${color ?? "bg-primary"}`}
      >
        <Icon className="text-2xl" />
      </div>
      <div>
        <h6 className="mb-2 text-xs text-gray-600 dark:text-gray-300">
          {label}
        </h6>
        <span className="text-[20px] font-medium text-gray-950 dark:text-slate-50">
          {value}
        </span>
      </div>
    </div>
  );
};

export default StatsInfoCard;
