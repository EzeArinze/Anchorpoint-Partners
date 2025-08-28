// import { authClient } from "@/lib/auth-client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { UserWithRole } from "better-auth/plugins";

type adminUsersData = {
  users: never[] | UserWithRole[];
  total: number;
  limit: number;
  offset: number;
};

type getAllUsersProp = {
  search?: string;
  limit?: number;
  offset: number;
  sortBy?: "name" | "email";
};

export async function getUsers({ offset = 0, limit = 20 }: getAllUsersProp) {
  try {
    const res = await fetch(`/api/admin/users${window.location.search}`);
    const data = await res.json();

    if (!data) {
      throw new Error("No data returned from listUsers");
    }

    return {
      users: data.users,
      total: data.total,
      limit: "limit" in data ? (data.limit ?? limit) : limit,
      offset: "offset" in data ? (data.offset ?? offset) : offset,
    };
  } catch {
    throw new Error("Error/Failed to fetch users");
  }
}

export function useUsers(params: getAllUsersProp) {
  return useQuery<adminUsersData>({
    queryKey: ["users", params.search, params.limit, params.offset],
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
}

export type userType = Awaited<ReturnType<typeof getUsers>>;
