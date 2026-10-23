import { type ReactNode } from "react";
import { UserContext, type User } from "./userContext.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../hooks/queries/useCurrentUser.tsx";

interface ProviderProps {
  children: ReactNode;
}
export function UserProvider({ children }: ProviderProps) {
  const queryClient = useQueryClient();

  const { data: user, isPending, isError } = useCurrentUser();

  const updateUser = (userData: User) => {
    queryClient.setQueryData(["currentUser"], userData);
  };

  const clearUser = () => {
    localStorage.removeItem("token");
    queryClient.removeQueries({
      queryKey: ["currentUser"],
    });
  };

  return (
    <UserContext.Provider
      value={{ user: user ?? null, updateUser, clearUser, isPending, isError }}
    >
      {children}
    </UserContext.Provider>
  );
}
