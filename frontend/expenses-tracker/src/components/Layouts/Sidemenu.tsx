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
    <div className="w-64 h-[calc(100vh-61px)] bg-slate-100 border-r border-gray-200/50 p-5 sticky top-15.25 z-30">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="User profile image"
            className="w-20 h-20 bg-slate-300 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName ?? ""}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>
      <nav>
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] ${location.pathname === item.path ? "text-slate-100 bg-primary" : ""} py-3 px-6 rounded-lg mb-3`}
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
