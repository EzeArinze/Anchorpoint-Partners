"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function UsersTableSkeleton() {
  const rows = Array.from({ length: 5 }); // show 5 placeholder rows

  return (
    <div className="space-y-4">
      <Skeleton className="p-2 w-[60%] md:w-[50%] h-4" />
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full table-auto border-collapse">
          <thead className="">
            <tr>
              {["No.", "Email", "Name", "Role", "Status", "Action"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-500"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((_, idx) => (
              <tr key={idx} className="border-t">
                {/* No. */}
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-6" />
                </td>

                {/* Email */}
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-36" />
                </td>

                {/* Name */}
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-28" />
                </td>

                {/* Role */}
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-20" />
                </td>

                {/* Status */}
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-16" />
                </td>

                {/* Action */}
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-24" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
