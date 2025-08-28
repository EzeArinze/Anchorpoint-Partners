import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { plans } from "@/constants/constant";
import React from "react";

export function InvestmentPlans() {
  return (
    <section className="py-16 md:py-24 dark:bg-primary/5 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl ">
            Investment Plans
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Choose the plan that fits your financial goals.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-md"
            >
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl ">{plan.name}</CardTitle>
                <p className="mt-1 text-sm text-teal-700">{plan.tagline}</p>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 justify-between">
                <div>
                  {/* Rate */}
                  <p className="text-5xl font-extrabold text-teal-700 dark:text-teal-600 text-center">
                    {plan.rate}%
                    <span className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">
                      {plan.period}
                    </span>
                  </p>

                  {/* Includes */}
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-left">
                    {plan.includes} Includes:
                  </p>

                  {/* Features */}
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <React.Fragment key={i}>
                        <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-5 w-5 text-teal-700 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            Minimum: {feature.minimum}
                          </span>
                        </li>

                        <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-5 w-5 text-teal-700 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            Maximum: {feature.maximum}
                          </span>
                        </li>

                        <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-5 w-5 text-teal-700 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            Referral Bonus: {feature.ReferralBonus}
                          </span>
                        </li>

                        <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-5 w-5 text-teal-700 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            Support: {feature.Support}
                          </span>
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </div>

                {/* Button - always aligned bottom */}

                <Link
                  href={"/dashboard"}
                  className={buttonVariants({
                    className:
                      "mt-8 w-full bg-teal-700 hover:bg-teal-700 text-white rounded-lg",
                  })}
                >
                  Get Started
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
