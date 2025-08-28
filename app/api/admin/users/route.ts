import { NextResponse } from "next/server";
// import { getAllUsers } from "@/data/admin/get-all-users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { requireAdmin } from "@/data/admin/verify-admin";

export async function GET(req: Request) {
  await requireAdmin();

  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") ?? undefined;
  const offset = Number(searchParams.get("offset") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 10);
  const sortBy = (searchParams.get("sortBy") as "name" | "email") ?? undefined;

  try {
    const res = await auth.api.listUsers({
      query: {
        searchValue: search,
        searchField: "email",
        searchOperator: "contains",
        limit,
        offset,
        sortBy,
        sortDirection: "desc",
        //  filterField: "email",
        //  filterValue,
        //  filterOperator: "eq",
      },
      headers: await headers(),
    });

    if (!res) {
      NextResponse.json(
        { error: "No data returned from listUsers" },
        { status: 401 }
      );
    }

    const data = {
      users: res.users,
      total: res.total,
      limit: "limit" in res ? (res.limit ?? limit) : limit,
      offset: "offset" in res ? (res.offset ?? offset) : offset,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
