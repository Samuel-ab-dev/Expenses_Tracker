import Navbar from "./Navbar.tsx";
import Sidemenu from "./Sidemenu.tsx";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="">
      <Navbar />

      <div className="flex">
        <aside className="max-[1080px]:hidden">
          <Sidemenu />
        </aside>

        <main className="grow mx-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
