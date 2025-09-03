"use client";

import { plans } from "@/constants/constant";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PlanSelection } from "./plan-selection";
import { DepositForm } from "./deposite-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export function Deposit() {
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const planFromQuery = searchParams.get("plan");
    if (planFromQuery) {
      const found = plans.find(
        (p) => p.name.toLowerCase() === planFromQuery.toLowerCase()
      );
      if (found) setSelectedPlan(found);
    }
  }, [searchParams]);

  return (
    <div className="p-4 space-y-4">
      {/* Plan Selection */}
      <PlanSelection selectedPlan={selectedPlan} onSelect={setSelectedPlan} />

      {/* Deposit Dialog */}
      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="sm:max-w-lg h-[70vh] overflow-y-auto no-scrollbar">
          <DialogHeader>
            <DialogTitle>
              {selectedPlan ? `${selectedPlan.name}` : "Deposit"}
            </DialogTitle>
            <DialogDescription>
              This plan has a{" "}
              <Badge className="dark:text-black">
                RIO of {selectedPlan?.rate}%
              </Badge>
            </DialogDescription>
          </DialogHeader>

          {selectedPlan && (
            <DepositForm
              selectedPlan={selectedPlan}
              onClose={() => setSelectedPlan(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
