import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Sidemenu from "./Sidemenu.tsx";

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <header className="flex gap-5 bg-slate-100 border border-b border-gray-300/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-40">
      <button
        className="block lg:hidden text-gray-950"
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

      <h2 className="text-lg font-medium text-gray-950">Expense Tracker</h2>

      {openSideMenu && (
        <aside className="fixed left-0 top-15.25 -ml-4 bg-slate-100 shadow-lg">
          <Sidemenu onNavigate={() => setOpenSideMenu(false)} />
        </aside>
      )}
    </header>
  );
};

export default Navbar;
