import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants/constant";

export default function InvestmentPlansPage() {
  return (
    <section className="p-6 space-y-6">
      {/* Top link to deposit */}
      <div>
        <h2 className="text-2xl font-bold">Investment Plans</h2>
        <p className="text-gray-500">
          Choose a plan that suits your investment goals.
        </p>
      </div>
      {/* <div className="flex justify-between items-center">
        <Link href="/dashboard/my-investments">
          <Button variant="outline">My Investments</Button>
        </Link>
      </div> */}

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-2 ">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.tagline}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              <div className="text-3xl font-bold text-primary">
                {plan.rate}%
              </div>
              <p className="text-sm text-gray-500">Return {plan.period}</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <div className="flex flex-col">
                      <span>Minimum: {feature.minimum}</span>
                      <span>Maximum: {feature.maximum}</span>
                      <span>Referral Bonus: {feature.ReferralBonus}</span>
                      <span>Support: {feature.Support}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Link href={`/dashboard/deposit?plan=${plan.name}`}>
                  Select {plan.includes}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
