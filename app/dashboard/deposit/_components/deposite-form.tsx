import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { DepositTabs } from "./deposit-tabs";

export function DepositForm({ selectedPlan }: { selectedPlan: Plan }) {
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [depositMethod, setDepositMethod] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>("");

  const isReady = selectedPlan && amount && paymentMethod;
  const investmentAmount = Math.round(Number(amount));
  const min = Math.round(
    Number(selectedPlan.features[0].minimum.replace(/[^0-9.-]/g, ""))
  );

  const handleProceed = () => {
    if (!isReady || !selectedPlan) return;

    if (investmentAmount < min) {
      toast.error("Investment Too Low", {
        description: `Minimum investment is $${selectedPlan.features[0].minimum}`,
      });
      return;
    }

    toast.success("Please select deposit method...", {
      description: `You are investing $${amount} via ${paymentMethod}`,
    });

    setDepositMethod(true);
  };

  return (
    <Card className="overflow-y-scroll no-scrollbar">
      <CardHeader>
        <CardTitle>Deposit into {selectedPlan.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Amount
          </label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="text-xs mt-1 text-primary p-2">
            Min: ${selectedPlan.features[0].minimum} | Max: $
            {selectedPlan.features[0].maximum}
          </p>
        </div>

        {/* Payment Method */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Choose Payment Method
          </label>
          <Select
            onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bitcoin">Bitcoin</SelectItem>
              <SelectItem value="ethereum">Ethereum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Referral Code (optional) */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Referral Code (optional)
          </label>
          <Input
            type="text"
            placeholder="Enter referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>

        {/* Proceed Button */}
        <Button
          className="w-full mt-0.5 text-primary"
          disabled={!isReady || investmentAmount < min}
          onClick={handleProceed}
          variant="outline"
        >
          Continue
        </Button>
      </CardContent>
      <CardFooter>
        {depositMethod && (
          <DepositTabs
            amount={investmentAmount}
            paymentMethod={paymentMethod!}
            selectedPlan={selectedPlan}
            referralCode={referralCode}
          />
        )}
      </CardFooter>
    </Card>
  );
}
