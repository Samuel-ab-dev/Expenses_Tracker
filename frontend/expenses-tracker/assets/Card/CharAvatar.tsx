import { getInitials } from "../../utils/helper.tsx";

interface CharAvatarProps {
  fullName: string;
  width: string;
  height: string;
  style: string;
}

const CharAvatar = ({ fullName, width, height, style }: CharAvatarProps) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${style || ""} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-200`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
