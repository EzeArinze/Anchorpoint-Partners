"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy as IconCopy } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { address } from "@/constants/constant";
import { tryCatch } from "@/utils/try-catch";
import { createDeposit } from "../action";
import QRWallet from "./qr-code";

export function DepositTabs({
  amount,
  paymentMethod,
  selectedPlan,
  referralCode,
}: {
  amount: number;
  paymentMethod: "bitcoin" | "ethereum";
  selectedPlan: Plan;
  referralCode?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [pending, startTransaction] = useTransition();

  const walletAddress = address[paymentMethod];

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success("Address Copied to clipboard");
    setTimeout(() => setCopied(false), 1000);
  };

  function handlePaymentMade() {
    const data = {
      amount,
      plan: selectedPlan.name,
      roi: selectedPlan.rate,
      paymentMethod,
      referralCode,
    };

    startTransaction(async () => {
      const { data: depositData, error } = await tryCatch(createDeposit(data));
      if (error) {
        toast.error("Failed to create deposit", {
          description: error.message,
        });
        return;
      }
      if (depositData.status === "success") {
        toast.success("Deposit created successfully!", {
          description: `Your deposit of $${amount} is pending approval.`,
        });
      } else if (depositData.status === "error") {
        toast.error("Deposit creation failed", {
          description: depositData.message,
        });
      }
    });
  }

  function handlePayment() {
    toast.success("Payment feature coming soon!");
  }

  return (
    <Tabs defaultValue="address" className="w-full">
      {/* Tab Buttons */}
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="address">Pay with Address</TabsTrigger>
        <TabsTrigger value="bitpay">Pay with BitPay</TabsTrigger>
      </TabsList>

      {/* Pay with Address */}
      <TabsContent value="address">
        <div className="w-full p-4 border rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please send exactly ${amount} worth of {paymentMethod} to the
            following address:
          </p>

          <div className="flex items-center gap-2 mt-2">
            <Input
              readOnly
              value={walletAddress}
              className="font-mono text-sm"
            />
            <Button
              size="icon"
              onClick={handleCopy}
              variant={copied ? "secondary" : "default"}
            >
              <IconCopy className="size-4" />
            </Button>
          </div>
          <p className="text-center">or</p>
          <QRWallet
            address={walletAddress}
            amount={amount}
            currency={paymentMethod}
          />

          <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
            Note: It may take up to 30 minutes for the transaction to be
            confirmed.
          </p>

          <Button
            className="w-full mt-4"
            onClick={handlePaymentMade}
            disabled={pending}
          >
            {pending ? "Saving payment" : "I have sent the payment"}
          </Button>
        </div>
      </TabsContent>

      {/* Pay with BitPay */}
      <TabsContent value="bitpay">
        <div className="w-full p-4 border rounded bg-gray-50 dark:bg-gray-800">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            {/* Pay with BitPay */} Coming Soon..
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            You will be redirected to BitPay to complete your payment.
          </p>
          <Button className="w-full" disabled onClick={handlePayment}>
            Continue to BitPay
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
