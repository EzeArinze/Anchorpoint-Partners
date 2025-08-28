"use client";

import React, { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { tryCatch } from "@/utils/try-catch";
import { AddWallet } from "../action";
import { AddWalletSchema } from "@/schema/schemas";
import { toast } from "sonner";

export function Settings() {
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({ type: "", address: "" });

  const handleSave = () => {
    if (!form.type || !form.address) return;
    const validate = AddWalletSchema.safeParse(form);
    if (!validate.success) {
      toast.error(validate.error.issues[0].message);
      return;
    }
    startTransition(async () => {
      const { address, type } = validate.data;
      const { data, error } = await tryCatch(AddWallet({ address, type }));
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
        setForm({ type: "", address: "" });
      }
    });
  };

  return (
    <div className="space-y-4 pt-4">
      <h3 className="font-medium">Add New Wallet</h3>

      {/* Wallet Type */}
      <div>
        <label className="text-sm font-medium">Wallet Type</label>
        <Select
          value={form.type}
          onValueChange={(val) => setForm({ ...form, type: val })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select wallet type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bitcoin">Bitcoin</SelectItem>
            <SelectItem value="ethereum">Ethereum</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Wallet Address */}
      <div>
        <label className="text-sm font-medium">Wallet Address</label>
        <Input
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Enter your wallet address"
        />
      </div>

      {/* Save / Cancel */}
      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={pending}>
          {pending ? "Saving Wallet..." : "Save Wallet"}
        </Button>
      </div>
    </div>
  );
}
