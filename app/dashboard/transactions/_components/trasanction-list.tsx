"use client";

import React, { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionType } from "@/data/user/get-investment";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { tryCatch } from "@/utils/try-catch";
import { deleteTransanction } from "../action";
import { toast } from "sonner";

interface TransactionListProps {
  transactions: TransactionType;
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [pending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!id) return;

    startTransition(async () => {
      const { data, error } = await tryCatch(deleteTransanction(id));
      if (error) {
        toast.error("Failed to delete transaction");
      }
      if (data?.status === "error") {
        toast.error(data.message);
      } else if (data?.status === "success") {
        toast.error(data.message);
      }
    });
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You don’t have any transactions yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              {/* <TableHead>Delete</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>
                  {tx.createdAt
                    ? new Date(tx.createdAt).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell className="capitalize">{tx.type}</TableCell>
                <TableCell>${tx.amount.toLocaleString()}</TableCell>
                <TableCell>
                  {tx.user.wallets.map((wallet) => wallet.type)}
                </TableCell>

                {/* tx.method || */}
                {/* <TableCell>{"-"}</TableCell> */}
                {/* <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : tx.status === "approved"
                          ? "bg-blue-100 text-blue-800"
                          : tx.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {tx.status}
                  </span>
                </TableCell> */}
                <TableCell>
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    onClick={() => handleDelete(tx.id)}
                    disabled={pending}
                  >
                    {pending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
