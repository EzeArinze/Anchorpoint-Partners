"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconError404 } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

interface ErrorMessageProps {
  children?: ReactNode;
  icon?: ReactNode;
  onRetry?: () => void;
  className?: string;
  variant?: ButtonVariant;
}

export function ErrorMessage({
  children,
  icon,
  onRetry,
  className,
  variant,
}: ErrorMessageProps) {
  return (
    <Card
      className={cn(
        "rounded-lg border border-red-200 bg-red-50 text-red-700 ",
        className
      )}
    >
      <CardHeader>{icon ?? <IconError404 className="size-10" />}</CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-2 p-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">
            {children ?? "Something went wrong"}
          </p>
        </div>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant={variant}
            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
          >
            Retry
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
