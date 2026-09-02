import React from "react";
import CARD from "../../../assets/images/Project Image Login.png";
import StatsInfoCard from "../../../assets/Card/StatsInfoCard.tsx";
import { LuTrendingUpDown } from "react-icons/lu";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-gray-950">Expense Tracker</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-58 h-56 rounded-[40px] border-20 border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-58 h-56 rounded-[40px] bg-violet-500 absolute -bottom-5 -left-5" />

        <div className="grid grid-cols-1 z-30 relative">
          <StatsInfoCard
            icon={LuTrendingUpDown}
            label="Track Your Income & Expenses"
            value="200,000"
            color="bg-primary"
          />
        </div>

        <img
          src={CARD}
          className="rounded-2xl lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 z-10"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
