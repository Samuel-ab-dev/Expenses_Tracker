import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Sidemenu from "./Sidemenu.tsx";
import ThemeToggle from "./ThemeToggleLayout.tsx";

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <header className="sticky top-0 z-40 flex justify-between items-center gap-5 border border-b border-gray-300/50 bg-slate-100/95 px-7 py-4 backdrop-blur-[2px] dark:border-gray-700/60 dark:bg-gray-900/95">
      <button
        className="block text-gray-950 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 lg:hidden dark:text-slate-50 dark:hover:text-violet-300"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
        aria-label={openSideMenu ? "Close menu" : "Open menu"}
        aria-expanded={openSideMenu}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h2 className="text-lg font-medium text-gray-950 dark:text-slate-50">
        Expense Tracker
      </h2>
      <ThemeToggle />
      {openSideMenu && (
        <aside className="fixed left-0 top-15.25 -ml-4 bg-slate-100 shadow-lg shadow-gray-900/10 dark:bg-gray-900 dark:shadow-black/20">
          <Sidemenu onNavigate={() => setOpenSideMenu(false)} />
        </aside>
      )}
    </header>
  );
};

export default Navbar;
