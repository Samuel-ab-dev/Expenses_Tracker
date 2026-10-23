import { useEffect } from "react";
import { useUser } from "./useUser.tsx";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
  const { user, clearUser, isPending, isError } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isError) return;
    clearUser();
    navigate("/login");
  }, [isError, clearUser, navigate]);

  return { user, isPending };
};
