"use client";

import { processWeeklyProfits } from "@/data/admin/weekly-profit";
import { tryCatch } from "@/utils/try-catch";
import { useTransition } from "react";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";

export default function WeeklyProfitButton() {
  const [pending, startTransition] = useTransition();

  function runWeeklyProfitManuel() {
    startTransition(async () => {
      const { data, error } = await tryCatch(processWeeklyProfits());
      if (error) {
        toast.error("Unexpected error occured");
      }
      if (data?.status === "error") {
        toast.error(data.message);
      } else if (data?.status === "success") {
        toast.success(data.message);
      }
    });
  }

  return (
    <div className="p-4">
      <Button
        onClick={runWeeklyProfitManuel}
        disabled={pending}
        className="px-4 py-2 rounded"
      >
        {pending ? "Running..." : "Run Weekly Profit"}
      </Button>
    </div>
  );
}
