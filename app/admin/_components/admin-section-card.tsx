import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminStats } from "@/data/admin/admin-stats";

interface iAppProps {
  stats: AdminStats;
}

export function AdminSectionCards({ stats }: iAppProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-800 dark:text-gray-200">
            Total Invested
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-gray-900 dark:text-white">
            ${stats.totalInvestedAmount}
          </CardTitle>
        </CardHeader>
        <CardFooter className=" text-sm">
          <div className="text-gray-700 dark:text-gray-300">
            Total amount invested in plans
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-800 dark:text-gray-200">
            Total profit earned by users
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-gray-900 dark:text-white">
            ${stats.totalProfitEarnedbyUsers}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm">
          <div className="text-gray-700 dark:text-gray-300">
            Total profit earned is the profit user&apos;s has earned overtime
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-800 dark:text-gray-200">
            Customers
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-gray-900 dark:text-white">
            {stats.totalCustomers}
          </CardTitle>
        </CardHeader>
        <CardFooter className=" text-sm">
          <div className="text-gray-700 dark:text-gray-300">
            Total number of inverstor that have created an account with us.
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-800 dark:text-gray-200">
            Investors
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-gray-900 dark:text-white">
            {stats.totalInvestedCustomers}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm">
          <div className="text-gray-700 dark:text-gray-300">
            Total number of active investors
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
