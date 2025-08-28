import { Skeleton } from "@/components/ui/skeleton";

export function UserSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-2 w-[150px]" />
        <Skeleton className="h-2 w-[100px]" />
      </div>
    </div>
  );
}
