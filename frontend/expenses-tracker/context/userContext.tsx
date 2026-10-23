import { createContext } from "react";

export interface User {
  id: string;
  fullName: string;
  email: string;
  profileImageUrl: string | null;
}

interface UserContextValue {
  user: User | null;
  updateUser: (userData: User) => void;
  clearUser: () => void;
  isPending: boolean;
  isError: boolean;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined,
);
