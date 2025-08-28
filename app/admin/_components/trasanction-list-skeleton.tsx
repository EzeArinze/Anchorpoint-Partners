"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function RecentTransactionSkeleton() {
  return (
    <div className="mt-4 px-4 lg:px-6 space-y-3">
      <Skeleton className="h-6 w-48" /> {/* "Recent Transactions" heading */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg border p-3"
          >
            {/* Left: Avatar + User Info */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            {/* Right: Badge + Amount */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-right">
              <Skeleton className="h-5 w-20 rounded-md" /> {/* badge */}
              <Skeleton className="h-4 w-16" /> {/* amount */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
