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
    <div className="flex gap-6 bg-violet-50 p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-20">
      <div
        className={`shrink-0 w-14 h-14 flex items-center justify-center ${color} text-violet-50 rounded-full drop-shadow-xl  `}
      >
        <Icon className="text-2xl" />
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] ">{value}</span>
      </div>
    </div>
  );
};

export default StatsInfoCard;
