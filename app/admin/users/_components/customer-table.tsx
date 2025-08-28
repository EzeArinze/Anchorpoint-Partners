"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import TableAction from "./table-action";
import { Input } from "@/components/ui/input";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/data/admin/useQuery-user";
import { useDebounce } from "@/hooks/use-debounce";
import UsersTableSkeleton from "./table-skeleton";
import { ErrorMessage } from "@/components/error-message";
import { RefreshCcw } from "lucide-react";

export default function CustomersTable() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const [offset, setOffset] = useQueryState(
    "offset",
    parseAsInteger.withDefault(0)
  );

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError, refetch, isFetching } = useUsers({
    offset: offset,
    limit: 10,
    search: debouncedSearch || undefined,
  });

  const users = data?.users ?? [];
  const total = data?.total ?? 0;
  const limit = data?.limit ?? 10;

  const page = offset + 1;
  const totalPages = Math.ceil(total / limit);

  if (isLoading) return <UsersTableSkeleton />;
  if (isError)
    return (
      <ErrorMessage variant={"outline"}>Failed to load users</ErrorMessage>
    );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center justify-between">
        <Input
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-[60%] md:w-[50%]"
          placeholder="Search user by name"
        />
        <Button onClick={() => refetch()} variant={"outline"}>
          <RefreshCcw className={`size-4 ${isFetching && "animate-spin"}`} />
        </Button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{offset * limit + index + 1}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.banned !== true ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-red-600 font-medium">Banned</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <TableAction user={user} refetch={refetch} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={page === 1}
              onClick={(e) => {
                e.preventDefault();
                if (offset > 0) setOffset(offset - 1);
              }}
              variant="outline"
            >
              Previous
            </Button>
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={page === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  setOffset(i); // 0-based
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) setOffset(offset + 1);
              }}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
