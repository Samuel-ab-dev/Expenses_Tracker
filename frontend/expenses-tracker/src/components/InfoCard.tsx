import type { IconType } from "react-icons";

interface InfoCardProps {
  icon: IconType;
  label: string;
  value: string;
  color: string;
}

const InfoCard = ({ icon: Icon, label, value, color }: InfoCardProps) => {
  return (
    <section className="flex gap-6 rounded-2xl border border-gray-200/70 bg-slate-50 p-6 shadow-md shadow-gray-200/70 dark:border-gray-700 dark:bg-gray-900 dark:shadow-black/20">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-slate-100 ${color} rounded-full drop-shadow-xl`}
      >
        <Icon />
      </div>
      <article>
        <h6 className="mb-1 text-sm text-gray-600 dark:text-gray-400">
          {label}
        </h6>
        <span className="text-[22px] text-gray-950 dark:text-slate-50">
          {value}
        </span>
      </article>
    </section>
  );
};

export default InfoCard;
