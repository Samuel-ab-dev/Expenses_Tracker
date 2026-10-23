import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axiosInstances.tsx";
import { API_PATHS } from "../../utils/apiPaths.ts";
import type { User } from "../../context/userContext.tsx";

interface GetCurrentUserRes {
  user: User;
}
async function getCurrentUser() {
  const res = await api.get<GetCurrentUserRes>(API_PATHS.AUTH.GET_USER_INFO);

  return res.data.user;
}

export function useCurrentUser() {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: Boolean(token),
  });
}
