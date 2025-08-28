import React from "react";
import SignInPage from "../_components/sign-in";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { serverSession } from "@/hooks/server-session";
import { redirect } from "next/navigation";

async function page() {
  const { session } = await serverSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="relative w-full h-screen p-4">
      <Link
        href={"/"}
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-8 left-4 ",
        })}
      >
        <ChevronLeft className="size-4" />
        Back
      </Link>

      <SignInPage />
    </div>
  );
}

export default page;
