import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login.tsx";
import SignUp from "../pages/Auth/SignUp.tsx";
import Income from "../pages/Auth/Income.tsx";
import Expense from "../pages/Auth/Expense.tsx";
import Home from "../pages/dashboard/Home.tsx";
import Root from "./Root.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import DashboardLayout from "./components/Layouts/DashboardLayout.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            element: <Home />,
          },
          {
            path: "income",
            element: <Income />,
          },
          {
            path: "expense",
            element: <Expense />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
