"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function ExpiredTokenPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border">
        <div className="flex justify-center">
          <AlertCircle className="text-red-500 h-14 w-14" />
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Token Expired
        </h1>

        <p className="text-zinc-600 dark:text-zinc-300">
          Oops! Your verification or reset link has expired. Don&apos;t
          worry—you can create a new account and get started again.
        </p>

        <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
          <Link href="/sign-in">Go to Sign in</Link>
        </Button>
      </div>
    </section>
  );
}
