"use client";

import { useState, useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, CheckCircle2, DollarSign, Gift, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateReferralCode } from "../action";
import { tryCatch } from "@/utils/try-catch";

export function Referral({
  referralCode,
  referalBonus,
}: {
  referralCode?: string | null;
  referalBonus?: number | null;
}) {
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleCopy = async () => {
    if (!referralCode) return;
    await navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Referral Link Copied", {
      description: "You can now share your link with friends 🚀",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    startTransition(async () => {
      const { data, error } = await tryCatch(generateReferralCode());
      if (error) {
        toast.error("Unexpected error occurred while generating code");
        return;
      }
      if (data.status === "error") {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          {referralCode ? (
            <>
              <Input value={referralCode} readOnly />
              <Button variant="outline" onClick={handleCopy}>
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={pending}
              className="w-full"
            >
              {pending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Generating...
                </span>
              ) : (
                "Generate Referral Code"
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <DollarSign className="w-8 h-8 text-green-500 mb-2" />
            <p className="text-2xl font-bold">${referalBonus?.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Total Earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <Gift className="w-8 h-8 text-purple-500 mb-2" />
            <p className="text-2xl font-bold">10%</p>
            <p className="text-sm text-gray-500">Referral Bonus</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
