import { SectionCards } from "@/app/dashboard/_components/section-cards";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserDashboardStats } from "@/data/user/get-stats";
import { getRecentUserInvestment } from "@/data/user/get-user-investments";
import { serverSession } from "@/hooks/server-session";
import { handleAuthError } from "@/utils/auth-error";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import InvestmentCard from "./_components/investment-card";

export default async function DashboardRoute({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await handleAuthError(searchParams);

  const { session } = await serverSession();

  if (!session) {
    redirect("/sign-in");
  }

  const stats = await getUserDashboardStats(session.user.id);

  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards stats={stats} />
        <div className="px-4 lg:px-6 mt-4">
          <div className="flex items-center justify-between space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white hidden md:block">
              Welcome, {session.user.name || "User"}!
            </h2>
            <div className="flex items-center justify-between gap-2 w-full max-w-sm md:flex-row md:gap-4 md:justify-end">
              <Link
                href={"/dashboard/deposit"}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Make a Deposit
              </Link>
              <Link
                href={"/dashboard/withdraw"}
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "text-center text-white dark:text-green-600 bg-primary",
                })}
              >
                Request a Withdrawal
              </Link>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              Recent Investment
            </p>
            <Separator className="my-2" />
            <Suspense
              fallback={
                <p className="text-center">Loading investment plans...</p>
              }
            >
              <InvestmentPlans />
            </Suspense>
          </div>
        </div>
        {/* Put any other thing here */}
      </div>
    </>
  );
}

async function InvestmentPlans() {
  const plans = await getRecentUserInvestment();
  return (
    <div>
      <div className="mt-4 flex flex-col space-y-4 w-full items-center justify-center">
        {/* Placeholder for recent transactions table or list */}
        {plans.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full p-6 gap-4 min-h-[250px]">
            <p className="text-gray-500 dark:text-gray-400">
              No recent investment available.
            </p>
            <Link
              href={"/dashboard/investment-plans"}
              className={buttonVariants({ variant: "outline" })}
            >
              Start Investing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {plans.map((plan) => (
              <InvestmentCard key={plan.id} investment={plan} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
