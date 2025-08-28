"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // shadcn toast
import { Copy, CheckCircle2, Users, DollarSign, Gift } from "lucide-react";
import { toast } from "sonner";

export function Referral() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://upc.com/register?ref=USER123"; // Replace USER123 dynamically from auth

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral Link Copied", {
      description: "You can now share your link with friends 🚀",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input value={referralLink} readOnly />
          <Button variant="outline" onClick={handleCopy}>
            {copied ? (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Referral Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-500">Friends Invited</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <DollarSign className="w-8 h-8 text-green-500 mb-2" />
            <p className="text-2xl font-bold">$0</p>
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
