import { format } from "date-fns";
import type { IconType } from "react-icons";
import {
  LuUtensils,
  LuCar,
  LuShoppingBag,
  LuGamepad2,
  LuHouse,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuBookOpen,
} from "react-icons/lu";

export type TransactionIcons =
  | "food"
  | "car"
  | "shopping"
  | "house"
  | "gaming"
  | "studying"
  | (string & {});

interface TransactionInfoCardData {
  title: string;
  icon: TransactionIcons;
  date: Date | string;
  amount: number;
  type: "expense" | "income";
  hideDeleteBtn?: boolean;
  onDelete?: () => void;
}

const ICON_MAP: Record<TransactionIcons, IconType> = {
  food: LuUtensils,
  car: LuCar,
  shopping: LuShoppingBag,
  house: LuHouse,
  gaming: LuGamepad2,
  studying: LuBookOpen,
};

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}: TransactionInfoCardData) => {
  const isImageUrl = icon.startsWith("https://") || icon.startsWith("http://");

  const Icon = isImageUrl
    ? null
    : (ICON_MAP[icon as keyof typeof ICON_MAP] ?? LuUtensils);

  const getAmountStyles = () => {
    return type === "income"
      ? "bg-emerald-100 text-green-500"
      : "bg-gray-200 text-gray-500";
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/75">
      <div
        className={`w-12 h-12 flex items-center justify-center text-xl ${getAmountStyles()} rounded-full`}
      >
        {isImageUrl ? (
          <img src={icon} alt="" className="w-6 h-6 object-contain" />
        ) : (
          Icon && <Icon className="w-6 h-6" />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <h4 className="text-sm text-gray-800 font-medium">{title}</h4>
          <span className="text-xs text-gray-400 mt-1">
            {format(date, "dd MMM yyyy")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ${amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
