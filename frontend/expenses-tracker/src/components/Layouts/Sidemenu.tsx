import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.tsx";
import { SIDE_MENU_DATA } from "../../../utils/data.ts";
import { useTranslation } from "react-i18next";
import CharAvatar from "../../../assets/Card/CharAvatar.tsx";

interface SideMenuProps {
  onNavigate?: () => void;
}

const Sidemenu = ({ onNavigate }: SideMenuProps) => {
  const { user, clearUser } = useUser();
  const location = useLocation();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleClick = (route: string) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
    onNavigate?.();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };

  return (
    <div className="sticky top-15.25 z-30 h-[calc(100vh-61px)] w-64 border-r border-gray-200/70 bg-slate-100 p-5 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="User profile image"
            className="w-20 h-20 rounded-full bg-slate-300 dark:bg-gray-700"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName ?? ""}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="font-medium leading-6 text-gray-950 dark:text-slate-50">
          {user?.fullName || ""}
        </h5>
      </div>
      <nav>
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
              location.pathname === item.path
                ? "bg-primary text-slate-50"
                : "text-gray-700 hover:bg-gray-200/70 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-slate-50"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {t(item.translationKey)}
          </button>
        ))}
      </nav>
    </div>
  );
};
export default Sidemenu;
