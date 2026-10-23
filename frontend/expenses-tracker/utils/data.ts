import type { IconType } from "react-icons";
import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
} from "react-icons/lu";

interface SideMenuItem {
  key: string;
  translationKey: string;
  icon: IconType;
  path: string;
}

export const SIDE_MENU_DATA: SideMenuItem[] = [
  {
    key: "dashboard",
    translationKey: "navigation.dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    key: "income",
    translationKey: "navigation.income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    key: "expense",
    translationKey: "navigation.expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    key: "logout",
    translationKey: "navigation.logout",
    icon: LuLogOut,
    path: "logout",
  },
];
