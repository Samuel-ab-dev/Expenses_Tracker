import Navbar from "./Navbar.tsx";
import Sidemenu from "./Sidemenu.tsx";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-950 dark:bg-gray-950 dark:text-slate-50">
      <Navbar />
      <div className="flex">
        <aside className="max-[1080px]:hidden">
          <Sidemenu />
        </aside>

        <main className="mx-5 min-w-0 grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
