"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddWallet, UserWalletsType } from "../../settings/action";
import { AddNewWalletSchema } from "@/schema/schemas";
import { toast } from "sonner";
import { tryCatch } from "@/utils/try-catch";
import { requestWithdrawal } from "../action";

type iAppProps = {
  wallets: UserWalletsType[];
};

export function Withdrawal({ wallets }: iAppProps) {
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [method, setMethod] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [pending, startTransition] = useTransition();
  const [withdrawPending, withrawTransition] = useTransition();

  const handleSaveAccount = () => {
    if (!method || !address) return;
    const validate = AddNewWalletSchema.safeParse({ method, address });
    if (!validate.success) {
      toast.error(validate.error.issues[0].message);
      return;
    }
    startTransition(async () => {
      const { address, method } = validate.data;
      const { data, error } = await tryCatch(
        AddWallet({ address, type: method })
      );
      if (error) {
        toast.error(
          error.message || "An error occurred while Saving the wallet."
        );
        return;
      }
      if (data?.status === "error") {
        toast.error(data?.message);
        return;
      } else if (data?.status === "success") {
        toast.success(data.message);
        setAddress("");
        setMethod("");
      }
    });
  };

  const handleWithdraw = () => {
    if (!selectedWalletId || !amount) return;
    const wallet = wallets.find((w) => w.id === selectedWalletId);
    if (!wallet) return;

    withrawTransition(async () => {
      const amountToWithdraw = Number(amount);
      const { data, error } = await tryCatch(
        requestWithdrawal({ amount: amountToWithdraw, walletId: wallet.id })
      );
      if (error) {
        toast.error(
          error.message || "An error occurred while Saving the wallet."
        );
        return;
      }
      if (data?.status === "error") {
        toast.error(data?.message);
        return;
      } else if (data?.status === "success") {
        toast.success(data.message);
      }
    });
  };

  return (
    <>
      {wallets.length === 0 || addingNew ? (
        // Create Withdrawal Account
        <Card>
          <CardHeader>
            <CardTitle>Create Withdrawal Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Account Type</label>
              <Select onValueChange={setMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bitcoin">Bitcoin</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Wallet Address</label>
              <Input
                type="text"
                placeholder="Enter your wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <Button
              className="w-full mt-2"
              disabled={!method || !address || pending}
              onClick={handleSaveAccount}
            >
              Save Withdrawal Account
            </Button>
          </CardContent>
        </Card>
      ) : (
        // Request Withdrawal
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Request Withdrawal</CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAddingNew(true)}
            >
              + Add New Wallet
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Wallet Selection */}
            <div>
              <label className="text-sm font-medium">Select Wallet</label>
              <Select
                value={selectedWalletId || ""}
                onValueChange={setSelectedWalletId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose wallet" />
                </SelectTrigger>
                <SelectContent>
                  {wallets.map((w) => (
                    <SelectItem key={w.id} value={w.id}>
                      {w.type.toUpperCase()} - {w.address.slice(0, 10)}...
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Withdrawal Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <Button
              className="w-full mt-2"
              disabled={!amount || !selectedWalletId || withdrawPending}
              onClick={handleWithdraw}
            >
              {withdrawPending ? "Sending request" : "Request Withdrawal"}
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
