import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserDashboardStats } from "@/data/user/get-stats";

interface iAppProps {
  stats: UserDashboardStats;
}

export function SectionCards({
  stats: { totalInvested, planCount, totalProfits, availableBalance },
}: iAppProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Revenue */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-800 dark:text-gray-200">
            Available balance
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-gray-900 dark:text-white">
            ${availableBalance}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm">
          <div className="text-gray-700 dark:text-gray-300">
            Available balance is the real balance
          </div>
        </CardFooter>
      </Card>

      {/* Active Plans */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-800 dark:text-gray-200">
            Profits
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-gray-900 dark:text-white">
            ${totalProfits}
          </CardTitle>
        </CardHeader>
        <CardFooter className=" text-sm">
          <div className="text-gray-700 dark:text-gray-300">
            Profits balance is the total profits your investments has
            accumulated.
          </div>
        </CardFooter>
      </Card>

      {/* Total Invested */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-800 dark:text-gray-200">
            Total Invested
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-gray-900 dark:text-white">
            ${totalInvested}
          </CardTitle>
        </CardHeader>
        <CardFooter className=" text-sm">
          <div className="text-gray-700 dark:text-gray-300">
            Total amount invested in plans
          </div>
        </CardFooter>
      </Card>

      {/* Number of Plans */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-gray-800 dark:text-gray-200">
            Number of Plans
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-gray-900 dark:text-white">
            {planCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="text-sm">
          <div className="text-gray-700 dark:text-gray-300">
            Total number of active investment plans
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
