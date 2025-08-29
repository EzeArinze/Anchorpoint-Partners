import { Button } from "@/components/ui/button";
import { plans } from "@/constants/constant";
import Link from "next/link";

export function InvestmentPackagesPlans() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-background/90 to-background">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold sm:text-5xl mb-4">
          Investment Plans
        </h2>
        <p className="text-muted-foreground mb-14 max-w-2xl mx-auto">
          Choose a plan that suits your goals. Transparent, reliable, and built
          for growth.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col items-center justify-between rounded-2xl border p-6 aspect-[4/5] 
                bg-background/70 backdrop-blur-sm shadow-soft transition-transform duration-300 hover:scale-105 hover:shadow-strong
                ${
                  plan.name === "Gold"
                    ? "border-yellow-500/50 shadow-lg shadow-yellow-500/20"
                    : ""
                }`}
            >
              {/* Badge for featured plan */}
              {plan.name === "Gold" && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Popular
                </span>
              )}

              <div className="w-full">
                <h3 className="text-2xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.tagline}
                </p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-primary">
                    {plan.rate}%
                  </span>
                  <span className="text-muted-foreground ml-2 text-lg">
                    / {plan.period}
                  </span>
                </div>

                {plan.features.map((f, i) => (
                  <ul key={i} className="space-y-2 text-sm text-left">
                    <li>
                      <span className="font-medium">Min:</span> ${f.minimum}
                    </li>
                    <li>
                      <span className="font-medium">Max:</span> ${f.maximum}
                    </li>
                    <li>
                      <span className="font-medium">Referral Bonus:</span>{" "}
                      {f.ReferralBonus}
                    </li>
                    <li>
                      <span className="font-medium">Support:</span> {f.Support}
                    </li>
                  </ul>
                ))}
              </div>

              <div className="mt-8 w-full">
                <Button
                  asChild
                  className={`w-full rounded-xl py-3 sm:py-3 text-base sm:text-md font-medium transition 
    ${
      plan.name === "Gold"
        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
        : "hover:bg-primary/90"
    }`}
                >
                  <Link href="/sign-in">Start Investing</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
