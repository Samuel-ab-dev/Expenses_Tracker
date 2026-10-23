import type { IconType } from "react-icons";

interface InfoCardProps {
  icon: IconType;
  label: string;
  value: string;
  color: string;
}

const InfoCard = ({ icon: Icon, label, value, color }: InfoCardProps) => {
  return (
    <section className="flex gap-6 bg-slate-50 p-6 rounded-2xl shadow-md shadow-gray-200 border border-gray-200/50">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-slate-100 ${color} rounded-full drop-shadow-xl`}
      >
        <Icon />
      </div>
      <article>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-[22px] ">{value}</span>
      </article>
    </section>
  );
};

export default InfoCard;
