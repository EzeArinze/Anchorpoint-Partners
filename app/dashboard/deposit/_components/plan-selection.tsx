import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { plans } from "@/constants/constant";
import React from "react";

export function PlanSelection({
  selectedPlan,
  onSelect,
}: {
  selectedPlan: Plan | null;
  onSelect: (plan: Plan) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {plans.map((plan) => {
        const isActive = selectedPlan?.name === plan.name;
        return (
          <Card
            key={plan.name}
            onClick={() => onSelect(plan)}
            className={`cursor-pointer transition border-2 ${
              isActive
                ? "border-primary shadow-lg"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{plan.name}</span>
                <span className="text-primary font-bold">
                  {plan.rate}% {plan.period}
                </span>
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {plan.tagline}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                {plan.features.map((f, idx) => (
                  <React.Fragment key={idx}>
                    <li key={`min-${idx}`}>• Minimum: ${f.minimum}</li>
                    <li key={`max-${idx}`}>• Maximum: ${f.maximum}</li>
                    <li key={`ref-${idx}`}>
                      • Referral Bonus: {f.ReferralBonus}
                    </li>
                    <li key={`sup-${idx}`}>• Support: {f.Support}</li>
                  </React.Fragment>
                ))}
              </ul>
              <p className="mt-2 text-xs text-gray-500 italic">
                Includes: {plan.includes}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
